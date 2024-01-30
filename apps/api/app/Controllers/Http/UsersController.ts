import User from '../../Models/User'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async index() {
    // const user = await UserFactory.with('profile').create()
    return await User.query();
  }

  public async show({ params }: HttpContextContract) {
    return await User.find(params.id);
  }

  // public async updateUserProfile({ request, params }: HttpContextContract) {
  //   const profileSchema = schema.create({
  //     firstName: schema.string.optional(),
  //     lastName: schema.string.optional(),
  //     avatar: schema.file.optional({ size: '2mb', extnames: ['jpg', 'png'] }),
  //     isProvider: schema.boolean.optional(),
  //   })

  //   const user = await User.find(params.id)

    
  //   // const [profile] = await user!.related('profile').query()

  //   const { avatar, ...payload } = await request.validate({ schema: profileSchema })

  // }
}
