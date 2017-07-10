 var app = angular.module('quickNote', [ 'ngRoute' ]);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	
	$routeProvider.when('/', {
		templateUrl: '/partials/login.html',
		controller: 'users'
	})
	.when('/notes', {
		templateUrl: '/partials/notes.html',
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
app.factory('Auth', function($http, $rootScope) {

	var loggedInUser;

	var isLoggedIn = function() {
		console.log("logged in user",loggedInUser);
		return (loggedInUser) ? loggedInUser : false;
	}
	var setLoggedInUser = function(user) {
		loggedInUser = user;
		$rootScope.loggedInUser = loggedInUser;
	}
	var fetchServerSessionUser = function() {
		$http.get("/api/users/loggedInUser").then(function(res) {
			setLoggedInUser(res.data);
		});
	}
	var logOut = function() {

	}

	return {
		isLoggedIn : isLoggedIn,
		setLoggedInUser : setLoggedInUser,
		fetchServerSessionUser : fetchServerSessionUser
	}
})
app.run(function(Auth) {
	console.log("GETTING USER LOL");
	Auth.fetchServerSessionUser();
});