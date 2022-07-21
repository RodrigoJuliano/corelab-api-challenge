import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'vehicles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 128).notNullable()
      table.string('description', 256)
      table.string('plate', 7).unique().notNullable()
      table.boolean('is_favorite').notNullable().defaultTo(false)
      table.string('brand', 128).notNullable()
      table.integer('year').notNullable()
      table.string('color', 7).notNullable()
      table.integer('price').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
