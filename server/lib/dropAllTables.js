var dropTable = require('./dropTable.js');
var droptable = dropTable.dropTable;
var db = dropTable.db;
var User = require('./../models/UserModel.js');

/**
* Make sure your children foriegn key tables are dropped first
* In ordering tableNames => make sure children foreign key tables
* are before its parent foreign key tables
*/
var tableNames = ['friends', 'preferences', 'users'];

droptable(tableNames, 0);
