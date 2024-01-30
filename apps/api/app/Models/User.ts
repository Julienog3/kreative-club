import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import { v4 as uuid } from 'uuid'
import { AttachmentContract, attachment } from '@ioc:Adonis/Addons/AttachmentLite'

export default class User extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string

  @column()
  public firstName: string | null

  @column()
  public lastName: string | null

  @attachment({ folder: 'avatars', preComputeUrl: true })
  public avatar: AttachmentContract | null

  @column()
  public isFreelance: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(user: User) {
    user.id = uuid()
  } 

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
