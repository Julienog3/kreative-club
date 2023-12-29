import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'profiles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.string('first_name')
      table.string('last_name')
      table.json('avatar')
      table.boolean('is_provider')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
