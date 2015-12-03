
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(app, config){
	console.log('facebook.strategy.jsloaded');
	console.log(config.FACEBOOK_CLIENT_ID+'\n'+config.FACEBOOK_CLIENT_SECRET);

	passport.use(new FacebookStrategy({
		clientID: config.FACEBOOK_CLIENT_ID  //jf your ClientID HERE
		,clientSecret: config.FACEBOOK_CLIENT_SECRET	//jf your Secret HERE
		,callbackURL: "http://localhost:3000/auth/facebook/callback"
		,passReqToCallback: true
		,profileFields: ['id', 'email', 'displayName', 'photos']

		},
	 	function (req, accessToken, refreshToken, profile, done){
	 		var user = {};
	 		console.log(profile);
	 		user.email = profile.emails[0].value;
	 		user.image = profile.photos[0].value;  //jfphotos[0].value;
	 		user.displayName = profile.displayName;

	 		user.facebook = {};
	 		user.facebook.id = profile.id;
	 		user.facebook.token = accessToken;

	 		done(null, user);
		}     //jf https://console.developers.google.com/apis/api/contacts/overview?project=oauthtest-socialagg
	));
};