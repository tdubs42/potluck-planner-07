exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable().unique()
      users.string('password', 200).notNullable()
    })
    .createTable('events', (table) => {
      table.increments('event_id')
      table.integer('user_id').unsigned().references('users.user_id').onUpdate('CASCADE').onDelete('RESTRICT')
      table.string('title', 128).notNullable()
      table.string('description', 250)
      table.string('month').notNullable()
      table.integer('day').notNullable()
      table.integer('year').notNullable()
      table.string('location').notNullable()
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('events')
  await knex.schema.dropTableIfExists('users')
}
