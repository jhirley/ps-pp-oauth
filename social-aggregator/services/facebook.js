var OAuth = require('OAuth').OAuth2;

var Facebook = function (facebookkey, facebookSecret ){
	var oauth = new OAuth (
		facebookkey
		,facebookSecret
		,'https://graph.facebook.com'
		,null
		,'oauth2/token'
		,null
	);
	var getImage = function(userKey, done) {
		oauth.get(
			'https://graph.facebook.com/v2.5/me/picture?redirect=false&type-large'
			,userKey
			,function (err, results, res){
				results=JSON.parse(results);
				done(results.data);
			}
		);
	}
	return { 
		getImage: getImage
	}
}

module.exports = Facebook;