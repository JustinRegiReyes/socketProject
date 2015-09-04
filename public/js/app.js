$(document).ready(function() {
   var socket = io.connect();

    socket.on('chat-response', function(data) {
        $('#chat-test').prepend('<br>' + data);
        console.log(text);
    });


var text;
    $('#chat-field').on('change', function() {
        text = $(this).val();
        console.log('chat-field sanity');
        socket.emit('chat', text);
    });
});