var dropTable = require('./dropTable.js');

var tableNames = ['users', 'friends', 'preferences'];

for (var table = 0; table < tableNames.length; table++) {
  dropTable(tableNames[table]);
}