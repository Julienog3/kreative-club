import Category from '#models/category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Category.createMany([
      {
        title: "Peinture"
      },
      {
        title: "Modélisation 3D"
      },
      {
        title: "Photographie"
      }
    ])
    // Write your database queries inside the run method
  }
}