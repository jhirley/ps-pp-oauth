
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(app, config){
	console.log('google.strategy.js loaded\n');
	console.log(config.GOOGLE_CLIENT_ID+'\n'+config.GOOGLE_CLIENT_SECRET+'\n');

	passport.use(new GoogleStrategy({
		clientID: config.GOOGLE_CLIENT_ID
		,clientSecret: config.GOOGLE_CLIENT_SECRET
		,callbackURL: "http://localhost:3000/auth/google/callback"
		},
	 	function (req, accessToken, refreshToken, profile, done){
	 		done(null, profile);
		}     //jf https://console.developers.google.com/apis/api/contacts/overview?project=oauthtest-socialagg
	));
};