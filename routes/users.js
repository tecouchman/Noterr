var express = require('express'),
	router = express.Router();

router.get('/', function(req, res) {
	res.send('testing 124');
});
	
module.exports = router;