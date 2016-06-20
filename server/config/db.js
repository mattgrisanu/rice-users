// /**
// * MongoDB database for seed data
// */
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/usersM');

// var m = mongoose.connection;

// m.on('error', console.error.bind(console, 'Error: Cannot connect to the database: usersM'));
// m.once('open', function () {
//   console.log('Connectd to the database: usersM');
// });

/**
* mySQL database for real data
*/
var connection = {
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    database : 'riceUsers',
    user     : 'riceAdmin',
    password : 'rice',
    charset  : 'utf8'
  },
  useNullAsDefault: true
};

var knex = require('knex')(connection);

var s = require('bookshelf')(knex);

module.exports = s;

// var Sequelize = require('sequelize');
// var sequelize = new Sequelize('rice_users', 'admin', 'rice', {
//   dialect: 'mysql',
//   port: 1010
// });

// sequelize
//   .authenticate()
//   .then(function(err) {
//     console.log('Connection has been established successfully.');
//   }, function (err) { 
//     console.log('Unable to connect to the database:', err);
//   });

// module.exports = {
//   db: sequelize,
//   Sequelize: Sequelize
// };