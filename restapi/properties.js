'use strict'

/* ------------------------------------------------------------- */

module.exports = (function () {
  var instance = new Map();

  (function () {
    var models = require('./models');
    models.properties(function (rows) {
      rows.forEach(function (property) {
        instance[property.NAME] = property.VALUE;
      });
    });
  })();

  return {
    getInstance: function () {
      return instance;
    }
  }
})();

/* ------------------------------------------------------------- */
