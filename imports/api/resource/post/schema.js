import SimpleSchema from 'simpl-schema';

const Schema = new SimpleSchema(
	{
		title : { type : String, label : 'Title', max : 200, optional: false },
		description : { type : String, max: 600, label : 'Description', optional: true },
		createdAt : { type : Date, label : 'Created at', optional : true, defaultValue: new Date() },
		userId : { type : String, label : 'User ID', optional : false },
		updatedAt : { type : Date, label : 'Updated at', optional : true, defaultValue: new Date() }
	});

export default Schema;