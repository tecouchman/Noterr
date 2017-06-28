app.directive('note', function() {

    function link(scope, elem, attrs) {

        var noteElem = elem.children(".note");

        elem.click(function() {
            noteElem.addClass('editing');
        })

    }

    return {
        restrict : "E",
        scope : {
            note : "=ngModel",
            delete : '=delete'
        },
        templateUrl : "templates/note.html",
        link : link
    }

});