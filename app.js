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
        assign_character();
        user_array.forEach(function (t, i) {
        	console.log("name: " + t.name + ", character: " + t.character);
            socket_array[i].emit('get_character', {character: t.character, special: t.special});
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
var evils = ["", "", "", ""];
var merlin;

function assign_character() {
	var limit = user_array.length,
    count = 0,
    lower_bound = 1,
    upper_bound = user_array.length,
    unique_random_numbers = [];

	while (unique_random_numbers.length < limit) {
	    var random_number = Math.round(Math.random()*(upper_bound - lower_bound) + lower_bound);
	    if (unique_random_numbers.indexOf(random_number) == -1) { 
	        unique_random_numbers.push( random_number );
	        if(limit <= 6){
	        	user_array[count].character = char5_6[random_number-1];
	        	if(random_number <= 2){
	        		evils[random_number - 1] = user_array[count].name;
	        	}
	        }
	        else{
	        	user_array[count].character = char7_10[random_number-1];
	        	if(random_number <= 3){
	        		evils[random_number - 1] = user_array[count].name;
	        	}
	        	else if(random_number === 9){
	        		evils[4] = user_array[count].name;
	        	}
	        	else if(random_number === 4){
	        		merlin = user_array[count].name;
	        	}
	        }
	        count++;
	    }
	}
	for(var i = 0; i < user_array.length; i++){
		if(limit <= 6){
			if(user_array[i].character === "Assassin"){
				user_array[i].special = {description: "Your Teammate Is:", chars: [evils[1]]};
			}
			else if(user_array[i].character === "Minion of Mordred"){
				user_array[i].special = {description: "Your Teammates Is:", chars: [evils[0]]};
			}
			else if(user_array[i].character === "Merlin"){
				user_array[i].special = {description: "The Evils Are:", chars: shuffle([evils[0], evils[1]])};
			}
		}
		else if(limit <=9){
			if(user_array[i].character === "Mordred"){
				user_array[i].special = {description: "Your Teammate Is:", chars: [evils[1]]};
			}
			else if(user_array[i].character === "Morgana"){
				user_array[i].special = {description: "Your Teammate Is:", chars: [evils[0]]};
			}
			else if(user_array[i].character === "Oberon"){
				user_array[i].special = {description: "Your Teammates Are:", chars: shuffle([evils[0], evils[1]])};
			}
			else if(user_array[i].character === "Merlin"){
				user_array[i].special = {description: "The Evils Are:", chars: shuffle([evils[1], evils[2]])};
			}
			else if(user_array[i].character === "Percival"){
				user_array[i].special = {description: "One Is Merlin And The Other Is Morgana:", chars: shuffle([evils[1], merlin])};
			}
		}
		else if(limit === 10){
			if(user_array[i].character === "Mordred"){
				user_array[i].special = {description: "Your Teammates Are:",chars: shuffle([evils[1], evils[9]])};
			}
			else if(user_array[i].character === "Morgana"){
				user_array[i].special = {description: "Your Teammates Are:",chars: shuffle([evils[0], evils[9]])};
			}
			else if(user_array[i].character === "Oberon"){
				user_array[i].special = {description: "Your Teammates Are:", chars: shuffle([evils[0], evils[1], evils[9]])};
			}
			else if(user_array[i].character === "Assassin"){
				user_array[i].special = {description: "Your Teammates Are:", chars: shuffle([evils[0], evils[1]])};
			}
			else if(user_array[i].character === "Merlin"){
				user_array[i].special = {description: "The Evils Are:", chars: shuffle([evils[1], evils[2], evils[9]])};
			}
			else if(user_array[i].character === "Percival"){
				user_array[i].special = {description: "One Is Merlin And The Other Is Morgana:", chars: shuffle([evils[1], merlin])};
			}
		}
	}
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}