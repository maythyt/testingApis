/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('products', table => {
    table.increments('id').primary()
    table.string('name').notNull()
    table.string('description', 1000).notNull()
    table.string('imageUrl', 1000)
    table.double('price').notNull()
    table.binary('content').notNull()
    table.integer('parentId').references('id')
         .inTable('categories')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
   return knex.schema.dropTable('products')
};
