var UserController = require('./../controller/UserController.js');
var FriendController = require('./../controller/FriendController.js');
var PreferenceController = require('./../controller/PreferenceController.js');

module.exports = function (app) {
  app.get('/api/users/users', UserController.getUsers);
  app.post('/api/users/user/update', UserController.updateUser);
  app.post('/api/users/user/new', UserController.addUser);

  app.post('/api/users/user', UserController.getUser); // give all single user info

  app.post('/api/users/friends', FriendController.getFriends);
  app.post('/api/users/friends/new', FriendController.addFriend);

  app.post('/api/users/preferences', PreferenceController.getPreferences);
  app.post('/api/users/preferences/update', PreferenceController.addPreference);
  
  app.post('/api/users/group/preferences', PreferenceController.getGroupPreferences);
};