var express = require('express'),
	router = express.Router();

module.exports = function(passort) {

    router.post('/', function(req, res) {
        res.send('testing 124');
    });
        
    router.post('/register', passport.authenticate('register', {
        successRedirect : '/login',
        failureRedirect : '/register?failed=true'
    }));

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

    return router;
}