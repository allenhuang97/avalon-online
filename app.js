var express = require('express');
var app = express();
var server = app.listen(3000, function () {
    console.log('app listening on port 3000!')
});
var io = require('socket.io').listen(server);
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
      res.sendfile(__dirname + '/index.html');
});

app.post('/join', function (req, res) {

});

io.on('connection', function (socket) {
	socket.on('clientUserJoin', function (data) {
		socket.emit('serverUserJoin', { name: data });
  	});
});
