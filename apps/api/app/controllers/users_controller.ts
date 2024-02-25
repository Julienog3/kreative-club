import User from '../models/user.js'
import app from '@adonisjs/core/services/app'
import type { HttpContext } from '@adonisjs/core/http'
import { editUserValidator, enablePortfolioValidator, uploadUserAvatarValidator } from '#validators/user';
import PortfolioImage from '#models/portfolio_image';
import { cuid } from '@adonisjs/core/helpers';
import logger from '@adonisjs/core/services/logger';

export default class UsersController {
  public async index({ request }: HttpContext) {
    const { portfolio_enabled } = request.qs()

    if (portfolio_enabled) {
      return await User.query().where('portfolioEnabled', portfolio_enabled).preload('categories')
    }

    return await User.query().preload('categories')
  }

  public async show({ params }: HttpContext) {
    return await User.findOrFail(params.id);
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

  public async enablePortfolio({ params, request }: HttpContext) {
    const user = await User.findOrFail(params.userId)
    const { isEnabled } = await request.validateUsing(enablePortfolioValidator)

    await user.merge({ portfolioEnabled: isEnabled }).save()
  }

  public async getPortfolioIllustration({ params }: HttpContext) {
    const user = await User.findOrFail(params.userId)
    return await PortfolioImage.query().where((query) => {
      query.where('userId', user.id).andWhere('isIllustration', true).first()
    })
  }
}
