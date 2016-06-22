// Load environment variables
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './server/env/development.env' });
} else if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: './server/env/production.env' });
}

var fs = require('fs');
var parse = require('csv-parse');
var UserController = require('./controller/UserController.js');
var FriendController = require('./controller/FriendController.js');
var User = require('./models/UserModel.js');
var Friend = require('./models/FriendModel.js');

var delimiter = ';';
var friendCsvPath = process.env.DATA_PATH + 'friends_table.csv';
var UserCsvPath = process.env.DATA_PATH + 'users_table.csv';

var batchSize = 1000;
/**
* what about duplicates??
*/

/**
* In series
*/
var writeUsersToDatabase = function (err, data) {
  if (err) {
    console.log("Error: Reading users_table CSV file => ", err);
  } else {
    var saveToDb = function (d, count) {
      if (count === d.length) {
        readAndWriteFromFile(friendCsvPath, writeFriendsToDatabase);
        return;
      }

      var split = d[count][0].split(',');

      // Do not store rows with clientId #NAME?
      if (split[0] === '#NAME?') {
        saveToDb(d, ++count);
        return;
      }

      var newUser = {
        clientId: split[0],
        name: split[1],
        email: split[2],
        password: split[3],
        review_count: split[4]
      };

      new User(newUser).save()
        .then(function (saved) {

          // if (Math.floor((count/d.length)*100)%10 === 0) {
          //   console.log('here');
          //   console.log((count/d.length)*100, '% complete');
          // }

          saveToDb(d, ++count);
        })
        .catch(function (err) {
          console.log('Error: Saving to the database', err);
        });
    };
    saveToDb(data, 1);
  }

};

var writeFriendsToDatabase = function (err, data) {
  if (err) {
    console.log("Error: Reading friends_table CSV file => ", err);
  } else {
    
    var saveToDb = function (d, count) {
      if (count === d.length) {
        return;
      }

      var split = d[count][0].split(',');
      var userId = split[0];
      var friendId = split[1];

      // Do not store rows with clientId #NAME?
      if (userId === '#NAME?' || friendId === '#NAME?') {
        saveToDb(d, ++count);
        return;
      }

      User.where({ clientId: userId }).fetch()
        .then(function (matchedUser) {
          User.where({ clientId: friendId }).fetch()
            .then(function (matchedFriend) {
              var newFriend = {
                user_id: matchedUser.id,
                friend_id: matchedFriend.id
              };

              new Friend(newFriend).save()
                .then(function (saved) {

                  // if (Math.floor((count/d.length)*100)%10 === 0) {
                  //   console.log((count/d.length)*100, '% complete');
                  // }

                  saveToDb(d, ++count);
                });
            });
        })
        .catch(function (err) {
          console.log('Error: Finding matching user', err);
        });
    };

    saveToDb(data, 1);
  }
};

/**
* async db writing
*/


var readAndWriteFromFile = function (path, cb) {
  fs.createReadStream(__dirname + path)
    .pipe(parse({delimiter: delimiter}, cb));
}

readAndWriteFromFile(UserCsvPath, writeUsersToDatabase);
