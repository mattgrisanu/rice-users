var mongoose = require('mongoose');

var UsersSchema = mongoose.Schema({
  type          : String,
  friends       : String,
  user_id       : String,
  name          : String,
  review_count  : Integer,
  average_stars : Double,
  votes         : String,
  elite         : String,
  yelping_since : String,
  compliments   : String,
  fans          : Integer
});

var User = mongoose.model('User', UsersSchema);

module.exports = User;