import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { AttachmentContract, attachment } from '@ioc:Adonis/Addons/AttachmentLite'

export default class PortfolioImage extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @attachment({ folder: 'portfolio-images', preComputeUrl: true })
  public image: AttachmentContract

  @column()
  public title: string

  @column()
  public userId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @beforeCreate()
  protected static async createUUID(portfolioImage: PortfolioImage) {
    portfolioImage.id = uuid()
  } 
}
