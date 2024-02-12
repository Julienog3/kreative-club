import  Application  from '@ioc:Adonis/Core/Application';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator';
import PortfolioImage from "App/Models/PortfolioImage";

export default class PortfolioImagesController {
  public async index() {
    return await PortfolioImage.query();
  }

  public async create({ request }: HttpContextContract) {
    const portfolioImageSchema = schema.create({
      title: schema.string(),
      image: schema.file({ size: '2mb', extnames: ['jpg', 'png'] }),
      userId: schema.string()
    })

    const payload = await request.validate({ schema: portfolioImageSchema })

    if (payload.image) {
      await payload.image.move(Application.tmpPath('uploads', 'portfolio-images'))
    }

    await PortfolioImage.create({...payload, image: payload.image.fileName })
  }
}
