
var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin').Strategy;
var User = require('../../models/userModel');

module.exports = function(app, config){

	console.log('linkedin.strategy.js loaded');
	console.log(config.LINKEDIN_consumerKey+'\n'+config.LINKEDIN_consumerSecret);

	passport.use(new LinkedInStrategy({
		consumerKey: config.LINKEDIN_consumerKey  //jf your ClientID HERE
		,consumerSecret: config.LINKEDIN_consumerSecret	//jf your Secret HERE
		,callbackURL: "http://localhost:3000/auth/linkedin/callback"
		,profileFields: ['id', 'first-name', 'last-name' ,'email-address', 'picture-url']  //,'displayName'
	//	,scope: ['r_emailaddress', 'r_basicprofile'],
		},
	 	//function (req, token, tokenSecret, profile, done){
	 		function (token, tokenSecret, profile, done){
	 		var req= '';
	 		console.log('req is '+req);
	 		console.log('token is'+token);
	 		console.log('tokenSecret is');
	 		console.log(tokenSecret);
	 		console.log('profile is');
	 		console.log(profile);

	 		if(req.user){

 				var query = {};
	 			if(req.user.google){
	 				console.log('google');
	 				var query = { 'google.id': req.user.google.id};
	 			} else if(req.user.twitter){
	 				console.log('twitter');
	 				var query = { 'twitter.id': req.user.twitter.id};
	 			} else if(req.user.facebook){
	 				console.log('facebook');
	 				var query = { 'facebook.id': req.user.facebook.id};
	 			}
	 			User.findOne(query, function (error, user){
					if(user) {
				 		user.linkedin = {};
				 		user.linkedin.id = profile.id;
				 		user.linkedin.token = token;
				 		user.linkedin.tokenSecret = tokenSecret;
	
				 		user.save();
				 		done(null, user);
				 	}
	 			});
			} else {
				console.log('Linkedin DID NOT Find req.user');
		 		var query = {'linkedin.id': profile.id};
		 		
		 		User.findOne(query, function (error, user){
		 			if (user){
		 				console.log('found linkedin user');
		 				done(null, user);
		 			} else {
		 				console.log('NOT found linkedin user');
		 				
				 		var user = new User;
				 		//jfconsole.log(profile);
				 		//jf(profile.emails[0].value){
				 		user.email = profile.emails[0].value;//}
				 		user.image = profile._json.pictureUrl; //jfphotos[0].value;
				 		user.displayName = profile.displayName;
	
				 		user.linkedin = {};
				 		user.linkedin.id = profile.id;
				 		user.linkedin.token = token;
				 		user.linkedin.tokenSecret = tokenSecret;
	
				 		user.save();
				 		done(null, user);
				 	}
				});
			}
		}     //jf https://console.developers.google.com/apis/api/contacts/overview?project=oauthtest-socialagg
	));
};