import React, { Component } from 'react';
import POST from '/imports/constant/post'
import { AutoForm, AutoField, LongTextField, ErrorsField } from 'uniforms-unstyled';
import SimpleSchema from 'simpl-schema';
import route from '/imports/routing/router'

export default class PostAdd extends Component {
	
	submit = (post) => {
		Meteor.call(POST.CREATE, post, (err) => {

			if ( err ) return alert(err.reason);
			alert('Post added!')

		});
	};
	
	constructor(props) {
		super(props);
	}
	
	render() {
		const { history } = this.props;
		
		return (
			<div className="post">
				<AutoForm onSubmit={ this.submit } schema={ Schema }>
					
					<ErrorsField/>
					
					<AutoField name="title"/>
					<LongTextField name="description"/>
					
					<button type='submit'>Add post</button>
					
					<button onClick={ () => route.go('/posts') }>Back to posts</button>
				
				</AutoForm>
			</div>
		)
	}
}

const Schema = new SimpleSchema(
	{
		title : { type : String, label : 'Title', max : 200, optional: false },
		description : { type : String, max: 600, label : 'Description', optional: true }
	});