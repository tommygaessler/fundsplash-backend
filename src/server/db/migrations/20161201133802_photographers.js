exports.up = function(knex, Promise) {
  return knex.schema.createTable('photographers', ((table) => {
    table.increments();
    table.string('username');
    table.string('name');
    table.string('first_name');
    table.string('last_name');
    table.string('portfolio_url');
    table.string('bio');
    table.string('current_location');
    table.string('profile_image');
    table.string('instagram_username');
    table.string('email');
    table.string('badge');
    table.string('unsplash_url');
    table.integer('total_likes');
    table.integer('total_photos');
    table.integer('downloads');
    table.string('access_token');
  }));
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('photographers');
};
