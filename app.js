var app = angular.module("ToDoApp", []);

app.controller("ToDoController",["$scope", "$http", function($scope, $http) {
	$scope.title = "Angular ToDo Website"
	$scope.toDoList = [];

	$scope.newTodo = 	{
							"title" : "",
							"description"	: "",
							"price"	: 	"",
							"imgUrl" : "",
							"completed" : false
						}

	$scope.today = new Date();

	$scope.newTodoPopDown = false;

	//validates the user input as numbers - needs to be added
	$scope.validDollars = function (){

	};

	var baseUrl = 'http://mean.codingcamp.us/evanmorrison/todo/';
	
	$scope.getTodos = function() {
		$http.get(baseUrl)
		.then(function(response) {
			$scope.toDoList = response.data;
			$scope.toDoList.forEach(function(todo) {
				todo.isBeingEdited = false;

			});
		console.log($scope.toDoList);
		});
	}

	$scope.editTodo = function(index) {
		console.log(index);
		$scope.toDoList[index].isBeingEdited = true;
		console.log($scope.toDoList[index]);

	}

	$scope.postTodo = function(newTodo) {
		$http.post(baseUrl, newTodo)
		.then(function(response) {
			$scope.toDoList.push(response.data);
			newTodo.isBeingEdited = false;
			$scope.newTodo = {};
		})
	}

	$scope.putTodo = function(todo, index) {
		console.log('from putTodo function ');
		console.log(todo);
		console.log('index : ' + index);
		$http.put(baseUrl + todo._id, todo)
		.then(function(response, index) {
			$scope.toDoList[index] = todo;
			todo.isBeingEdited = false;
		});
	}



	$scope.deleteTodo = function(todo, index) {
		var taskId = todo._id;
		console.log(todo._id);
		console.log('index: ' + index);
		$http.delete(baseUrl + taskId)
		.then(function(response) {
			$scope.toDoList.forEach(function(item, index) {
				if (item._id === taskId) {
					$scope.toDoList.splice(index,1);
				}
			});

		})
	}

	$scope.getTodos();
}]);









