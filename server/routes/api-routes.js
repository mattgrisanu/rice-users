var UserController = require('./../controller/UserController.js');
var FriendController = require('./../controller/FriendController.js');
var UserSeedController = require('./../controller/UserSeedController.js');
var FriendSeedController = require('./../controller/FriendSeedController');

module.exports = function (app) {
  /* Real Data */
  app.get('/api/users/users', UserController);
  app.get('/api/users/friends', FriendController);
  app.post('/api/users/friends', FriendController);

  /* Seed Data */
  app.get('/api/users/seed/users', UserSeedController);
  app.get('/api/users/seed/friends', FriendSeedController);
  app.post('/api/users/seed/friends', FriendSeedController);
};