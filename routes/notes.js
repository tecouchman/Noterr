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
	notes_collection.insert({ 'author_id' : req.params['id'], 'text' : req.body['text'] , 'title' : req.body['title'], 'date' : new Date() }, function(err, notes) {
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