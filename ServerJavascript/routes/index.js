'use strict';

var router = require('express').Router()
  , User = require('../user')
  , jwt = require('jsonwebtoken');

/* ------------------------------------------------------------- */

// index page for test
router.get('/', function(req, res) {
  res.send('SoulHearts Server by Node.js');
});

/* ------------------------------------------------------------- */

// health check
router.get('/health', function(req, res) {
  res.send(JSON.stringify({
      pid: process.pid
    , memory: process.memoryUsage()
    , uptime: process.uptime()
  }));
});

/* ------------------------------------------------------------- */

// issue access_token
router.post('/token', function(req, res) {
  logger.debug(req.body);

  // registration user information
  let gameId = req.body.gameId;
  let udid = req.body.udid;
  let platform = req.body.platform;
  let facebookId = req.body.facebookId || 0;

  // issue access_token for user
  new Promise(function (resolve, reject) {
    User.getUserId(gameId, facebookId, function (err, userId) {
      if (err) reject(err);
      resolve(userId);
    });
  }).then(function (userId) {
    // TODO: managing secret_key
    // generated token
    // userId, pid(last process id)
    let accessToken = jwt.sign({userId:userId, pid:process.pid}, 'secret_key');
    res.send(JSON.stringify({accessToken: accessToken}));
  }).catch(function (err) {
    res.send(err);
  });

});

/* ------------------------------------------------------------- */

module.exports = router;
