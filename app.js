var express = require('express');
var app = express();
var server = app.listen(3000, function () {
    console.log('app listening on port 3000!')
});
var io = require('socket.io').listen(server);

app.get('/', function (req, res) {
      res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
      socket.emit('news', { hello: 'world' });
        socket.on('my other event', function (data) {
                console.log(data);
                  });
});
