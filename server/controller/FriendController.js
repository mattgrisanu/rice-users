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

module.exports = {
  getFriends: function (req, res) {
    var userId = res.body /************** what here? ***************/
    var query = {
      user_id: userId
    };

    Friend.where(query).fetchAll()
      .then(function (allFriends) { // primary key in user table
        _matchFriendToUser(allFriends.models, 0, [], res);
      })
      .catch(function (err) {
        console.error('Error: Fetching all friends from db', err);
        res.status(500).send(err);
      });
  },

  _matchFriendToUser: function (allFriends, count, soFar, res) {
    if (count === allFriends.length) {
      res.status(200).send(soFar);
      return;
    }

    var userId = allFriends[count].attributes.friend_id;

    User.where({ id: userId }).fetch()
      .then(function (matchedUser) {
        soFar.push(matchedUser);

        _matchFriendToUser(allFriends, ++count, soFar, res);
      })
      .catch(function (err) {
        console.error('Error: Matching user and friend from db', err);
        res.status(500).send(err);
      });
  },

  addFriend: function (req, res) {
    // cannot add duplicate friend
    var userId = res.body /************** what here? ***************/
    var newFriends = res.body /************** what here? ***************/

    var checkAndSaveToDb = function (u, f) {
      var newFriend = {
        user_id: u,
        friend_id: f
      };

      Friend.where(newFriend).fetchAll().then(function (matchedFriend) {
        if (matchedFriend.length === 0) {
          new Friend(newFriend).save()
            .then(function (saved) {
              console.log('Saved sucessfully to database', saved);
            });
        } else {
          console.error('Error: Duplicate Friend or more than 1 match', matchedFriend);
        }
      })
    };

    // async check and add
    for (var friend = 0; friend < newFriends.length; friend++) {
      checkAndSaveToDb(userId, newFriends[friend]);
    }
  }
};