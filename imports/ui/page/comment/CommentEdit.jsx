import { CommentQueries } from '/imports/constant/queries'
import { Redirect } from '/imports/ui/util/service';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import SimpleSchema from 'simpl-schema';
import { AutoField, AutoForm, ErrorsField, LongTextField, SubmitField } from 'uniforms-unstyled';

export default class CommentEdit extends Component {
	
	constructor() {
		super();
	}
	
	render() {
		const { postId, commentId } = this.props;
		
		const { getComment, updateComment } = CommentQueries;
		const query = gql(getComment);
		const mutation = gql(updateComment);
		
		return (
			
			<Query query={ query } variables={ { commentId } }>
				
				{ ({ loading, error, data }) => {
					
					const { comment } = data;
					
					if ( loading ) return <p>Loading editing comment..</p>;
					if ( error ) return <p>Error :(</p>;
					
					else return (
						
						<Mutation mutation={ mutation }
						          onError={ () => {alert('an error occurred')} }
						          onCompleted={ () => {
							          alert('comment Edited');
							          Redirect.toComments(postId)
						          } }>
							
							{ updateComment => (
								
								<AutoForm model={ comment }
								          schema={ Schema }
								          onSubmit={ document => updateComment({ variables : { ... document, commentId } }) }>
									
									<h2>Edit comment with id { commentId }</h2>
									
									<AutoField name="title"/>
									
									<LongTextField name="description"/>
									
									<ErrorsField/>
									
									<div>
										<SubmitField value="Update Comment"/>
									</div>
								
								</AutoForm>
							) }
						
						</Mutation>
					)
				} }
			</Query>)
	}
}

const Schema = new SimpleSchema(
	{
		title : { type : String, label : 'Title', max : 200, optional : false },
		description : { type : String, max : 600, label : 'Description', optional : true }
	});