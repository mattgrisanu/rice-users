var db = require('./../config/db.js');
var Friend = require('./FriendModel.js');

db.knex.schema.hasTable('users').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function(user) {
      user.increments('id').primary();
      user.string('clientId', 255).unique();
      user.string('name', 255);
      user.string('email', 255).unique();
      user.integer('review_count');
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
    review_count: 0
  },
  friends: function () {
    return this.hasMany(Friend);
  }
});

module.exports = User;
