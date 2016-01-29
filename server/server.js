var net = require('net');
var ProtoBuf = require('protobufjs');
var protocol = ProtoBuf.loadProtoFile('./protocol/gateway.proto').build();
var handlers = require('./handler.js');

var HOST = '192.168.122.34';
var PORT = 7000;

var clients = [];

/*
setInterval(function() {
  console.log('connected clients');
  clients.forEach(function(client) {
     console.log(client);
  });
}, 1000);
*/

function writeData(socket, data) {
  var success = !socket.write(data);
  if (!success) {
    (function (socket, data) {
      socket.once('drain', function() {
        writeData(clientet, data);
      });
    }) (socket, data);
  }
}

// create server and listen
net.createServer(function (client) {
  var buffer = new Buffer(2048);
  var length = 0;

  //client.setTimeout(1000);
  //client.setEncoding('utf8');

  console.log('CONNECTED: ' + client.remoteAddress + ':' + client.remotePort);

  client.on('data', function (data) {
    //console.log('data received');

    // copy receive data
    length += data.copy(buffer, length, 0, data.length);

    if (length >= 4) {
      var size = buffer.readUInt8(0, 4);
      size += 4;
      if (length >= size) {
        // answer buffer
        var ans = buffer.slice(4, size);
      
        // recalculate length
        length = length - 4 - ans.length;

        // deseirialize request
        var request = protocol.m3.gateway.Request.decode(ans);

        // TODO: validate request

        // TODO: register async response handler
        process.nextTick(function() {
          var response = handlers[request.type](request);
          var buf = response.encode().toBuffer();
          var len = new Buffer([0x00,0x00,0x00,0x00]);
          len.writeUInt8(buf.length);
          //client.write(len + buf);
          writeData(client, len + buf);
        });
      }
    }
    else {
      console.log('need more data');
    }
  });

  client.on('close', function (data) {
    console.log('CLOSED: ' + data);
  });

  client.on('error', function (err) {
    console.log('ERROR: ' + err);
  });

  client.on('timeout', function () {
    console.log('TIMEOUT');
  });


}).listen(PORT, HOST);

console.log('Server listening on ' + HOST + ':' + PORT);
