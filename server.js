/* #### Application entry point #### */

var mongo_url = process.env.MONGO_URL || 'localhost:27017/noterr';

var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	mongodb = require('mongodb'),
	monk = require('monk'),
	db = monk(mongo_url),
	bodyParser = require('body-parser');

app.use(bodyParser.json());

// routes:
var notes = require(__dirname + '/routes/notes.js');
var users = require(__dirname + '/routes/users.js');

// Set up static files
app.use(express.static(__dirname + '/public/'));

// Add db to express requests
app.use(function(req, res, next) {
	req.db = db;
	next();
})

// Set up the notes route
app.use('/notes', notes);
app.use('/users', users);

// For all other routes return the index file
app.get('/*', function(req, res) {
	res.sendFile(__dirname + '/index.html');
})

// Start listening for client requests
app.listen(port);
console.log("listening on port " + port);

