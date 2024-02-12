import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'

export default class PortfolioImage extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public title: string

  @column()
  public userId: string

  @column()
  public image: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @beforeCreate()
  protected static async createUUID(portfolioImage: PortfolioImage) {
    portfolioImage.id = randomUUID()
  } 
}
