app.directive('note', function() {

    function link(scope, elem, attrs) {

        scope.mode = "display";
        scope.editNode = {};

        scope.enterDisplayMode = function(event) {
            if (scope.mode == "display")
                return;
            event.stopPropagation();
            scope.mode = "display";
            noteElem.removeClass('editing');
        };

        scope.enterEditMode = function(event) {
            if (scope.mode == "edit")
                return;
            scope.mode = "edit";
            scope.editNote = angular.copy(scope.note);
            noteElem.addClass('editing');
        }

        var noteElem = elem.children(".note");
        var editBar = noteElem.children(".edit-bar");
        var cancelButton = noteElem.children(".cancel");

        scope.update = function(event) {
            scope.onUpdate(scope.editNote);
            scope.note = scope.editNote;
            scope.editNote = {};
            scope.enterDisplayMode(event);
        }

        scope.cancel = function() {
            scope.editNote = {};
            scope.enterDisplayMode(event);
        }
    }

    return {
        restrict : "E",
        scope : {
            note : "=ngModel",
            onDelete : '=delete',
            onUpdate : '=update'
        },
        templateUrl : "templates/note.html",
        link : link
    }

});