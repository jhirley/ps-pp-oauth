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
		var getFriends = function(facebookID, userKey, done) {
		oauth.get(
			'https://graph.facebook.com/v2.5/'+facebookID+'/friends?redirect=false'
			,userKey
			,function (err, results, res){
				results=JSON.parse(results);
				console.log(results);
				console.log(results.summary);
				done(results.summary);
			}
		);
	}
	return { 
		getImage: getImage
		,getFriends:getFriends
	}
}

module.exports = Facebook;