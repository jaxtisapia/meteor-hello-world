import { CommentQueries } from '/imports/constant/queries'
import { Redirect } from '/imports/ui/util/service';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import SimpleSchema from 'simpl-schema';
import { AutoField, AutoForm, ErrorsField, LongTextField } from 'uniforms-unstyled';


export default class PostAdd extends Component {
	
	submit = (comment) => {
		console.log(comment)
	};
	
	constructor() {
		super();
	}
	
	render() {
		const { postId } = this.props;
		const { createComment } = CommentQueries;
		const mutation = gql(createComment);
		
		return (
			<div className="post">
				
				<Mutation mutation={ mutation }
				          variables={ { description : 'woman', title : 'mirror' } }
				          onError={ () => {alert('an error occurred')} }
				          onCompleted={ () => {
					          alert('comment Added');
					          Redirect.toComments(postId)
				          } }>
					
					{ createComment => (
						
						<AutoForm schema={ Schema }
						          onSubmit={ document => createComment({ variables : { ... document, postId } }) }>
							
							<ErrorsField/>
							
							<AutoField name="title"/>
							<LongTextField name="description"/>
							
							<button type='submit'>Add Comment</button>
							
							<button onClick={ () => Redirect.toComments(postId) }>Back to comments</button>
						
						</AutoForm>
					
					) }
				</Mutation>
			</div>
		)
	}
}

const Schema = new SimpleSchema(
	{
		title : { type : String, label : 'Title', max : 200, optional : false },
		description : { type : String, max : 600, label : 'Description', optional : true }
	});