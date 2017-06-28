 var app = angular.module('quickNote', [ 'ngRoute' ]);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	
	$routeProvider.when('/', {
		templateUrl: '/partials/main.html',
		controller: 'notes'
	})
	.when('/login', {
		templateUrl: '/partials/login.html',
		controller: 'users'
	})
	.when('/register', {
		templateUrl: '/partials/register.html',
		controller: 'users'
	})

	$locationProvider.html5Mode(true);
}]);