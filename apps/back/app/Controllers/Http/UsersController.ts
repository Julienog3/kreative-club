import User from '../../Models/User'

export default class UsersController {
  public async index() {
    return await User.all()
  }
}
