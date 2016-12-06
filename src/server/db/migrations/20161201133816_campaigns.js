exports.up = function(knex, Promise) {
  return knex.schema.createTable('campaigns', ((table) => {
    table.increments();
    table.integer('photographer_id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.string('status');
    table.string('location');
    table.string('sample_photo_1');
    table.string('sample_photo_2');
    table.string('sample_photo_3');
    table.text('description');
    table.integer('goal');
    table.float('raised');
    table.timestamp('ends_at');
  }));
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('campaigns');
};
