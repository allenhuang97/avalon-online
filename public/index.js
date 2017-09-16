//var angular = require(angular);
var avalonApp = angular.module('avalonApp', ['ngRoute']);
avalonApp.controller('appController', function($scope) {
    $scope.state = 0;
    $scope.name = "hello";
    $scope.players = ["Allen", "Melinda"];
    $scope.changeState = function(newState){
    	$scope.state = newState;
    }
});