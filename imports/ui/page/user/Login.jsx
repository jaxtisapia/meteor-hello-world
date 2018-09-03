import { Button, Card } from '/imports/ui/component';
import { Redirect, UserResource } from '/imports/ui/util/service';
import React, { Component } from 'react';
import SimpleSchema from 'simpl-schema';
import { AutoField, AutoForm, ErrorsField } from 'uniforms-unstyled';

export default class Login extends Component {
	constructor(props) {
		super(props);
	}
	
	handleLogin(data) {
		
		const { email, password } = data;
		
		UserResource.login(email, password, (error, result) => {
			
			if ( ! error ) Redirect.toPosts();
			else alert(error.reason);
			
		});
		
	};
	
	render() {
		return (
			<Card>
				
				<div className="authentication">
					
					<AutoForm onSubmit={ this.handleLogin } schema={ LoginSchema }>
						
						<ErrorsField/>
						
						<AutoField name="email" placeholder="Email"/>
						
						<AutoField name="password" type="password" placeholder="Password"/>
						
						<div>
							<Button type="submit">Login</Button>
						</div>
					
					</AutoForm>
				
				</div>
			</Card>
		
		)
	}
	
}

const LoginSchema = new SimpleSchema(
	{
		email : { type : String, regEx : SimpleSchema.RegEx.Email },
		password : { type : String }
	});