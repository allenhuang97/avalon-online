//var angular = require(angular);
var avalonApp = angular.module('avalonApp', ['ngRoute']);
avalonApp.controller('appController', function($scope) {
    $scope.state = 0;
    $scope.name;
    $scope.players = ["Allen", "Alen1"];
    $scope.changeState = function(newState){
    	$scope.state = newState;
    	if(newState == 1){
    		var socket = io();
    		//var socket = io.connect('http://localhost');
    		socket.emit('clientUserJoin', { name: 'Hello' });
    		socket.on('serverUserJoin', function (data) {
    			$scope.players.push(data.name.name);
				console.log(data.name.name);
  			});
    	}
    }
});