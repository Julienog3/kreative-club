import { app } from '@adonisjs/core/services/app';
import type { HttpContext } from '@adonisjs/core/http'
import { schema } from '@adonisjs/validator';
import PortfolioImage from "#models/PortfolioImage";

export default class PortfolioImagesController {
  public async index() {
    return await PortfolioImage.query();
  }

  public async create({ request }: HttpContext) {
    const portfolioImageSchema = schema.create({
      title: schema.string(),
      image: schema.file({ size: '2mb', extnames: ['jpg', 'png'] }),
      userId: schema.string()
    })

    const payload = await request.validate({ schema: portfolioImageSchema })

    if (payload.image) {
      await payload.image.move(app.tmpPath('uploads', 'portfolio-images'))
    }

    await PortfolioImage.create({...payload, image: payload.image.fileName })
  }
}
