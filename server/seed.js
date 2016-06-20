var fs = require('fs');
var parse = require('csv-parse');

var delimiter = ';';
var writeToDatabase = function (err, data) {
  
};

fs.createReadStream(__dirname+'/../../../../../Downloads/friends_table.csv')
  .pipe(parse({delimiter: delimiter}, writeToDatabase));