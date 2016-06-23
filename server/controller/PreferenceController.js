var Preference = require('./../models/PreferenceModel.js');

module.exports = {
  /**
  * Can this be async? Yes
  */
  _savePreference: function (user_id, clientId, preference, res) {
    var newPreference = {
        user_id: user_id,
        clientId: clientId,
        preference: preference
      };

    new Preference(newPreference).save()
      .then(function (saved) {
        console.log('Successfull saved preference', saved);
        if (res !== undefined) {
          res.status(201).send('Add success');
        }
      })
      .catch(function (err) {
        console.error('Error: Saving preference to the database', err);
      });
  },

  getPreferences: function (req, res) {
    var clientId = req.body /************** what here? ***************/

    Preference.where({ clientId: clientId }).fetchAll()
      .then(function (allPreferences) {
        var aggregatePreferences = {};
        for (var preference = 0; preference < allPreferences.length; preference++) {
          aggregatePreferences[allPreferences.models[preference].attributes.preference] = true;
        }

        res.status(200).send(aggregatePreferences);        
      })
      .catch(function (err) {
        console.error('Error: Cannot find preferences in db', err);
        res.status(500).send(err);
      })
  },

  addPreference: function (req, res) {

  }
}