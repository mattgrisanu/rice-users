var User = require('./../models/UserModel.js');
var PreferenceController = require('./../controller/PreferenceController.js');

/**
* {
*   name:
*   email: 
*   user_id: 
*   preferences: [] 
* }
*/

module.exports = {
  getUsers: function (req, res) {
    User.where({}).fetchAll()
      .then(function (allUsers) {
        res.status(200).send(allUsers);
      })
      .catch(function (err) {
        console.error('Error: Fetching all users from db', err);
        res.status(500).send(err);
      });
  },

  addUser: function (req, res) {
    var user = req.body;
    var newUser = {
      name: user.name,
      email: user.email,
      clientId: user.user_id
    };

    new User(newUser).save()
      .then(function (saved) {
        console.log('Sucessfully saved => ', saved);
        if (user.preferences.length === 0) {
          res.status(201).send('Add success');
        } else {
          for (var preference = 0; preference < user.preferences.length; preference++) {
            res = (preference === user.preferences.length -1) ? res : undefined;
            
            PreferenceController
              ._savePreference(
                saved.id, 
                saved.attributes.clientId, 
                user.preferences[preference], 
                res
              );
          }
        }

      })
      .catch(function (err) {
        console.error('Error: Saving to database', err);
        res.status(500).send(err);
      })
  }
};