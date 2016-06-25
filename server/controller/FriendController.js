var User = require('./../models/UserModel.js');
var Friend = require('./../models/FriendModel.js');

// POST
// add friend data to user

/**
* {
*   user_id:
*   friends: [] // old AND new
* }
*/

// GET
// get all friends for a user

/**
* Can this be async? NO
*/
var _getFriendInfoFromAllFriends = function (allFriends, count, soFar, res) {
  if (count === allFriends.length) {
    res.status(200).send(soFar);
    return;
  }

  var userId = allFriends[count].attributes.friend_id;

  User.where({ id: userId }).fetch()
    .then(function (matchedUser) {
      soFar.push(matchedUser);

      _getFriendInfoFromAllFriends(allFriends, ++count, soFar, res);
    })
    .catch(function (err) {
      console.error('Error: Matching user and friend from db', err);
      res.status(500).send(err);
    });
};

var _matchClientIdToId = function (clientId, callback) {
  User.where({ clientId: clientId })
      .fetch()
      .then(function (matchedUser) {
        callback(null, matchedUser);
      })
      .catch(function (err) {
        callback(err, null);
      });
}

var _checkForDuplicateAndSave = function (user_Id, friendClientId, allFriends, res) {
  if (friendClientId === allFriends[allFriends.length]) {
    res.status(201).send('Finished adding friends');
    return;
  }

  // match friendClientIds to ids in user table
  _matchClientIdToId(friendClientId, function (err, matchedUser) {
    if (err) {
      console.error('Error: Friend with this cliendId: ', friendClientId, ' is not in the database');
    } else {
      var newFriend = {
        user_id: user_Id,
        friend_id: matchedUser.attributes.id
      };

      Friend.where(newFriend).fetchAll()
        .then(function (matchedFriend) {
          if (matchedFriend.length === 0) {// check for duplicate
            new Friend(newFriend).save()
              .then(function (saved) {
                console.log('Saved sucessfully to database', saved);
              });
          } else {
            console.error('Error: Duplicate Friend or more than 1 match', matchedFriend);
          }
        });      
    }
  })
};

module.exports = {
  getFriends: function (req, res) {
    var userId = req.query.clientId; /************** what here? ***************/
    var user = {
      user_id: userId
    };

    Friend.where(user).fetchAll()
      .then(function (allFriends) { // primary key in user table
        _getFriendInfoFromAllFriends(allFriends.models, 0, [], res);
      })
      .catch(function (err) {
        console.error('Error: Fetching all friends from db', err);
        res.status(500).send(err);
      });
  },

  addFriend: function (req, res) {
    console.log('POST friends => ', req.body); // clientId
    // cannot add duplicate friend

    var newFriends = req.body.friends; // clientId
    // match clientId with db user id
    _matchClientIdToId(req.body.user_id, function (err, matchedUser) {
      if (err) {
        res.status(500).send('User with this cliendId: ', req.body.user_id, ' is not in the database');
      } else {
        // async check and add
        for (var friend = 0; friend < newFriends.length +1; friend++) {
          _checkForDuplicateAndSave(matchedUser.attributes.id, newFriends[friend], newFriends, res);
        }
      }
    });
  }
};