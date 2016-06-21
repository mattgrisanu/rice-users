var Preference = require('./../models/PreferenceModel.js');

module.exports = {
  _savePreferences: function (user_id, preferenceArray, res) {
    var saveToDb = function (arr, count) {
      if (count === arr.length) {
        if (res !== undefined) {
          res.status(201).send('Add success');
        }
        return;
      }

      var newPreference = {
        user_id: user_id,
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

  },

  addPreference: function (req, res) {

  }
}