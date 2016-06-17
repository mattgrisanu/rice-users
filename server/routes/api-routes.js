var UserController = require('../controller/UserController.js');
var FriendController = require('../controller/FriendController.js');

module.exports = function (app) {
  app.get('/api/users/users', UserController);

  app.get('/api/users/friends', FriendController);
  app.post('/api/users/friends', FriendController);
};