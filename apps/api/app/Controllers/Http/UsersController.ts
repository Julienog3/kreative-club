import User from '../../models/user.js'
import app from '@adonisjs/core/services/app'
import { schema } from '@adonisjs/validator'
import type { HttpContext } from '@adonisjs/core/http'


export default class UsersController {
  public async index() {
    return await User.query();
  }

  public async show({ params }: HttpContext) {
    return await User.find(params.id);
  }

  public async edit({ request, params }: HttpContext) {
    const userSchema = schema.create({
      firstName: schema.string.optional(),
      lastName: schema.string.optional(),
      phoneNumber: schema.string.optional(),
      avatar: schema.file.optional({ size: '2mb', extnames: ['jpg', 'png'] }),
      isFreelance: schema.boolean.optional(),
    })

    const user = await User.findOrFail(params.id)
    const {  avatar, ...payload } = await request.validate({ schema: userSchema })

    if (avatar) {
      await avatar.move(app.tmpPath('uploads', 'avatars'))
      await user.merge({...payload, avatar: avatar.fileName }).save()
    }
    
    await user.merge(payload).save()
  }
}
