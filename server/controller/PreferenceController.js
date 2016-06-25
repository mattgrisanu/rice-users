var Preference = require('./../models/PreferenceModel.js');
var oneOrIncrement = require('./../lib/utils.js').oneOrIncrement;
var objectToArray = require('./../lib/utils.js').objectToArray;

/**************
* OUTPUT: [[client#1pref#1, client#1pref#2, ..., client#1pref#n], [], [], ... , []]
*/
var _getUserPreferencesAsArray = function (clientId) {
  return Preference.where({ clientId: clientId }).fetchAll()
    .then(function (allPreferences) {
      var aggregatePreferences = [];
      for (var preference = 0; preference < allPreferences.length; preference++) {
        aggregatePreferences.push(allPreferences.models[preference].attributes.preference);
      }
      return aggregatePreferences;    
    })
};

var _getUsersPreferencesAsArray = function (clientIdArray, preferencesSoFar, count, res) {
  if (count >= clientIdArray.length) {
    res.status(201).send(preferencesSoFar);
    return preferencesSoFar;
  } else {
    _getUserPreferencesAsArray(clientIdArray[count])
      .then(function (allPreferences) {
        preferencesSoFar.push(allPreferences);
        _getUsersPreferencesAsArray(clientIdArray, preferencesSoFar, ++count, res);
      })
      .catch(function (err) {
        console.error('Error: Failed to get preferences for', clientIdArray[count], '=>', err);
      })
  }
};
/**************/

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
    var clientId = req.query.clientId; /************** what here? ***************/

    _getUserPreferencesAsArray(clientId)
      .then(function (allPreferences) {
        res.status(200).send(allPreferences);
      })
      .catch(function (err) {
        console.error('Error: Cannot find preferences in db', err);
        res.status(500).send(err);
      })
  },

  /** getGroupPreferences request **/
  /** req.body =
  {
    group: [ 
    clientId#1,
    clientId#2
    ]
  }
  */

  /** getGroupPreferences response **/
  /** res = []; => arrays of arrays of each user preference
  */
  getGroupPreferences: function (req, res) {
    var clientIdArray = req.body.group;
    var allPreferences = []; // {pref: 0, ...}

    _getUsersPreferencesAsArray(clientIdArray, allPreferences, 0, res);
  },

  addPreference: function (req, res) {

  }
}