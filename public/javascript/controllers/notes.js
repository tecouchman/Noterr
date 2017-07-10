app.controller('notes', function($rootScope, $scope, $http, $location, Auth) {

    init();

    $scope.display_mode = "list";
    var display_grid = {
        show : true,
        onClick : function(event) {
            $scope.display_mode = "grid";
            display_grid.show = false;
            display_list.show = true;
         },
        glyphicon: 'glyphicon-th-large'
    }
    var display_list = {
        show : false,
        onClick : function(event) {
            $scope.display_mode = "list";
            display_list.show = false;
            display_grid.show = true;
         },
        glyphicon: 'glyphicon-th-list'
    }

    $rootScope.menu = [ display_grid, display_list ]
	
    function refresh() {
        $http.get('/api/notes/').then(function(res) {
            $scope.notes = res.data;
        });
    }

	$scope.addNote = function() {
		if ($scope.newNote && $scope.newNote != "") {
			var newNote = $scope.newNote;
            newNote.created = new Date();
            newNote.edited = newNote.created;

			$scope.notes.splice(0, 0, newNote);
			
			$http.post('/api/notes/', newNote).then(function(res) {
			});

			$scope.newNote = "";
		}
	}

    $scope.deleteNote = function(id) {
        if (confirm("Are you sure you would like to delete this note? ")) {
            $http.delete('/api/notes/' + id).then(function(res) {
                refresh();
            });
        }
    }

    $scope.updateNote = function(note) {
        note.edited = new Date();
        $http.put('/api/notes/' + note._id, note).then(function(res) {
        });
    }

    function init() {

        if(!Auth.isLoggedIn())
            $location.path('/login');
            
        $scope.notes = [];
	    $scope.newNote = "";
        refresh();
    }

});