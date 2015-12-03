
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(app, config){
	console.log('google.strategy.js loaded');
	console.log(config.GOOGLE_CLIENT_ID+'\n'+config.GOOGLE_CLIENT_SECRET);

	passport.use(new GoogleStrategy({
		clientID: config.GOOGLE_CLIENT_ID  //jf your ClientID HERE
		,clientSecret: config.GOOGLE_CLIENT_SECRET	//jf your Secret HERE
		,callbackURL: "http://localhost:3000/auth/google/callback"
		},
	 	function (req, accessToken, refreshToken, profile, done){
	 		var user = {};
	 		console.log(profile);
	 		user.email = profile.emails[0].value;
	 		user.image = profile._json.image.url;
	 		user.displayName = profile.displayName;

	 		user.google = {};
	 		user.google.id = profile.id;
	 		user.google.token = accessToken;

	 		done(null, user);
		}     //jf https://console.developers.google.com/apis/api/contacts/overview?project=oauthtest-socialagg
	));
};