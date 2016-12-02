exports.up = function(knex, Promise) {
  return knex.schema.createTable('photos', ((table) => {
    table.increments();
    table.integer('photographer_id');
    table.string('photo_url');
  }));
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('photos');
};
