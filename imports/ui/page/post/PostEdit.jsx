import { PostResource, Redirect } from '/imports/ui/util/service';
import React, { Component } from 'react';
import SimpleSchema from 'simpl-schema';
import { AutoField, AutoForm, ErrorsField, LongTextField, SubmitField } from 'uniforms-unstyled';

export default class PostEdit extends Component {
	
	constructor() {
		super();
		this.state = { loading : true, post : { title : '', description : '' } }
	}
	
	getPostDetailsById(postId) {
		
		PostResource.getOne(postId, (error, result) => {
			if ( result ) this.setState({ loading : false, post : result });
		});
		
	}
	
	handleUpdatePost(postId, data) {
		PostResource.update(postId, data, (error, result) => {
			if ( ! error ) Redirect.toPosts();
			else alert('An error has happened: ' + error)
		});
	}
	
	componentDidMount() {
		this.getPostDetailsById(this.props.postId);
	}
	
	
	render() {
		
		const { postId } = this.props;
		
		if ( this.state.loading ) { return <div>Loading editing post..</div> }
		
		
		else return <div>
			<AutoForm model={ this.state.post } schema={ Schema } onSubmit={ data => this.handleUpdatePost(postId, data) }>
				
				<h2>Edit post with id { postId }</h2>
				
				<AutoField name="title"/>
				
				<LongTextField name="description"/>
				
				<ErrorsField/>
				
				<div>
					<SubmitField value="Save"/>
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