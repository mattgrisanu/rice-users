var { db, Sequelize } = require('../config/db.js');

var User = db.define('users', {
  type: Sequelize.string,
  name: Sequelize.string,
  
  /************************/
  review_count: Sequelize.integer,
  average_stars: Sequelize.float,
  votes: Sequelize.string,
  friends: ,
  elite: ,
  yelping_since: ,
  compliments: ,
  fans:  
  /************************/
});

module.exports = User;