'use strict'

var ProtoBuf = require('protobufjs')
  , protocol = ProtoBuf.loadProtoFile('./protocol/gateway.proto').build();
global.protocol = protocol;

var express = require('express')
  , path = require('path')
  , logger = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser');

var index = require('./routes/index')
  , api = require('./routes/api')
  , users = require('./routes/users')
  , contents = require('./routes/contents');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', index);
app.use('/api', api);
app.use('/users', users);
app.use('/contents', contents);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(JSON.stringify({
      message: err.message,
      error: err
    }));
  });
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


module.exports = app;
