var ProtoBuf = require('protobufjs')
  , protocol = ProtoBuf.loadProtoFile('./protocol/gateway.proto').build()
  , gateway = protocol.m3.gateway
  , common = protocol.m3.common
  , room = protocol.m3.room;

module.exports.gateway = gateway;
module.exports.common = common;
module.exports.room = room;

/* ------------------------------------------------------------- */

module.exports.version = function (proto, service, platform, validation) {
  var request = makeRequest(gateway.MessageType.VERSION);
  request.version = new gateway.Request.Version({
      protocol: proto
    , service: service
    , platform: platform
    , validation: validation || null
  });
  return base64Encoding(request);
};

/* ------------------------------------------------------------- */

module.exports.login = function (game_id, access_token, udid, platform, facebook_id) {
  var request = makeRequest(gateway.MessageType.LOGIN);
  request.login = new gateway.Request.Login({
      game_id: game_id
    , udid: udid
    , platform: platform || common.PlatformType.PLATFORM_ANDROID
    , access_token: access_token || null
    , facebook_id: facebook_id || null
  });
  return base64Encoding(request);
};

/* ------------------------------------------------------------- */

module.exports.logout = function (game_id, facebook_id) {
  var request = makeRequest(gateway.MessageType.LOGOUT);
  request.logout = new gateway.Request.Logout({
      game_id: game_id
    , facebook_id: facebook_id
  });
  return base64Encoding(request);
};

/* ------------------------------------------------------------- */

module.exports.plug = function () {
};

/* ------------------------------------------------------------- */

module.exports.info = function () {
  return base64Encoding(makeRequest(gateway.MessageType.INFO));
};

/* ------------------------------------------------------------- */

module.exports.properties = function () {
  return base64Encoding(makeRequest(gateway.MessageType.PROPERTIES));
};

/* ------------------------------------------------------------- */

function makeRequest (type) {
  var request = new gateway.Request();
  request.type = type;
  request.sequence = 0;
  request.checksum = 0;
  return request;
}
module.exports.makeRequest = makeRequest;

function base64Encoding (request) {
  return request.encode().toBuffer().toString('base64');
}
module.exports.base64Encoding = base64Encoding;

function base64Decoding (data) {
  var encodedString = new Buffer(data, 'base64');
  return gateway.Response.decode(encodedString);
}
module.exports.base64Decoding = base64Decoding;

/* ------------------------------------------------------------- */
