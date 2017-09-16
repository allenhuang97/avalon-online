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
var user_array = [];
var socket_array = [];
io.on('connection', function (socket) {
    var user_id = user_id_count;
    console.log("user_id: " + user_id);
    user_id_count++;

    var user = {id: user_id};
    sockets[user_id] = socket;

    socket.on('clientUserJoin', function (data) {
        console.log("user_name: " + data.name);
        user.name = data.name;
        users[user_id] = user;
        io.emit('update', {users: users});
    });

    socket.on('start', function () {
        user_array = [];
        socket_array = [];
        Object.keys(users).forEach(function (t) {
            user_array.push(users[t]);
            socket_array.push(sockets[t]);
        });
        console.log("starting1");
        assign_character();
        user_array.forEach(function (t, i) {
        	console.log("name: " + t.name + ", character: " + t.character)
            socket_array[i].emit('get_character', {character: t.character})
        });
    });

    socket.on('disconnect', function () {
        console.log("disconnect user_id: " + user_id);
        delete users[user_id];
        delete sockets[user_id];
        io.emit('update', {users: users});
    });
});

var char5_6 = ["Assassin", "Minion of Mordred", "Merlin", "Loyal Servant of Arthur","Loyal Servant of Arthur","Loyal Servant of Arthur"];
var char7_10 = ["Mordred", "Morgana", "Oberon", "Merlin", "Percival", "Loyal Servant of Arthur","Loyal Servant of Arthur", "Loyal Servant of Arthur","Loyal Servant of Arthur", "Assassin"];

function assign_character() {
	var limit = user_id_count,
    count = 0,
    lower_bound = 1,
    upper_bound = user_id_count,
    unique_random_numbers = [];
    console.log("starting");
    for(var i = 0; i < 5; i++){
    	console.log(user_array[i].user + " " + user_array[i].id);
    }
    //console.log("user_array", user_array);

	while (unique_random_numbers.length < limit) {
	    var random_number = Math.round(Math.random()*(upper_bound - lower_bound) + lower_bound);
	    if (unique_random_numbers.indexOf(random_number) == -1) { 
	        unique_random_numbers.push( random_number );
	        if(limit <= 6){
	        	user_array[count].character = char5_6[random_number-1];
	        	console.log(char5_6[random_number]); 
	        }
	        else{
	        	user_array[count].character = char7_10[random_number-1];
	        	console.log(char7_10[random_number]);
	        }
	        count++;
	    }
	}
}