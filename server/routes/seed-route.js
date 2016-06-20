var UserSeedController = require('./../controller/UserSeedController.js');
var FriendSeedController = require('./../controller/FriendSeedController');

/** Data format
* POST to '/api/users/seed' will seed database with all userinfo
* format:
* [
*   {
*       'type': 'user',
*       'user_id': (encrypted user id),
*       'name': (first name),
*       'review_count': (review count),
*       'average_stars': (floating point average, like 4.31),
*       'votes': {(vote type): (count)},
*       'friends': [(friend user_ids)],
*       'elite': [(years_elite)],
*       'yelping_since': (date, formatted like '2012-03'),
*       'compliments': {
*           (compliment_type): (num_compliments_of_this_type),
*           ...
*       },
*       'fans': (num_fans),
*   },
*   {
*       'type': 'user',
*       'user_id': (encrypted user id),
*       'name': (first name),
*       'review_count': (review count),
*       'average_stars': (floating point average, like 4.31),
*       'votes': {(vote type): (count)},
*       'friends': [(friend user_ids)],
*       'elite': [(years_elite)],
*       'yelping_since': (date, formatted like '2012-03'),
*       'compliments': {
*           (compliment_type): (num_compliments_of_this_type),
*           ...
*       },
*       'fans': (num_fans),
*   },
*   ...
* ]
*/

module.exports = function (app) {
  app.get('/api/users/seed/users', UserSeedController.getUsers);
  app.get('/api/users/seed/friends', FriendSeedController.getFriends);
  app.post('/api/users/seed', Controller.seedDatabase);
  // app.post('/api/users/seed/friends', FriendSeedController.addFriend);
}