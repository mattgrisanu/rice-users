var db = require('./../config/db.js');
var User = require('./UserModel.js');

db.knex.schema.hasTable('friends').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('friends', function(friend) {
      friend.increments('db_id').primary();
      friend.integer('user_id').unsigned().references('users.id');
      friend.integer('friend_id').unsigned().references('users.id');
      friend.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

var Friend = db.Model.extend({
  tableName: 'friends',
  hasTimestamps: true,

  user: function () {
    return this.belongsTo(User);
  },
  friend: function () {
    return this.belongsTo(User);
  }
});

module.exports = Friend;

// var { db, Sequelize } = require('../config/db.js');

// var Friend = db.define('friends', {
//   userId: ,
//   friendUserId:
// });

// module.exports = Friend;