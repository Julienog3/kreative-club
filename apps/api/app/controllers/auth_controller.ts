import type { HttpContext } from '@adonisjs/core/http'
import User from '../models/user.js'
import { registerUserValidator } from '#validators/auth'

export default class AuthController {
  public async login({ request }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    return token
  }

  public async logout({ auth }: HttpContext) {
    // const { user } = auth
    // await User.accessTokens.delete(user.id, currentAccessToken.id)
    
    return {
      revoked: true,
    }
  }

  public async register({ request }: HttpContext) {
    const payload = await request.validateUsing(registerUserValidator)
    const user = await User.create(payload)

    return user
  }

  public async getMe({ auth }: HttpContext) {
    const user =  await auth.authenticate()
    return user
  }
}
