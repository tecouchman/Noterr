var express = require('express'),
	router = express.Router();

router.get('/:id', function(req, res) {
	var db = req.db;
	var notes_collection = db.get('notes');
	notes_collection.find({ 'author_id' : req.params['id'] }, function(err, notes) {
		res.send(notes);
	});
});

router.post('/:id', function(req, res) {
	var db = req.db;
	var notes_collection = db.get('notes');
	notes_collection.insert({ 'author_id' : req.params['id'], 'text' : req.body['text'] }, function(err, notes) {
		res.send('Done');
	});
});

	
module.exports = router;