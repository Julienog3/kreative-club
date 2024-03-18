import User from '../models/user.js'
import app from '@adonisjs/core/services/app'
import type { HttpContext } from '@adonisjs/core/http'
import { editUserValidator, enablePortfolioValidator, uploadUserAvatarValidator } from '#validators/user';
import PortfolioImage from '#models/portfolio_image';
import { cuid } from '@adonisjs/core/helpers';

export default class UsersController {
  public async index({ request }: HttpContext) {
    const { portfolio_enabled, categories, username } = request.qs()

    if (username) {
     return await User.query().where('username', username).preload('categories').firstOrFail()
    }

    if (categories) {
      return await User.query().whereHas('categories', (categoriesQuery) => {
        return categoriesQuery.where('title', categories)
      }).preload('categories')
    }

    if (portfolio_enabled) {
      return await User.query().where('portfolioEnabled', portfolio_enabled).preload('categories')
    }

    return await User.query().preload('categories')
  }

  public async show({ params }: HttpContext) {
    return await User.query()
      .where('id', params.id)
      .preload('categories')
      .preload('bookmarks')
      .firstOrFail()
    // const user = await User.findOrFail(params.id);
  }

  public async edit({ request, params }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const payload = await request.validateUsing(editUserValidator)

    const { categories } = payload

    if (categories) {
      await user.related('categories').sync(categories)
    }
    
    return await user.merge(payload).save()
  }

  public async uploadUserAvatar({ request, params }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const { avatar } = await request.validateUsing(uploadUserAvatarValidator)

    const fileUrl = `${cuid()}.${avatar.extname}`
    await avatar.move(app.tmpPath('uploads', 'avatars'), {
      name: fileUrl
    })
      
    return await user.merge({ avatar: '/uploads/avatars/' + fileUrl }).save()
  }

  public async enablePortfolio({ auth, request }: HttpContext) {
    const user: User = await auth.getUserOrFail()
    const { isEnabled } = await request.validateUsing(enablePortfolioValidator)

    await user.merge({ portfolioEnabled: isEnabled }).save()
  }

  public async getPortfolioIllustration({ params }: HttpContext) {
    const user = await User.findOrFail(params.userId)
    return await PortfolioImage.query().where((query) => {
      query.where('userId', user.id).andWhere('isIllustration', true).first()
    })
  }

  public async addBookmark({ auth, params }: HttpContext) {
    const user: User = await auth.getUserOrFail()
    await user.related('bookmarks').attach([params.creativeId])
  }

  public async removeBookmark({ auth, params }: HttpContext) {
    const user: User = await auth.getUserOrFail()
    await user.related('bookmarks').detach([params.creativeId])
  }

  public async showBookmarks({ auth }: HttpContext) {
    const user: User = auth.getUserOrFail()
    return await user.related('bookmarks').query().preload('categories')
  }
}
