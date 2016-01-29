'use strict'

/* ------------------------------------------------------------- */

var PROPERTIES = (function () {
  var instance = {};

  (function () {
    var models = require('./models');
    models.properties(function (err, rows) {
      rows.forEach(function (property) {
        instance[property.NAME] = property.VALUE;
      });
    });
  })();

  return instance;
})();

/* ------------------------------------------------------------- */

module.exports.PROPERTIES = PROPERTIES;
