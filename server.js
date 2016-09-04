/* #### Application entry point #### */

var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000;

// routes:
var notes = require(__dirname + '/routes/notes.js');

// Set up static files
app.use(express.static(__dirname + '/public/'));

// Set up the notes route
app.use('/notes', notes);

// For all other routes return the index file
app.get('/*', function(req, res) {
	res.sendFile(__dirname + '/index.html');
})

// Start listening for client requests
app.listen(port);
console.log("listening on port " + port);

