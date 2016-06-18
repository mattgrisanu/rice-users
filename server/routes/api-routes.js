var UserController = require('./../controller/UserController.js');
var FriendController = require('./../controller/FriendController.js');

module.exports = function (app) {
  app.get('/api/users/users', UserController.getUsers);
  app.get('/api/users/friends', FriendController.getFriends);
  app.post('/api/users/friends', FriendController.addFriend);
};