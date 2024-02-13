import type { HttpContext } from '@adonisjs/core/http'
import { schema, rules } from '@adonisjs/validator'
import User from '../../models/user.js'

export default class AuthController {
  public async login({ request }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    return token
  }

  public async logout({ auth }: HttpContext) {
    const user = auth.user

    await User.accessTokens.create(user)
    return {
      revoked: true,
    }
  }

  public async register({ auth, request }: HttpContext) {
    const userSchema = schema.create({
      username: schema.string({ trim: true }, [
        rules.unique({ table: 'users', column: 'username', caseInsensitive: true }),
      ]),
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email', caseInsensitive: true }),
      ]),
      password: schema.string({}, [rules.minLength(7), rules.confirmed()]),
    })

    const userPayload = await request.validate({ schema: userSchema })
    const user = await User.create(userPayload)

    // await user.related('profile').create({ isProvider: false })

    await auth.login(user)
  }

  public async getMe({ auth, response }: HttpContext) {
    await auth.use('api').authenticate()

    try {
      const user = auth.use('api').user
      return user
    } catch {
      return response.unauthorized('No user connected')
    }
  }
}
