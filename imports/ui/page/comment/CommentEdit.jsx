import COMMENT from '/imports/constant/comment';
import route from '/imports/routing/router'
import React, { Component } from 'react';
import SimpleSchema from 'simpl-schema';
import { AutoField, AutoForm, ErrorsField, LongTextField, SubmitField } from 'uniforms-unstyled';

export default class CommentEdit extends Component {
	
	constructor() {
		super();
		this.state = { loading : true, comment : { title : '', description : '' } };
		
		this.handleUpdateComment = this.handleUpdateComment.bind(this);
	}
	
	getCommentDetailsById(commentId) {
		Meteor.call(COMMENT.FIND_ONE, (commentId), (err, result) => {
			if ( result ) this.setState({ loading : false, comment : result });
		});
	}
	
	handleUpdateComment(updateDocument) {
		
		const { title, description } = updateDocument;
		const { commentId, postId } = this.props;
		
		Meteor.call(COMMENT.UPDATE_ONE, commentId, { title, description }, function(err, result) {
			
			if ( ! err ) route.go(`/posts/${postId}/comments`);
			else alert('An error has happened: ' + err);
			
		});
	}
	
	componentDidMount() {
		this.getCommentDetailsById(this.props.commentId);
	}
	
	render() {
		const { postId, commentId } = this.props;
		
		if ( this.state.loading ) { return <div>Loading editing comment..</div> }
		
		else return <div>
			<AutoForm model={ this.state.comment } schema={ Schema } onSubmit={ this.handleUpdateComment }>
				
				<h2>Edit comment with id { this.props.commentId }</h2>
				
				<AutoField name="title"/>
				
				<LongTextField name="description"/>
				
				<ErrorsField/>
				
				<div>
					<SubmitField value="Update Comment"/>
				</div>
			
			</AutoForm>
		</div>
		
	}
	
}

const Schema = new SimpleSchema(
	{
		title : { type : String, label : 'Title', max : 200, optional : false },
		description : { type : String, max : 600, label : 'Description', optional : true }
	});