
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../../models/userModel');

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
	 		if(req.user){
	 			var query = {};
	 			if(req.user.google){
	 				console.log('google');
	 				var query = { 'google.id': req.user.google.id};
	 			} else if(req.user.twitter){
	 				console.log('twitter');
	 				var query = { 'twitter.id': req.user.twitter.id};
	 			} else if(req.user.linkedin){
	 				console.log('linkedin');
	 				var query = { 'linkedin.id': req.user.linkedin.id};
	 			} 
	 			User.findOne(query, function (error, user){
					if(user) {
				 		user.facebook = {};
				 		user.facebook.id = profile.id;
				 		user.facebook.token = accessToken;
				 		user.facebook.refreshToken = refreshToken;

				 		user.save();
				 		done(null, user);
				 	}
	 			});
			} else {
		 		var query = {'facebook.id': profile.id};

		 		User.findOne(query, function (error, user){
		 			if (user){
		 				console.log('found facebook user');
		 				done(null, user);
		 			} else {

		 				console.log('NOT found facebook user');
				 		var user = new User;
				 		console.log(profile);
				 		user.email = profile.emails[0].value;
				 		user.image = profile.photos[0].value;  //jfphotos[0].value;
				 		user.displayName = profile.displayName;

				 		user.facebook = {};
				 		user.facebook.id = profile.id;
				 		user.facebook.token = accessToken;
				 		user.facebook.refreshToken = refreshToken;

				 		user.save();
				 		done(null, user);
				 	}
				});
		 	}
		}     //jf https://console.developers.google.com/apis/api/contacts/overview?project=oauthtest-socialagg
	));
};