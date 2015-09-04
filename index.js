var express = require('express');
var path = require('path');

// Create a new Express application
var app = express();

var views = path.join(process.cwd(), 'views');

//monitiors socket io that makes it possible to emit or broadcast to sockets
// in a remote terminal without interrupting node.js
var monitorio = require('monitor.io');

//io.use(monitorio({port: 3000}))
app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));

// Create an http server with Node's HTTP module. 
// Pass it the Express application, and listen on port 3000.
var server = require('http').createServer(app).listen(3000, function() {
    console.log('listening on port ' + 3000)
});

// Instantiate Socket.IO hand have it listen on the Express/HTTP server
var io = require('socket.io')(server);

var game = require('./game');

app.get('/', function(req,res) {
    res.sendFile(path.join(views, 'index.html'));
});

io.on('connect', function(socket) {
    socket.on('test', function(data) {
       console.log('Got message of type "test" containing data: ' + data);
        socket.emit('response', 'response test');
        socket.emit('chat', 'chat test');
    });
    socket.on('chat', function(data) {
        io.emit('chat-response', data);
    });

    game.initGame(io, socket);
});

io.on('chat', function(socket) {
    console.log('heard chat');

});