'use strict'

var router = require('express').Router();

/* ------------------------------------------------------------- */

router.get('/', function(req, res) {
  res.send('respond with a resource');
});

/* ------------------------------------------------------------- */

module.exports = router;
