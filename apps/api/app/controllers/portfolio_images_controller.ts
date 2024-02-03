import app from '@adonisjs/core/services/app';
import type { HttpContext } from '@adonisjs/core/http'
import { createPortfolioImageValidator } from '#validators/portfolio_image';
import PortfolioImage from '#models/portfolio_image';

export default class PortfolioImagesController {
  public async index({ params }: HttpContext) {
    return await PortfolioImage.query().where('user_id', params.id)
  }

  public async show({ params }: HttpContext) {
    return await PortfolioImage.findOrFail(params.id)
  }

  public async store({ request }: HttpContext): Promise<void> {  
    const payload = await request.validateUsing(createPortfolioImageValidator)

    if (payload.image) {
      await payload.image.move(app.tmpPath('uploads', 'portfolio-images'))
    }

    await PortfolioImage.create({...payload, image: payload.image.fileName })
  }

  public async destroy({ params }: HttpContext): Promise<void> {
    const portfolioImage = await PortfolioImage.findOrFail(params.id)
    await portfolioImage.delete()
  }
}
