import { Redirect } from '/imports/ui/util/service';
import React, { Component } from 'react';
import SimpleSchema from 'simpl-schema';
import { AutoField, AutoForm, ErrorsField } from 'uniforms-unstyled';

export default class Login extends Component {
	constructor(props) {
		super(props);
	}
	
	handleLogin(data) {
		
		const { email, password } = data;
		
		Meteor.loginWithPassword(email, password, (error) => {
			if ( ! error ) Redirect.toPosts();
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