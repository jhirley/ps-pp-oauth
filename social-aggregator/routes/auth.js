//auth.js
var express = require('express');
var passport = require('passport');
var router = express.Router();

router.route('/google/callback')
	.get(passport.authenticate('google', {
		successRedirect: '/users/',
		failure: '/error/'
	}));

router.route('/google')
	.get(passport.authenticate('google',{
		scope:
		['https://www.googleapis.com/auth/userinfo.profile'
		,'https://www.googleapis.com/auth/userinfo.email'

		]
	}));

router.route('/twitter/callback')
  .get(passport.authenticate('twitter', {
    successRedirect: '/users/',
    failure: '/error/'
  }));

router.route('/twitter')
  .get(passport.authenticate('twitter'));

router.route('/facebook/callback')
  .get(passport.authenticate('facebook', {
    successRedirect: '/users',
    failure: '/error'
  }));

router.route('/facebook')
  .get(passport.authenticate('facebook', {
    scope: ['email','public_profile','user_friends','user_photos']
  }));

router.route('/linkedin/callback')
  .get(passport.authenticate('linkedin', {
    successRedirect: '/users',
    failure: '/error'
  }));

router.route('/linkedin')
  .get(passport.authenticate('linkedin' //jf, { //	scope: ['r_basicprofile', 'r_emailaddress'] }
  	));


module.exports = router;