//passport.js

var passport = require('passport');

module.exports = function(app, config){
	console.log('passport.js loaded\n');
	app.use(passport.initialize());
	app.use(passport.session());

	passport.serializeUser(function (user, done){
	    done(null, user);
	});

	passport.deserializeUser(function (user, done) {
	  done(null, user);
	});

	require('./strategies/google.strategy')(app, config);

}