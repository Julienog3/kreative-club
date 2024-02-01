import User from '../../Models/User'
import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite';

export default class UsersController {
  public async index() {
    // const user = await UserFactory.with('profile').create()
    return await User.query();
  }

  public async show({ params }: HttpContextContract) {
    return await User.find(params.id);
  }

  public async edit({ request, params }: HttpContextContract) {
    const userSchema = schema.create({
      firstName: schema.string.optional(),
      lastName: schema.string.optional(),
      phoneNumber: schema.string.optional(),
      avatar: schema.file.optional({ size: '2mb', extnames: ['jpg', 'png'] }),
      isFreelance: schema.boolean.optional(),
    })

    const user = await User.findOrFail(params.id)
    const { avatar, ...payload } = await request.validate({ schema: userSchema })

    await user.merge(payload).save()

    if (avatar) {
      user.avatar = Attachment.fromFile(avatar)
      await user.save()
    }
  }
}
