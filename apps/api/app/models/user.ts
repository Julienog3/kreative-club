import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, beforeSave, column } from '@adonisjs/lucid/orm'
import hash from '@adonisjs/core/services/hash'
import { randomUUID } from 'node:crypto'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth'
import { AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare username: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare rememberMeToken: string

  @column()
  declare firstName: string | null

  @column()
  declare lastName: string | null

  @column()
  declare phoneNumber: string | null

  @column()
  declare avatar: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  static accessTokens = DbAccessTokensProvider.forModel(User)

  static currentAccessToken?: AccessToken

  @beforeCreate()
  public static async createUUID(user: User) {
    user.id = randomUUID()
  }
}
