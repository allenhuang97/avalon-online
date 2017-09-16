//var angular = require(angular);
var avalonApp = angular.module('avalonApp', ['ngRoute']);
var socket = io();
avalonApp.controller('appController', function($scope) {
    $scope.state = 0;
    $scope.name;
    $scope.players = [];
    $scope.changeState = function(newState){
    	if(newState == 1){
            $scope.state = newState;
    		//var socket = io.connect('http://localhost');
    		socket.emit('clientUserJoin', { name: document.getElementById('btnChooseName').value });
    		socket.on('update', function (data) {
    		    console.log("on update");
    			$scope.players = Object.keys(data.users).map(function (t) { return data.users[t].name });
                console.log("players: ", $scope.players);
                if($scope.players.length >= 5){
                    document.getElementById('btnStartGame').disabled = false;
                }
                $scope.$apply();
  			});
    	}
        if(newState == 2){
            socket.emit('start');
        }
    }
    socket.on('get_character', function (data) {
        console.log(data.character);
    })
});


// //var angular = require(angular);
// var avalonApp = angular.module('avalonApp', ['ngRoute']);
// var socket = io();
// avalonApp.controller('appController', function($scope) {
//     $scope.state = 0;
//     //$scope.name = "Name";
//     $scope.players = ["Allen", "Alen1"];
//     $scope.changeState = function(newState){
//         $scope.state = newState;    
//         if(newState == 1){
//             $scope.players.push(document.getElementById('chooseName').value);
//             //var socket = io.connect('http://localhost');
//             socket.emit('clientUserJoin', { name: document.getElementById('chooseName').value });
//             socket.on('serverUserJoin', function (data) {
//                 $scope.players.push(data.name.name);
//             });
//         }
//     }
    
// });
// avalonApp.controller('nameController', function($scope) {
    
// });

