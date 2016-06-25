var Preference = require('./../models/PreferenceModel.js');
var oneOrIncrement = require('./../lib/utils.js').oneOrIncrement;
var objectToArray = require('./../lib/utils.js').objectToArray;

/**
* Needs to be
*/
var _getUserPreferences =  function (clientId) {
  return Preference.where({ clientId: clientId }).fetchAll()
    .then(function (allPreferences) {
      var aggregatePreferences = {};
      for (var preference = 0; preference < allPreferences.length; preference++) {
        aggregatePreferences = oneOrIncrement(allPreferences.models[preference].attributes.preference, aggregatePreferences);
      }
      return aggregatePreferences;    
    })
};

var _getUsersPreferences = function (clientIdArray, preferencesSoFar, count) {
  if (count < clientIdArray.length) {
    return _getUserPreferences(clientIdArray[count])
      .then(function (allPreferences) {
        for (var preference in allPreferences) {
          preferencesSoFar = oneOrIncrement(preference, preferencesSoFar)
        }
        return _getUsersPreferences(clientIdArray, preferencesSoFar, ++count);
      })
      .catch(function (err) {
        console.error('Error: Failed to get preferences for', clientIdArray[count], '=>', err);
      })
  } else {
    return preferencesSoFar;
  }
};

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
    var clientId = req.body.clientId; /************** what here? ***************/

    _getUserPreferences(clientId)
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
  /** res = []; => array of unique perferences from all users
  */
  getGroupPreferences: function (req, res) {
    var clientIdArray = req.body.group;
    var allPreferences = {}; // {pref: 0, ...}

    _getUsersPreferences(clientIdArray, allPreferences, 0)
      .then(function (preferencesSoFar) {
        res.status(200).send(objectToArray(preferencesSoFar));
      })
      .catch(function (err) {
        res.status(500).send(err);
      })
  },

  addPreference: function (req, res) {

  }
}