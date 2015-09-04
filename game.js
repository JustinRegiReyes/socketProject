var io;
var gameSocket;

exports.initGame = function(sio, socket){
    io = sio;
    gameSocket = socket;
    socket.on('test', function(data) {
        console.log('Game.js hears');
    });
};