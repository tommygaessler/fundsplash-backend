'use strict';

exports.seed = function(knex, Promise) {
  return knex('photos').del()
    .then(() => knex('campaigns').del())
    .then(() => knex('photographers').del());
};
