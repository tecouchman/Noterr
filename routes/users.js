var express = require('express'),
	router = express.Router();

module.exports = function(passort, bcrypt) {
        
    router.post('/register', function(req, res, next) { 
        req.db.get('users').findOne({ $or : [ {username: req.body['username']}, {email_address: req.body['email_address']}] }, function(err, user) {
            if (err) { 
                console.log("ERROR during registration: " + err)
                res.send({ "error" : "Registration failed, please try again" });
            }
            else if (req.body['username'] == null 
                    || req.body['email_address'] == null
                    || req.body['password'] == null) {
                res.send({ "error" : "Please fill in all fields" });
            }
            if (user) {
                if (user.username == req.body['username'])
                    res.send({ "error" : "Username has already been registered" });
                else if (user.email_address == req.body['email_address'])
                    res.send({ "error" : "Email address has already been registered" });
            } else {
                console.log("Inserting new user");
                var newUser = {
                    username : req.body['username'],
                    password : generateHash(req.body['password']),
                    created : new Date(),
                    last_login : new Date(),
                    email_address : req.body["email_address"]
                }
                var user = req.db.get('users').insert(newUser, function(err, user) {
                    console.log(user);
                    req.logIn(user, function(err) {
                        console.log("loginerror?", err);
                        if (err) { 
                            return next(err); 
                        }
                        return res.send({ 'user' : user })
                    });
                });
                
            }
        });
    });
    
    router.post('/login', function(req, res, next) { 
        passport.authenticate('login', function(err, user, info) {

            console.log('got here1');

            if (err) { 
                console.log('ERROR:', err);
                return next(err); 
            }
            if (!user) { 
                console.log('Login failed');
                return res.send({ 'error' : 'Username or password are incorrect.'})
            }
            req.logIn(user, function(err) {
                console.log("loginerror?", err);
                if (err) { 
                    return next(err); 
                }
                return res.send({ 'user' : user })
            });
        })(req, res, next);
    });

    router.get('/logout', function(req, res, next) { 
        req.logout();
        res.redirect('/login');
    });

    router.get("/loggedInUser", function(req, res) {
        console.log("still there?", req.user)
        res.send(req.user);
    })

    function generateHash(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    }

    return router;
}