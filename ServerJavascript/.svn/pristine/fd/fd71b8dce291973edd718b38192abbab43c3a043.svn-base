'use strict'

var models = require('./models');

/* ------------------------------------------------------------- */

function User(userId) {
  this.userId = userId;
}

User.prototype.login = function(gameId, userId, platform, ip) {
  console.log('login');
};

User.prototype.logout = function(gameId, facebookId) {
  console.log('logout');
};

User.prototype.fillInfo = function(info) {
};

module.exports = User;

/* ------------------------------------------------------------- */

module.exports.getUserId = function (gameId, facebookId) {
  return new Promise(function (resolve, reject) {
    models.makeUser(gameId, facebookId, 10, 10, 1).then(function (userId) {
      resolve(userId);
    }, function (err) {
      reject(err);
    });
  });
};

/* ------------------------------------------------------------- */
