import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'
import { schema } from '@ioc:Adonis/Core/Validator'
import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'

export default class ProfilesController {
  public async show(id: number) {
    return await Profile.find(id)
  }

  public async update({ request, params }: HttpContextContract) {
    const profileSchema = schema.create({
      firstName: schema.string.optional(),
      lastName: schema.string.optional(),
      avatar: schema.file.optional({ size: '2mb', extnames: ['jpg', 'png'] }),
      isProvider: schema.boolean.optional(),
    })

    const profile = await Profile.findOrFail(params.id)
    const { avatar, ...payload } = await request.validate({ schema: profileSchema })

    await profile.merge(payload).save()

    if (avatar) {
      profile.avatar = Attachment.fromFile(avatar)
      await profile.save()
    }
  }
}
