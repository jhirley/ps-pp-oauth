var env = process.env.NODE_ENV  = process.env.NODE_ENV||'development';  //jf let the system know we are in development mode
var config = require('./../config')[env];

//jfconsole.log(config);
var express = require('express');
var router = express.Router();
//var facebook = require('../services/facebook.js')('526351797533117','1800b92dd761bdf736ea969ad6e5a02b'); 
var facebook = require('../services/facebook.js')(config.FACEBOOK_CLIENT_ID, config.FACEBOOK_CLIENT_SECRET);

router.use('/', function (req, res, next){
	if(!req.user){
		res.redirect('/');
	}
	next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', {
  	user: req.user});
});

module.exports = router;
