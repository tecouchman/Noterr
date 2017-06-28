var express = require('express'),
	router = express.Router(),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;


router.post('/', function(req, res) {
	res.send('testing 124');
});
	
module.exports = router;