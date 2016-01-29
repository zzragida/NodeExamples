var ProtoBuf = require('protobufjs');
var protocol = ProtoBuf.loadProtoFile('./protocol/gateway.proto').build();


var handlers = {}
handlers[protocol.m3.gateway.MessageType.NONE] = function(request) {
  console.log('handleNone');
  return makeResponse(request);
}

handlers[protocol.m3.gateway.MessageType.VERSION] = function(request) {
  console.log('handleVersion');
  var response = makeResponse(request);

  // TODO: handling version

  return response;
}

handlers[protocol.m3.gateway.MessageType.LOGIN] = function(request) {
  console.log('handleLogin');
  return makeResponse(request);
}

handlers[protocol.m3.gateway.MessageType.LOGOUT] = function(request) {
  console.log('handleLogout');
  return makeResponse(request);
}

function makeResponse(request) {
  var response = new protocol.m3.gateway.Response();
  response.type = request.type;
  response.sequence = request.sequence + 1;
  response.checksum = 0;
  return response;
}

function makeError(response, code, reason) {
  response.error = code;
  response.reason = reason;
}

module.exports = handlers;

