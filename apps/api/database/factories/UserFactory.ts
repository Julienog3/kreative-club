import User from '#app/Models/User'
import Factory from '@adonisjs/lucid/factories'
import ProfileFactory from './ProfileFactory.js'

export default Factory.define(User, ({ faker }) => {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
}).relation('profile', () => ProfileFactory).build()
