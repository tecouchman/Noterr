app.controller('users', function($scope, $http, $location, Auth) {
    $scope.newUser = {};
    $scope.user = {};
    $scope.errors = {};

console.log(Auth.isLoggedIn());
    if (Auth.isLoggedIn()) {
        $location.path('/notes');
    }

    $scope.register = function() {
        event.preventDefault();
        clearErrors();
        var newUser = $scope.newUser;

        if (newUser.password === newUser.password_confirm) {
            $http.post('/api/users/register', newUser).then(function(res) {
                if (res.data['error']) {
                    $scope.errors.registration = res.data['error'];
                }
                else 
                {
                    Auth.setLoggedInUser(res.data["user"]);
                    $scope.newUser = {}
                    $location.path('/notes');
                }
            });
        }
        else {
            alert("Passwords do not match");
        }
    }

    $scope.login = function() {
        clearErrors();
        $http.post('/api/users/login', $scope.user).then(function(res) {
            if (res.data['error']) {
                $scope.errors.login = res.data['error'];
            }
            else 
            {
                Auth.setLoggedInUser(res.data["user"]);
                $location.path('/notes');
            }
		});
    }

    function clearErrors() {
        $scope.errors = {};
    }
});