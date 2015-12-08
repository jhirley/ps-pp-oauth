var OAuth = require('OAuth').OAuth2;

var Facebook = function (facebookID, facebookkey, facebookSecret ){
	var oauth = new OAuth (
		facebookkey
		,facebookSecret
		,'https://graph.facebook.com'
		,null
		,'oauth2/token'
		,null
	);
	var getImage = function(facebookID, userKey, done) {
		oauth.get(
			'https://graph.facebook.com/v2.5/'+facebookID+'/picture?redirect=false&type=large'
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