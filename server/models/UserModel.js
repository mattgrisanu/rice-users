var db = require('./../config/db.js');
var Friend = require('./FriendModel.js');
var Preference = require('./PreferenceModel.js');

db.knex.schema.hasTable('users').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function(user) {
      user.increments('id').primary();
      user.string('clientId', 255).unique();
      user.string('name', 255);
      user.string('email', 255).unique();
      user.integer('review_count');
      user.boolean('isOnboarded');
      user.timestamps();
      
      /* For seed data */
      user.string('password', 255);
    }).then(function (table) {
      console.log('Created "users" Table', table);
    });
  }
});

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  defaults: {
    review_count: 0,
    isOnboarded: false
  },
  friends: function () {
    return this.hasMany(Friend);
  },
  preferences: function () {
    return this.hasMany(Preference);
  }
});

module.exports = User;
