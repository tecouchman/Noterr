/* #### Application entry point #### */

var mongo_url = process.env.MONGO_URL || 'localhost:27017/noterr';

var express = require('express')
  expressSession = require('express-session'),
	app = express(),
	port = process.env.PORT || 3000,
	mongodb = require('mongodb'),
	monk = require('monk'),
	db = monk(mongo_url),
	bodyParser = require('body-parser'),
	passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy
  config = require('config'),
  bcrypt = require('bcrypt');

if (!config.has("session_secret"))
  process.exit()

app.use(expressSession({secret : config.get("session_secret")}))
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user._id);
})

passport.deserializeUser(function(id, done) {
  console.log('deserializeUser1');
  db.get('users').findOne(monk.id(id), function(err, user) {
    console.log(JSON.stringify(user))
      done(err, user);
  });
})

passport.use('login', new LocalStrategy(
  function(username, password, done) {
    console.log('login strategy : ');
    console.log('user',username);
    console.log('pw',password);
    db.get('users').findOne({ email_address: username }, function(err, user) {
      if (err) { 
        console.log('ERROR(login strategy) :', err);
        return done(err); 
      }
      if (!user) {
        console.log('Login strategy: User not found');
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        console.log('Login strategy: bad password');
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.use('register', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
    db.get('users').findOne({ username: username }, function(err, user) {
      if (err) { 
        console.log("ERROR during registration: " + err)
        return done(err); 
      }
      if (user) {
        //res.send({ "error" : "Username has already been registered" });
        return done(null, false, { message: 'Incorrect username.' });
      } else {
        var newUser = {
          username : username,
          password : generateHash(password),
          created : new Date(),
          last_login : new Date(),
          email_address : req.params["email_address"]
        }
        db.get('users').insert(newUser);
        //res.send({ "success" : true });
        return done(null, newUser);
      }
    });
  }
));

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

app.use(bodyParser.json());

// routes:
var notes = require(__dirname + '/routes/notes.js')(passport);
var users = require(__dirname + '/routes/users.js')(passport);

// Set up static files
app.use(express.static(__dirname + '/public/'));

// Add db to express requests
app.use(function(req, res, next) {
	req.db = db;
	next();
})

// Set up the notes route
app.use('/api/notes', notes);
app.use('/api/users', users);

// For all other routes return the index file
app.get('/*', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
})

// Start listening for client requests
app.listen(port);
console.log("listening on port " + port);

