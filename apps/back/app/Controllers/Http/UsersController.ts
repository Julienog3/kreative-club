import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async index(ctx: HttpContextContract) {
    return [
      {
        id: 1,
        username: 'julienog',
        email: 'julien@auger.fr',
      }
    ]
  }
}
