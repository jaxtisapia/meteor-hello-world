import React, { Component } from 'react';
import { AutoForm, AutoField, ErrorsField, SubmitField } from 'uniforms-unstyled';
import SimpleSchema from 'simpl-schema';

export default class Login extends Component {
	constructor(props) {
		super(props);
		
		this.navigateToPosts = this.navigateToPosts.bind(this);
	}
	
	navigateToPosts() { props.history.push('/posts')};
	
	handleLogin(data) {
		
		const { email, password } = data;
		this.navigateToPosts();
		
		Meteor.loginWithPassword(email, password, (error) => {
			if ( ! error ) this.navigateToPosts();
			else alert(error.reason);
		})
		
	};
	
	render() {
		return (
			<div className="authentication">
				
				<AutoForm onSubmit={ this.handleLogin } schema={ LoginSchema }>
					
					<ErrorsField/>
					
					<AutoField name="email" placeholder="Email"/>
					
					<AutoField name="password" type="password" placeholder="Password"/>
					
					<div>
						<button type="submit">Login</button>
					</div>
				
				</AutoForm>
			
			</div>
		)
	}
}

const LoginSchema = new SimpleSchema(
	{
		email : { type : String, regEx : SimpleSchema.RegEx.Email },
		password : { type : String }
	});