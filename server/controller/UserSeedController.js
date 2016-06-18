var User = require('./../models/UserSeedModel.js');

module.exports = {
  getUsers: function (req, res) {
    User.find({}).exec(function (err, allUsers) {
      if (err) {
        console.error('Error: Cannot GET allUsers from the database');
        res.status(500).send(err);
      }
      res.status(200).send(allUsers);
    });
  },

  getFriends: function (req, res) {
    var id = res.body.user_id;

    User.find({user_id: id}).exec(function (err, allFriends) {
      if (err) {
        console.error('Error: Cannot GET allFriends from the database for, ', user_id);
        res.status(500).send(err);
      }
      res.status(200).send(allFriends);
    })
  },

  addFriend: function (req, res) {
    var id = res.body.friend_id;
  }
};