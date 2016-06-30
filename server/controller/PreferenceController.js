var Preference = require('./../models/PreferenceModel.js');
var User = require('./../models/UserModel.js');
var oneOrIncrement = require('./../lib/utils.js').oneOrIncrement;
var objectToArray = require('./../lib/utils.js').objectToArray;

/**************
* OUTPUT: [[client#1pref#1, client#1pref#2, ..., client#1pref#n], [], [], ... , []]
*/
var _aggregatePreferences = function (allPreferences) {
  var aggregatePreferences = [];

  for (var preference = 0; preference < allPreferences.length; preference++) {
    aggregatePreferences.push(allPreferences.models[preference].attributes.preference);
  }

  return aggregatePreferences;
}

var _getUserPreferencesAsArray = function (clientId, callback) {
  Preference.where({ clientId: clientId }).fetchAll()
    .then(function (allPreferences) {
      console.log('prefs =>', allPreferences);
      return callback(null, allPreferences);   
    })
    .catch(function (err) {
      console.log('wjat?');
      return callback(err, null);
    })
};

var _getUsersPreferencesAsArray = function (clientIdArray, preferencesSoFar, count, res) {
  if (count === clientIdArray.length) {
    res.status(201).send(preferencesSoFar);
    return;
  } else {
    return _getUserPreferencesAsArray(clientIdArray[count], function (err, allPreferences) {
      if (err) {
        console.error('Error: Cannot fetch preferences from clientId => ', clientIdArray[count], err);
        res.status(500).send(err);
        return;
      } else {
        var aggregatePreferences = _aggregatePreferences(allPreferences);

        if (aggregatePreferences.length === 0) {
          aggregatePreferences = 'No Preferences';
        }

        preferencesSoFar.push(aggregatePreferences);

        return _getUsersPreferencesAsArray(clientIdArray, preferencesSoFar, ++count, res);
      }
    });
  }
};
/**************/

var _hasPreference = function (clientId, preference) {
  var query = {
    clientId: clientId,
    preference: preference
  };

  return Preference.where(query).fetch()
    .then(function (matchedUserPreference) {
      console.log('Matched cliendId and Preference', matchedUserPreference);
      if (matchedUserPreference === null) {
        return false;
      } else {
        return true;
      }
    })
    .catch(function (err) {
      console.error('Error: Matching ClientId and Preference', err);
      return err;
    })
}

/**********************************/
var _savePreference = function (user_id, clientId, preference, res) {
  return _hasPreference(clientId, preference)
    .then(function (exists) {
      if (!exists) {
        var newPreference = {
        user_id: user_id,
        clientId: clientId,
        preference: preference
      };

      return new Preference(newPreference).save()
        .then(function (saved) {
          console.log('Successfull saved preference', saved);
          return saved;
        })
        .catch(function (err) {
          console.error('Error: Saving preference to the database', err);
          return err;
        });
      } else {
        console.log('Preference for ', clientId, 'already exists!');
        return exists;
      }    
    });
}
/**
* recursive
*/
var _savePreferences = function (user_id, clientId, preferencesArr, count, res) {
  if (count === preferencesArr.length) {
    res.status(201).send('Save preferences successful');
    return;
  }

  _savePreference(user_id, clientId, preferencesArr[count])
    .then(function (saved) {
      return _savePreferences(user_id, clientId, preferencesArr, ++count, res);
    })
    .catch(function (err) {
      console.error('Error: Cannot save ', preferencesArr[count], ' ', err);
      res.status(500).send(err);
      return;
    })

}
/**********************************/

module.exports = {
  _savePreference: _savePreference,

  getPreferences: function (req, res) {
    var clientId = req.body.clientId; /************** what here? ***************/

    _getUserPreferencesAsArray(clientId, function (err, allPreferences) {
      if (err) {
        console.error('Error: Cannot fetch preferences from clientId => ', clientId, err);
        res.status(500).send(err);
        return;
      } else {
        var aggregatePreferences = _aggregatePreferences(allPreferences);

        if (aggregatePreferences.length === 0) {
          res.status(201).send('No Preferences => []');
        } else {
          res.status(201).send(aggregatePreferences);
        }
        return;
      }
    });
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
  /** res = []; => [[], [], [], []]arrays of arrays of each user preference
  */
  getGroupPreferences: function (req, res) {
    var clientIdArray = req.body.group;
    var clientId = req.body.clientId;
    var allPreferences = []; // {pref: 0, ...}

    _getUsersPreferencesAsArray(clientIdArray, allPreferences, 0, res);
  },

  addPreference: function (req, res) {
    var user = req.body;
    var clientId = user.clientId;
    var preferences = user.preferences; // []

    User.where({ clientId: clientId }).fetch()
      .then(function (matchedUser) {
        _savePreferences(matchedUser.id, clientId, preferences, 0, res);
      })
      .catch(function (err) {
        console.error('Error: Cannot match clientId => ', clientId, ' - ', err);
        res.status(500).send(err);
      })

  }
}