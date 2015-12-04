
var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin').Strategy;
var User = require('../../models/userModel');

module.exports = function(app, config){

	console.log('linkedin.strategy.jsloaded');
	console.log(config.LINKEDIN_consumerKey+'\n'+config.LINKEDIN_consumerSecret);

	passport.use(new LinkedInStrategy({
		consumerKey: config.LINKEDIN_consumerKey  //jf your ClientID HERE
		,consumerSecret: config.LINKEDIN_consumerSecret	//jf your Secret HERE
		,callbackURL: "http://localhost:3000/auth/linkedin/callback"
		,profileFields: ['id', 'first-name', 'last-name' ,'email-address', 'picture-url']  //,'displayName'
	//	,scope: ['r_emailaddress', 'r_basicprofile'],
		},
	 	function (req, token, tokenSecret, profile, done){

	 		var query = {'linkedin.id': profile.id};

	 		User.findOne(query, function (error, user){
	 			if (user){
	 				console.log('found linkedin user');
	 				done(null, user);
	 			} else {
	 				console.log('found linkedin user');
	 				
			 		var user = new User;
			 		console.log(profile);
			 		if(profile.emails[0].value){
			 			user.email = profile.emails[0].value;}
			 		user.image = profile._json.pictureUrl; //jfphotos[0].value;
			 		user.displayName = profile.displayName;

			 		user.linkedin = {};
			 		user.linkedin.id = profile.id;
			 		user.linkedin.token = token;

			 		user.save();
			 		done(null, user);
			 	}
			});
		}     //jf https://console.developers.google.com/apis/api/contacts/overview?project=oauthtest-socialagg
	));
};