var net = require('net');

var HOST = '127.0.0.1';
var PORT = 7000;

var client = new net.Socket();
client.connect(PORT, HOST, function() {
  var i;

  console.log('CONNECT TO: ' + HOST + ':' + PORT);

  for (i = 0; i < 1000; i++) {
    client.write(i + ':i am here');
  }

});

client.on('data', function(data) {
  console.log('DATA: ' + data);
});

client.on('close', function() {
  console.log('CLOSED');
});
