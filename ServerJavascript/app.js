'use strict'

/* ------------------------------------------------------------- */

// enable V8 profiler
require('v8-profiler');

/* ------------------------------------------------------------- */

// global variables
// protocol
const ProtoBuf = require('protobufjs');
global.PROTOCOL = ProtoBuf.loadProtoFile('./protocol/gateway.proto').build();
global.DATA = ProtoBuf.loadProtoFile('./protocol/data.proto').build();

// settings
global.SETTINGS = require('./settings').SETTINGS;

// logger
global.logger = require('./logger');

// errors
const errors = require('./errors');
global.NotImplementedError = errors.NotImplementedError;

// properties
global.PROPERTIES = require('./properties').PROPERTIES;

// cache
global.CACHE = require('./cache');

// Objects
global.Users = {};

/* ------------------------------------------------------------- */

// initialize express

// express
var express = require('express')
  , morgan = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , expressValidator = require('express-validator')
  , helmet = require('helmet');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());

// TODO: config security options for express
app.disable('x-powered-by');

/* ------------------------------------------------------------- */

// initialize passport

// passport
var passport = require('passport')
  , jwt = require('jsonwebtoken')
  , BearerStrategy = require('passport-http-bearer').Strategy;

app.use(passport.initialize());
// use BearerStrategy
passport.use(new BearerStrategy(
  function (token, done) {
    // 1. find userId by access_token
    let decoded;
    try {
      decoded = jwt.verify(token, 'secret_key');
    } catch (err) {
      return done(new Error('Unauthroized token'));
    }

    if (!decoded.userId) {
      return done(new Error('Unauthroized token'));
    }

    //logger.debug(decoded);

    // TODO: verify userId

    // TODO: expire update access_token

    var user = {userId: decoded.userId};
    process.nextTick(function () {
      return done(null, user);
    });
  }
));

// bearer authenticate for /api
app.all('/api', 
  passport.authenticate('bearer', { session: false }),
  function (req, res, next) {
    req.checkBody('access_token', 'Access Token is required').notEmpty();
    req.checkBody('data', 'Data is required').notEmpty();

    let errors = req.validationErrors();
    if (errors) {
      res.send('Request data is required', 400);
      return;
    }

    // fowarding verified user object
    next();
  }
);

/* ------------------------------------------------------------- */

// routers
var index = require('./routes/index')
  , api = require('./routes/api')
  , users = require('./routes/users')
  , contents = require('./routes/contents');

// initialize routers
app.use('/', index);
app.use('/api', api);
app.use('/users', users);
app.use('/contents', contents);

/* ------------------------------------------------------------- */

// error handlers

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
logger.info('running ' + app.get('env'));

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(JSON.stringify({
      message: err.message,
      error: err
    }));
  });

  // heap dump
  if (SETTINGS.PROFILER_HEAPDUMP) {

  }

  // profiler
  if (SETTINGS.PROFILER_ENABLE) {
    var memwatch = require('memwatch-next');
    var heapdump = require('heapdump');
    var dumpFile = function () {
      return 'heapdump/heapdump-' + process.pid + '-' + Date.now() + '.heapsnapshot';
    };

    // memory leak then warning
    memwatch.on('leak', function (info) {
      logger.error('Memory leak detected: ', info);
      heapdump.writeSnapshot(dumpFile());
    });

    // memory status then GC
    memwatch.on('stats', function (stats) {
      logger.debug('Memory status: ', stats);
    });

    // heapdump monitor
    setInterval(function () {
      heapdump.writeSnapshot(dumpFile());
    }, SETTINGS.PROFILER_INTERVAL);
  }
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(JSON.stringify({
    message: err.message,
    error: {}
  }));
});

/* ------------------------------------------------------------- */

module.exports = app;
