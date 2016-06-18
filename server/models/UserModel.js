var db = require('./../config/db.js').s;
var Friend = require('./FriendModel.js');

db.knex.schema.hasTable('users').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function(user) {
      user.increments('id').primary();
      user.timestamps();
      user.string('name', 255);
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  friends: function () {
    return this.hasMany(Friend);
  }
});

module.exports = User;

// var { db, Sequelize } = require('../config/db.js');

// var User = db.define('users', {
//   type: Sequelize.string,
//   name: Sequelize.string,
  
//   /************************/
//   review_count: Sequelize.integer,
//   average_stars: Sequelize.float,
//   votes: Sequelize.string
//   /*
//   friends: ,
//   elite: ,
//   yelping_since: ,
//   compliments: ,
//   fans:  
//   */
//   /************************/
// });

// module.exports = User;