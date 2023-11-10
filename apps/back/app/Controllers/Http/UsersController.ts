import User from '../../Models/User'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async index() {
    return await User.all()
  }

  public async show({ params }: HttpContextContract) {
    return await User.find(params.id)
  }
}
