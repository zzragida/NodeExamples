'use strict'

module.exports = (function () {
  var instance;

  function init() {
    return {
      // TODO: initialize here
    };
  };

  return {
    getInstance: function () {
      if (!instance) {
        instance = init();
      }
      return instance;
    }
  };

})();
