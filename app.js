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

var users = {};
var sockets = {};
var user_id_count = 1;
io.on('connection', function (socket) {
    var user_id = user_id_count;
    console.log("user_id: " + user_id);
    user_id_count++;

    var user = {id: user};
    sockets[user_id] = socket;

    socket.on('clientUserJoin', function (data) {
        console.log("user_name: " + data.name);
        user.name = data.name;
        users[user_id] = user;
        io.emit('update', {users: users});
    });

    socket.on('start', function () {
        assign_character();
        Object.keys(sockets).forEach(function (t) { sockets[t].emit('get_character', {character: users[t].character}) })
    });

    socket.on('disconnect', function () {
        console.log("disconnect user_id: " + user_id);
        delete users[user_id];
        delete sockets[user_id];
        io.emit('update', {users: users});
    });
});

function assign_character() {
    Object.keys(users).forEach(function (t) { users[t].character = users[t].name });
}