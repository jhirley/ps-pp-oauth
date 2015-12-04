var mongoose = require('mongoose');
	Schema = mongoose.Schema;
var UserSchema = Schema({
	displayName: {type:String}
	,Name: {
		givenName:{type:String}
		,middleName:{type:String}
		,Fathers_last_name:{type:String}
		,Mothers_last_name:{type:String}
		,Fathers_Mothers_last_name:{type:String}
		,Mothers_Mother_last_name:{type:String}
	}
	,image: {type:String}
	,email: {type:String}

	,facebook: {type:Object}
	,linkedin: {type:Object}
	,twitter: {type:Object}
	,google: {type:Object}
});

module.exports = mongoose.model('User', UserSchema);