import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, manyToMany } from '@adonisjs/lucid/orm'
import hash from '@adonisjs/core/services/hash'
import { randomUUID } from 'node:crypto'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth'
import { AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Category from '#models/category'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export enum Role {
  Admin = 'admin',
  User = 'user',
}

export default class User extends compose(BaseModel, AuthFinder) {
  public static selfAssignPrimaryKey = true
  public static currentAccessToken?: AccessToken

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare role: Role

  @column()
  declare username: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare firstName: string | null

  @column()
  declare lastName: string | null

  @column()
  declare phoneNumber: string | null

  @column()
  declare avatar: string | null

  @column()
  declare portfolioEnabled: boolean

  @manyToMany(() => Category, {
    pivotTable: 'user_categories'
  })
  declare categories: ManyToMany<typeof Category>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  static accessTokens = DbAccessTokensProvider.forModel(User)

  @beforeCreate()
  public static async createUUID(user: User) {
    user.id = randomUUID()
  }
}
