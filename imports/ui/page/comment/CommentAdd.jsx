import { Redirect } from '/imports/ui/util/service';
import { CommentResource } from 'imports/ui/util/service/index';
import React, { Component } from 'react';
import SimpleSchema from 'simpl-schema';
import { AutoField, AutoForm, ErrorsField, LongTextField } from 'uniforms-unstyled';

export default class PostAdd extends Component {
	
	
	submit = (comment) => {
		
		const { postId } = this.props;
		const userId = Meteor.userId();
		
		comment.userId = userId;
		comment.postId = postId;
		
		CommentResource.add(comment, (error) => {
			
			if ( error ) return alert(error.reason);
			alert('Comment added!');
			Redirect.toComments(postId);
			
		});
		
	};
	
	constructor() {
		super();
	}
	
	render() {
		const { postId } = this.props;
		
		return (
			<div className="post">
				<AutoForm onSubmit={ this.submit } schema={ Schema }>
					
					<ErrorsField/>
					
					<AutoField name="title"/>
					<LongTextField name="description"/>
					
					<button type='submit'>Add Comment</button>
					
					<button onClick={ () => Redirect.toComments(postId) }>Back to comments</button>
				
				</AutoForm>
			</div>
		)
	}
}

const Schema = new SimpleSchema(
	{
		title : { type : String, label : 'Title', max : 200, optional : false },
		description : { type : String, max : 600, label : 'Description', optional : true }
	});