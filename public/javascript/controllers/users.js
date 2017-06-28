app.controller('users', function($scope, $http) {
    $scope.newUser = {};
    $scope.user = {};

    $scope.register = function() {
        event.preventDefault();
        
        var newUser = $scope.newUser;

        if (newUser.password === newUser.password_confirm) {
            $http.post('/users/register', newUser).then(function(res) {
            });
            $scope.newUser = {}
        }
        else {
            alert("Passwords do not match");
        }
    }

    $scope.login = function() {
        var newUser = $scope.user;
        $http.post('/users/register', user).then(function(res) {
		});
    }

});