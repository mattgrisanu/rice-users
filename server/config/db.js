var Sequelize = require('sequelize');
var sequelize = new Sequelize('rice_users', 'admin', 'rice', {
  dialect: 'mysql',
  port: 1010
});

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) { 
    console.log('Unable to connect to the database:', err);
  });

module.exports = {
  sequelize: sequelize,
  Sequelize: Sequelize
};