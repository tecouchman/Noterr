 var app = angular.module('quickNote', [ 'ngRoute' ]);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	
	$routeProvider.when('/', {
		templateUrl: '/partials/main.html',
		controller: 'main'
	})
	
	$locationProvider.html5Mode(true);
}]);


app.controller('main', function($scope, $http) {
	$scope.notes = [];
	
	$scope.newNote = "";
	
	$http.get('/notes/123').then(function(res) {
		$scope.notes = res.data;
	});
	
	$scope.addNote = function() {
		if ($scope.newNote && $scope.newNote != "") {
			var newNote = { 'text' : $scope.newNote };
			$scope.notes.splice(0, 0, newNote);
			
			$http.post('/notes/123', newNote).then(function(res) {
			
			});

			$scope.newNote = "";
		}
	}
});