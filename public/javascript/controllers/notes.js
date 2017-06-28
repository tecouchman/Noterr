app.controller('notes', function($scope, $http) {

    init();
	
    function refresh() {
        $http.get('/notes/123').then(function(res) {
            $scope.notes = res.data;
        });
    }

	$scope.addNote = function() {
		if ($scope.newNote && $scope.newNote != "") {
			var newNote = $scope.newNote;
			$scope.notes.splice(0, 0, newNote);
			
			$http.post('/notes/123', newNote).then(function(res) {
			});

			$scope.newNote = "";
		}
	}

    $scope.delete = function(id) {
        if (confirm("Are you sure you woudl like to delete this note? ")) {
            $http.delete('/notes/' + id).then(function(res) {
                refresh();
            });
        }
    }

    function init() {
        $scope.notes = [];
	    $scope.newNote = "";
        refresh();
    }

});