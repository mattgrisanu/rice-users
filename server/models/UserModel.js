var db = require('../config/db.js');
var Sequelize = db.Sequelize;
var Sequelize = db.sequelize;

var User = db.define('users', {
  type: Sequelize.string,
  name: Sequelize.string,
  /************************/
  votes: Sequelize.string,
  friend: 
  /************************/

})