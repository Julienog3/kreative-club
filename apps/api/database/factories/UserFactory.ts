import Factory from '@ioc:Adonis/Lucid/Factory'
import User from '../../app/Models/User'

export default Factory.define(User, ({ faker }) => {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
}).build()
