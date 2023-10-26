import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from '../../Models/User'

export default class UsersController {
  public async index() {
    return await User.all()
  }

  public async create({ request }: HttpContextContract) {
    const newUserSchema = schema.create({
      username: schema.string(),
      email: schema.string(),
      password: schema.string({}, [rules.confirmed()]),
    })

    const payload = await request.validate({ schema: newUserSchema })
    await User.create(payload)
  }
}
