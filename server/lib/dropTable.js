var db = require('./config/db.js');

module.exports = function (tableName) {
  db.knex.schema.dropTable(tableName)
    .then(function (tb) {
      console.log('Dropped ', tableName, ' Table', tb);
    })
}