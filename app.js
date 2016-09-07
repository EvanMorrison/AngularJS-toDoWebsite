var app = angular.module("ToDoApp", []);

app.controller("ToDoController", function($scope, $http) {
	$scope.title = "Angular ToDo Website"
});