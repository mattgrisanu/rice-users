var Preference = require('./../models/PreferenceModel.js');

module.exports = {
  /**
  * Can this be async?
  */
  _savePreferences: function (user_id, clientId, preferenceArray, res) {
    var saveToDb = function (arr, count) {
      if (count === arr.length) {
        if (res !== undefined) {
          res.status(201).send('Add success');
        }
        return;
      }

      var newPreference = {
        user_id: user_id,
        clientId: clientId,
        preference: arr[count]
      };

      new Preference(newPreference).save()
        .then(function (saved) {
          console.log('Successfull saved preference', saved);
          saveToDb(preferenceArray, ++count);
        })
        .catch(function (err) {
          console.error('Error: Saving preference to the database', err);
        });
    };

    saveToDb(preferenceArray, 0);
  },

  getPreferences: function (req, res) {
    var clientId = res.body /************** what here? ***************/

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