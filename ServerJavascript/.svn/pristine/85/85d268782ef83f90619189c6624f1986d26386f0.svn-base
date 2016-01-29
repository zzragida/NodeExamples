var express = require('express');
var router = express.Router();
var db = require('../db');

// contents routings

router.get('/achivement', function(req, res, next) {
  db.achivement(function(rows) {
    res.send(JSON.stringify(rows));
  });
});

router.get('/blueprint', function(req, res, next) {
  db.blueprint(function(rows) {
    res.send(JSON.stringify(rows));
  });
});

router.get('/cash_shop', function(req, res, next) {
  db.cash_shop(function(rows) {
    res.send(JSON.stringify(rows));
  });
});

router.get('/properties', function(req, res, next) {
  db.properties(function(rows) {
    res.send(JSON.stringify(rows));
  });
});


module.exports = router;
