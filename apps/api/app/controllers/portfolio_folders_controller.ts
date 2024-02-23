// import type { HttpContext } from '@adonisjs/core/http'

import PortfolioFolder from "#models/portfolio_folder"
import { createPortfolioFolderValidator, setIllustrationImageValidator } from "#validators/portfolio_folder"
import { HttpContext } from "@adonisjs/core/http"

export default class PortfolioFoldersController {
  public async index({ params }: HttpContext) {
    return await PortfolioFolder.query().where('userId', params.userId).preload('portfolioImages')
  }

  public async store({ request }: HttpContext): Promise<void> {
    const payload = await request.validateUsing(createPortfolioFolderValidator)
    await PortfolioFolder.create(payload)
  }
}
