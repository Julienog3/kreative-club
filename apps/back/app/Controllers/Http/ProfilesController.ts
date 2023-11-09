import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ProfilesController {
  public async show(id: number) {
    return await Profile.find(id)
  }

  public async update({ request, params }: HttpContextContract) {
    const profileSchema = schema.create({
      firstName: schema.string(),
      lastName: schema.string(),
      isProvider: schema.boolean(),
    })

    const profile = await Profile.findOrFail(params.id)
    const payload = await request.validate({ schema: profileSchema })

    await profile.merge(payload).save()
  }
}
