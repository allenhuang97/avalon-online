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
var voteCount = [0, 0];
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
        num_player = user_array.length;
        assign_character();
        user_array.forEach(function (t, i) {
        	console.log("name: " + t.name + ", character: " + t.character);
            socket_array[i].emit('get_character', {character: t.character, special: t.special, player_index: i, player_name: t.name});
        });
        init_quests();
        quest_giver = Math.round(Math.random()*( num_player - 1 ));
        var game_data = {quest_giver: quest_giver,
            quests: quests,
            current_quest: current_quest};
        io.emit('game_update', game_data);
        socket_array[quest_giver].emit('pick_quest');
    });

	socket.on('clientVote', function(choice) {
		voteCount[choice.choice] = voteCount[choice.choice] + 1;
		if(voteCount[0] + voteCount[1] === user_array.length){
			io.emit('serverVoteEnd', {voteCount: voteCount});
			if(voteCount[0] < voteCount[1]){
            //quest goes
	        }
	        else{
	        //quest doesnt go  
        	}
		}
	});

	socket.on('clientSubmitQuestPick', function(){
		io.emit('serverVoteInit');
	});

    socket.on('disconnect', function () {
        console.log("disconnect user_id: " + user_id);
        delete users[user_id];
        delete sockets[user_id];
        io.emit('update', {users: users});
    });
});

var num_player = 0;
var quest_giver = 0;
var current_quest = 0;


function get_next_quest_giver() {
    if (quest_giver == user_array.length - 1) {
        quest_giver = 0;
    }
    quest_giver++;
    return quest_giver;
}

var quests = [];
var quest_member_count = [];
var quest_member_count_1 = [2, 3, 2, 3, 3];
var quest_member_count_2 = [2, 3, 4, 3, 4];
var quest_member_count_3 = [2, 3, 3, 4, 4];
var quest_member_count_4 = [3, 4, 4, 5, 5];

function init_quests() {
    if (num_player == 5) {
        quest_member_count = quest_member_count_1
    } else if (num_player == 6) {
        quest_member_count = quest_member_count_2
    } else if (num_player == 7) {
        quest_member_count = quest_member_count_3
    } else {
        quest_member_count = quest_member_count_4
    }
    for (var i = 0; i < 5; i++) {
        quests.push({member_count: quest_member_count[i], state: 0, num_reject: 0}) // 0 - unfinished, 1 - passes, 2 - failed
    }
}



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
				user_array[i].special = {description: "Your Evil Teammate", chars: [evils[1]]};
			}
			else if(user_array[i].character === "Minion of Mordred"){
				user_array[i].special = {description: "Your Evil Teammate", chars: [evils[0]]};
			}
			else if(user_array[i].character === "Merlin"){
				user_array[i].special = {description: "The Evils Players", chars: shuffle([evils[0], evils[1]])};
			}
			else{
				user_array[i].special = {description: "Your Character Has No Special Abilities", chars: []};
			}
		}
		else if(limit <=9){
			if(user_array[i].character === "Mordred"){
				user_array[i].special = {description: "Your Evil Teammate", chars: [evils[1]]};
			}
			else if(user_array[i].character === "Morgana"){
				user_array[i].special = {description: "Your Evil Teammate", chars: [evils[0]]};
			}
			else if(user_array[i].character === "Oberon"){
				user_array[i].special = {description: "Your Evil Teammates", chars: shuffle([evils[0], evils[1]])};
			}
			else if(user_array[i].character === "Merlin"){
				user_array[i].special = {description: "The Evils Players", chars: shuffle([evils[1], evils[2]])};
			}
			else if(user_array[i].character === "Percival"){
				user_array[i].special = {description: "Merlin And Morgana", chars: shuffle([evils[1], merlin])};
			}
			else{
				user_array[i].special = {description: "Your Character Has No Special Abilities", chars: []};
			}
		}
		else if(limit === 10){
			if(user_array[i].character === "Mordred"){
				user_array[i].special = {description: "Your Evil Teammates",chars: shuffle([evils[1], evils[9]])};
			}
			else if(user_array[i].character === "Morgana"){
				user_array[i].special = {description: "Your Evil Teammates",chars: shuffle([evils[0], evils[9]])};
			}
			else if(user_array[i].character === "Oberon"){
				user_array[i].special = {description: "Your Evil Teammates", chars: shuffle([evils[0], evils[1], evils[9]])};
			}
			else if(user_array[i].character === "Assassin"){
				user_array[i].special = {description: "Your Evil Teammates", chars: shuffle([evils[0], evils[1]])};
			}
			else if(user_array[i].character === "Merlin"){
				user_array[i].special = {description: "The Evils Players", chars: shuffle([evils[1], evils[2], evils[9]])};
			}
			else if(user_array[i].character === "Percival"){
				user_array[i].special = {description: "Merlin And Morgana:", chars: shuffle([evils[1], merlin])};
			}
			else{
				user_array[i].special = {description: "Your Character Has No Special Abilities", chars: []};
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