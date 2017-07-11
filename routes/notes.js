var express = require('express'),
	router = express.Router(),
	monk = require('monk');

module.exports = function(passort) {

	router.get('/', function(req, res) {
		var db = req.db;
		var notes_collection = db.get('notes');
		notes_collection.find({ 'author_id' : req.user._id.toString() }, 
		{"sort" : {'created': -1 }},
		function(err, notes) {
			res.send(notes);
		});
	});

	router.post('/', function(req, res) {
		var db = req.db;
		var notes_collection = db.get('notes');

		var note = {}
		note.author_id = req.user._id.toString();
		note.text = req.body['text'];
		note.title = req.body['title'];
		note.created = req.body['created'] || new Date();
		note.edited = req.body['edited'] || new Date();
		note.color = req.body['color'];

		notes_collection.insert(note, function(err, notes) {
			res.send('Done');
		});
	});

	router.put('/:note_id', function(req, res) {
		var db = req.db;
		var notes_collection = db.get('notes');
		
		notes_collection.update({ '_id' : req.params['note_id'], 'author_id' : req.user._id.toString() } , req.body, function(err, notes) {
			res.send('Done');
		});
	});

	router.delete('/:id', function(req, res) {
		var db = req.db;
		var notes_collection = db.get('notes');
		notes_collection.remove({ '_id': req.params['id'], 'author_id' : req.user._id.toString() }, function(err, notes) {
			console.log("done");
			res.send('Done');
		});
	});

	return router;
}