var net = require('net');

var HOST = '127.0.0.1';
var PORT = 7000;

net.createServer(function (sock) {
  console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);

  sock.on('data', function (data) {
    console.log('DATA: ' + sock.remoteAddress + ': ' + data);

    sock.write(data);
  });

  sock.on('close', function (data) {
    console.log('CLOSED: ' + sock.remoteAddress + ':' + sock.remotePort);
  });

  sock.on('error', function (err) {
    console.log('ERROR: ' + err);
  });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST + ':' + PORT);
