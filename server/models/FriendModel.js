var db = require('./../config/db.js');
var User = require('./UserModel.js');

db.knex.schema.hasTable('friends').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('friends', function(friend) {
      friend.increments('id').primary();
      friend.integer('user_id').unsigned().references('id').inTable('users');
      friend.integer('friend_id').unsigned().references('id').inTable('users');
      friend.timestamps();
    }).then(function (table) {
      console.log('Created "friends" Table', table);
    });
  }
});

var Friend = db.Model.extend({
  tableName: 'friends',
  hasTimestamps: true,
  user: function () {
    return this.belongTo(User, 'user_id');
  },
  friend: function () {
    return this.belongTo(User, 'friend_id');
  }
});

module.exports = Friend;
