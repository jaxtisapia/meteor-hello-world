import { Redirect } from '/imports/ui/util/service';
import { PostResource } from '/imports/ui/util/service/index';
import React, { Component } from 'react';
import SimpleSchema from 'simpl-schema';
import { AutoField, AutoForm, ErrorsField, LongTextField } from 'uniforms-unstyled';

export default class PostAdd extends Component {
	
	submit = (post) => {
		
		PostResource.add(post, (error, result) => {
			if ( error ) return alert(error.reason);
			else alert('Post added!')
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
					
					<button onClick={ () => Redirect.toPosts() }>Back to posts</button>
				
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