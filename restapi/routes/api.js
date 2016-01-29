var router = require('express').Router()
  , gateway = protocol.m3.gateway
  , common = protocol.m3.common
  , room = protocol.m3.room
  , handlers = {};

/* ------------------------------------------------------------- */

function makeResponse(request) {
  var response = new gateway.Response();
  response.type = request.type;
  response.sequence = request.sequence + 1;
  response.checksum = 0;
  return response;
}

function error(response, code, reason) {
  response.error = new gateway.Response.Error({code:code, reason:reason});
  return response;
}

function base64Encoding(response) {
  return response.encode().toBuffer().toString('base64');
}

/* ------------------------------------------------------------- */

function handleRequest(request) {
  return new Promise(function (reply, reject) {
    var handler = handlers[request.type];
    console.log(request.type, handler);
    reply(handler(request));
  });
}

/* ------------------------------------------------------------- */

// /api request router
router.post('/', function (req, res, next) {
  var encodedString = new Buffer(req.body.data, 'base64');
  var request = gateway.Request.decode(encodedString);

  handleRequest(request).then(function (response) {
    res.send(base64Encoding(response));
  }, function (err) {
    console.log(err);
  });
});

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.NONE] = function (request) {
  var response = makeResponse(request);
  return response;
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.VERSION] = function (request) {
  var response = makeResponse(request);

  if (request.version.service != '0.1-test') {
    return error(response, gateway.ErrorCode.EC_VERSION, '서비스 버전이 맞지 않음');
  }

  return response;
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.LOGIN] = function (request) {
  var response = makeResponse(request);
  response.login = new gateway.Response.Login();
  response.login.plug_ip = '10.30.76.12';
  response.login.plug_port = 9000;
  response.login.passwd = 'password';
  return response;
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.LOGOUT] = function (request) {
  var response = makeResponse(request);
  return response;
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.PLUG] = function (request) {
  var response = makeResponse(request);
  return response;
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.INFO] = function (request) {
  var response = makeResponse(request);
  response.info = new common.GameInfo({
      honbul: 0
    , cash: 0
    , talisman: 0
    , stone: 0
    , coin: 0
    , heart: 0
    , inventory_size: 100
    , searchable: true
    , vip_level: 0
    , no_facebook_message: false
    , no_facebook_profile: false
    , review: false
  });
  return response;
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.PROPERTIES] = function (request) {
  var response = makeResponse(request);
  return response;
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.MAKE_HERO] = function (request) {
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.SELECT_HERO] = function (request) {
};

/* ------------------------------------------------------------- */

module.exports = router;
