import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import User from '../../Models/User'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import UserFactory from 'Database/factories/UserFactory'

export default class UsersController {
  public async index() {
    const user = await UserFactory.with('profile').create()
    return await User.query().preload('profile')
  }

  public async show({ params }: HttpContextContract) {
    return await User.find(params.id)
  }

  public async updateUserProfile({ request, params }: HttpContextContract) {
    const profileSchema = schema.create({
      firstName: schema.string.optional(),
      lastName: schema.string.optional(),
      avatar: schema.file.optional({ size: '2mb', extnames: ['jpg', 'png'] }),
      isProvider: schema.boolean.optional(),
    })

    const user = await User.find(params.id)
    const [profile] = await user!.related('profile').query()

    const { avatar, ...payload } = await request.validate({ schema: profileSchema })

    await profile.merge(payload).save()

    if (avatar) {
      profile.avatar = Attachment.fromFile(avatar)
      await profile.save()
    }
  }
}
