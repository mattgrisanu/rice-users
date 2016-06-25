var UserController = require('./../controller/UserController.js');
var FriendController = require('./../controller/FriendController.js');
var PreferenceController = require('./../controller/PreferenceController.js');

module.exports = function (app) {
  app.get('/api/users/users', UserController.getUsers);
  app.post('/api/users/users', UserController.addUser);

  app.get('/api/users/user', UserController.getUser); // give all single user info
  
  app.get('/api/users/friends', FriendController.getFriends);
  app.post('/api/users/friends', FriendController.addFriend);

  app.get('/api/users/preferences', PreferenceController.getPreferences);
  app.post('/api/users/preferences', PreferenceController.addPreference);
};