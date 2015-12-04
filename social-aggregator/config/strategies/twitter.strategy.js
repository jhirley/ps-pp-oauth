
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../../models/userModel');

module.exports = function(app, config){
	console.log('twitter.strategy.jsloaded');
	console.log(config.TWITTER_consumerKey+'\n'+config.TWITTER_consumerSecret);

	passport.use(new TwitterStrategy({
		consumerKey: config.TWITTER_consumerKey  //jf your ClientID HERE
		,consumerSecret: config.TWITTER_consumerSecret	//jf your Secret HERE
		,callbackURL: "http://localhost:3000/auth/twitter/callback"
		,passReqToCallback: true
		},
	 	function (req, token, tokenSecret, profile, done){
	 		var query = {'twitter.id': profile.id};

	 		User.findOne(query, function (error, user){
	 			if (user){
	 				console.log('found twitter user');
	 				done(null, user);
	 			} else {
	 				var user = new User;
			 		console.log('NOT found twitter user');
			 		console.log(profile);
			 		//user.email = profile.emails[0].value;
			 		user.image = profile._json.profile_image_url; //jfphotos[0].value;
			 		user.displayName = profile.displayName;

			 		user.twitter = {};
			 		user.twitter.id = profile.id;
			 		user.twitter.token = token;

			 		user.save();

			 		done(null, user);
			 	}
			}); 	
		}     //jf https://console.developers.google.com/apis/api/contacts/overview?project=oauthtest-socialagg
	));
};