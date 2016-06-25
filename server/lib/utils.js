module.exports = {
  oneOrIncrement: function (key, obj) {
    if (obj[key] === undefined) {
      obj[key] = 1;
    } else {
      obj[key]++;
    }
    return obj;
  },
  
  objectToArray: function (obj) {
    var results = [];
    for (var i in obj) {
      results.push(i);
    }
    return results;
  }
}