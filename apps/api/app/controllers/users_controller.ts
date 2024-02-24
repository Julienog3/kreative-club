import User from '../models/user.js'
import app from '@adonisjs/core/services/app'
import { schema } from '@adonisjs/validator'
import type { HttpContext } from '@adonisjs/core/http'
import { enablePortfolioValidator } from '#validators/user';
import PortfolioImage from '#models/portfolio_image';
import { cuid } from '@adonisjs/core/helpers';

export default class UsersController {
  public async index({ request }: HttpContext) {
    const { portfolio_enabled } = request.qs()

    if (portfolio_enabled) {
      return await User.query().where('portfolioEnabled', portfolio_enabled)
    }

    return await User.query();
  }

  public async show({ params }: HttpContext) {
    return await User.findOrFail(params.id);
  }

  public async edit({ request, params }: HttpContext) {
    const userSchema = schema.create({
      firstName: schema.string.optional(),
      lastName: schema.string.optional(),
      phoneNumber: schema.string.optional(),
      avatar: schema.file.optional({ size: '2mb', extnames: ['jpg', 'png'] }),
    })

    const user = await User.findOrFail(params.id)
    const { avatar, ...payload } = await request.validate({ schema: userSchema })

    if (avatar) {
      const fileUrl = `${cuid()}.${avatar.extname}`
      await avatar.move(app.tmpPath('uploads', 'avatars'), {
        name: fileUrl
      })
      await user.merge({...payload, avatar: '/uploads/avatars/' + fileUrl }).save()
    }
    
    await user.merge(payload).save()
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
