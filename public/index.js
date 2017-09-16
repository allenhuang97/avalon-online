//var angular = require(angular);
var avalonApp = angular.module('avalonApp', ['ngRoute']);
var socket = io();
avalonApp.controller('appController', function($scope) {
    $scope.state = 0;
    $scope.name;
    $scope.players = ["Allen", "Alen1"];
    $scope.changeState = function(newState){
    	$scope.state = newState;
    	if(newState == 1){
    		//var socket = io.connect('http://localhost');
    		socket.emit('clientUserJoin', { name: 'Hello' });
    		socket.on('update', function (data) {
    		    console.log("on update");
    			$scope.players = Object.keys(data.users).map(function (t) { return data.users[t].name });
                console.log("players: ", $scope.players);
  			});
    	}
    }
});