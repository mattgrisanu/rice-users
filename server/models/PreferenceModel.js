var db = require('./../config/db.js');
var User = require('./UserModel.js');

db.knex.schema.hasTable('preferences').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('preferences', function (preference) {
      preference.increments('id').primary();
      preference.string('clientId', 255);
      preference.string('preference', 255);
      preference.integer('user_id').unsigned().references('id').inTable('users');
      preference.timestamps();
    }).then(function (table) {
      console.log('Created "preferences" Table', table);
    });
  }
});

var Preference = db.Model.extend({
  tableName: 'preferences',
  hasTimestamps: true,
  user: function () {
    return this.belongTo(User, 'user_id');
  }
});

module.exports = Preference;