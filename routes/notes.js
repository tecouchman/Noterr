var express = require('express'),
	router = express.Router();

router.get('/:author_id', function(req, res) {
	var db = req.db;
	var notes_collection = db.get('notes');
	notes_collection.find({ 'author_id' : req.params['author_id'] }, 
	{"sort" : {'created': -1 }},
	function(err, notes) {
		res.send(notes);
	});
});

router.post('/:author_id', function(req, res) {
	var db = req.db;
	var notes_collection = db.get('notes');

	var note = {}
	note.author_id = req.params['author_id'];
	note.text = req.body['text'];
	note.title = req.body['title'];
	note.created = req.body['title'] || new Date();

	notes_collection.insert(note, function(err, notes) {
		res.send('Done');
	});
});

router.put('/:author_id/:note_id', function(req, res) {
	var db = req.db;
	var notes_collection = db.get('notes');
	notes_collection.update({ '_id' : req.params['note_id'], 'author_id' : req.params['author_id'] } , req.body, function(err, notes) {
		res.send('Done');
	});
});

router.delete('/:id', function(req, res) {
	var db = req.db;
	var notes_collection = db.get('notes');
	notes_collection.remove({ '_id': req.params['id']}, function(err, notes) {
		console.log("done");
		res.send('Done');
	});
});

module.exports = router;