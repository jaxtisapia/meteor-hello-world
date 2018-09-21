import { PostQueries } from '/imports/constant/queries';

import { Redirect } from '/imports/ui/util/service';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import SimpleSchema from 'simpl-schema';
import { AutoField, AutoForm, ErrorsField, LongTextField } from 'uniforms-unstyled';

export default class PostAdd extends Component {
	
	constructor(props) {
		super(props);
	}
	
	render() {
		const { createPost : CREATE_POST } = PostQueries;
		const mutation = gql(CREATE_POST);
		
		return (
			<div className="post">
				
				<Mutation mutation={ mutation }
				          onError={ () => {alert('an error occurred')} }
				          onCompleted={ () => {
					          alert('post Added');
					          Redirect.toPosts()
				          } }>
					
					{ createPost => (
						
						<AutoForm schema={ Schema }
						          onSubmit={ doc => createPost({ variables : { ... doc } }) }>
							
							<ErrorsField/>
							
							<AutoField name="title"/>
							<LongTextField name="description"/>
							
							<button type='submit'>Add post</button>
							
							<button onClick={ () => Redirect.toPosts() }>Back to posts</button>
						
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