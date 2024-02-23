import User, { Role } from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      username: "admin",
      email: 'jauger@admin.com',
      password: "admin",
      firstName: "Julien",
      lastName: "Auger",
      role: Role.Admin,
      portfolioEnabled: true
    })
    // Write your database queries inside the run method
  }
}