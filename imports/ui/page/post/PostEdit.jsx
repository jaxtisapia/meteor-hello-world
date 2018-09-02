import React, {Component} from 'react';
import POST from '/imports/constant/post';
import SimpleSchema from 'simpl-schema';
import route from '/imports/routing/router'
import {AutoField, AutoForm, SubmitField, LongTextField, ErrorsField } from 'uniforms-unstyled';

export default class PostEdit extends Component {
	
	constructor() {
		super();
		this.state = { loading : true, post : { title : '', description : '' } }
	}
	
	getPostDetailsById(postId){
		Meteor.call(POST.FIND_ONE, postId, (err, result) => {
			if ( result ) this.setState({ loading : false, post : result });
		});
	}
	
	componentDidMount() {
		this.getPostDetailsById(this.props._id);
	}
	
	
	render() {
		
		if ( this.state.loading ) { return  <div>Loading editing post..</div> }
		
		
		else return <div>
			<AutoForm model={ this.state.post } schema={ Schema } onSubmit={ data => {
				
				Meteor.call(POST.UPDATE_ONE, this.props._id, data, function(err, result) {
					
					if ( ! err ) route.go('/posts');
					
					else alert('An error has happened: ' + err);
				});
			}
			}>
				
				<h2>Edit post with id { this.props._id }</h2>
				
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
		title : { type : String, label : 'Title', max : 200, optional: false },
		description : { type : String, max: 600, label : 'Description', optional: true }
	});