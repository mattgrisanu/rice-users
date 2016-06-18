var UserSeedController = require('./../controller/UserSeedController.js');
var FriendSeedController = require('./../controller/FriendSeedController');

/** Data format
* POST to '/api/users/seed/friends' will need to send the friend-to-be-added's id in res.body.friend_id
*/
module.exports = function (app) {
  app.get('/api/users/seed/users', UserSeedController.getUsers);
  app.get('/api/users/seed/friends', FriendSeedController.getFriends);
  app.post('/api/users/seed/friends', FriendSeedController.addFriend);
}