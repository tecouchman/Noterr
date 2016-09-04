 var app = angular.module('quickNote', [ 'ngRoute' ]);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	
	$routeProvider.when('/', {
		templateUrl: '/partials/main.html',
		controller: 'main'
	})
	
	$locationProvider.html5Mode(true);
}]);


app.controller('main', function($scope, $http) {
	$scope.notes = [ "Test" ];
	
	$scope.newNote = "";
	
	$http.get('/notes/').then(function(res) {
		$scope.test = res.data;
	});
	
	$scope.addNote = function() {
		if ($scope.newNote && $scope.newNote != "") {
			$scope.notes.splice(0, 0, $scope.newNote);
			$scope.newNote = "";
		}
	}
});