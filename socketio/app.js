var io = require('socket.io')({
  transports: ['websocket'],
});

io.attach(9001);

io.on('connection', function(socket){
  socket.on('beep', function(){
    console.log('beep received');
    socket.emit('boop');
  });
})
