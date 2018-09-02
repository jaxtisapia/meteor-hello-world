import SimpleSchema from 'simpl-schema';

const Schema = new SimpleSchema(
	{
		_id : { type : String, label : 'User ID' },
		username : { type : String, label : 'Username', optional : true },
		
		emails : { type : Array, label : 'Emails of User' },
		'emails.$' : { type : Object },
		'emails.$.address' : { type : String },
		'emails.$.verified' : { type : Boolean, label : 'Email Verification Status' },
		
		createdAt : { type : Date, label : 'Created At', defaultValue : () => Date.now() },
		
		name : { type : String, label : 'Full Name of User', optional : false },
		
	});

export default Schema;