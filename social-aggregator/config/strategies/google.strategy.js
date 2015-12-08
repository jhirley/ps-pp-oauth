
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../../models/userModel');

module.exports = function(app, config){
	console.log('google.strategy.js loaded');
	console.log(config.GOOGLE_CLIENT_ID+'\n'+config.GOOGLE_CLIENT_SECRET);

	passport.use(new GoogleStrategy({
		clientID: config.GOOGLE_CLIENT_ID  //jf your ClientID HERE
		,clientSecret: config.GOOGLE_CLIENT_SECRET	//jf your Secret HERE
		,callbackURL: "http://localhost:3000/auth/google/callback"
		},
	 	function (req, accessToken, refreshToken, profile, done){
	 		
	 		if(req.user){
	 			var query = {};
	 			if(req.user.linkedin){
	 				console.log('linkedin');
	 				var query = { 'linkedin.id': req.user.linkedin.id};
	 			} else if(req.user.facebook){
	 				console.log('facebook');
	 				var query = { 'facebook.id': req.user.facebook.id};
	 			} else if(req.user.linkedin){
	 				console.log('twitter');
	 				var query = { 'twitter.id': req.user.twitter.id};
	 			} 
	 			User.findOne(query, function (error, user){
					if(user) {
				 		user.google = {};
				 		user.google.id = profile.id;
				 		user.google.token = accessToken;
						user.google.refreshToken = refreshToken;
	
				 		user.save();
				 		done(null, user);
				 	}
	 			});
			} else {
	 			console.log('GoogleStrategy running')
		 		var query = {'google.id': profile.id};
	
		 		User.findOne(query, function (error, user){
		 			if (user){
		 				console.log('found google user');
		 				done(null, user);
		 			} else {
		 				var user = new User;
				 //jf		console.log(profile);
		 				console.log('NOT found google user');
				 		user.email = profile.emails[0].value;
				 		user.image = profile._json.image.url;
				 		user.displayName = profile.displayName;
	
				 		user.google = {};
				 		user.google.id = profile.id;
				 		user.google.token = accessToken;
						user.google.refreshToken = refreshToken;

				 		user.save();	
				 		done(null, user);		
		 			}
		 		});
		 	}
		}     //jf https://console.developers.google.com/apis/api/contacts/overview?project=oauthtest-socialagg
	));
};