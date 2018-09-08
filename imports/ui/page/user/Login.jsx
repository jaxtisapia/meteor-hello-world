import { Align, Button, CultAutoField, TextLink } from '/imports/ui/component';
import { Redirect, UserResource } from '/imports/ui/util/service';

import { AuthenticationView } from '/imports/ui/view';
import LoggedIn from '/imports/ui/view/LoggedInView';
import React, { Component } from 'react';
import SimpleSchema from 'simpl-schema';
import { AutoForm, ErrorsField } from 'uniforms-unstyled';

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
		
		const user = Meteor.user();
		const isLoggedIn = (user !== null);
		
		let email = 'Unknown user';
		if ( user && user.emails && user.emails.length > 0 ) email = user.emails[0].address;
		
		return (
			<AuthenticationView>
				
				{
					isLoggedIn
						
						? <LoggedIn email={ email }/>
						
						: <div><AutoForm onSubmit={ this.handleLogin } schema={ LoginSchema }>
							
							<CultAutoField name="email" placeholder="your.email@cult-o-coders.com"/>
							<CultAutoField name="password" type="password" placeholder="Password"/>
							
							<ErrorsField/>
							
							<Align center>
								<Button type="submit">Login</Button>
							</Align>
						
						</AutoForm>
							
							<Align center>
								
								<TextLink label={ 'Create a new account' } clickAction={ Redirect.toSignUp }/>
							
							</Align>
						</div>
				}
			</AuthenticationView>
		)
	}
	
}

const LoginSchema = new SimpleSchema(
	{
		email : { type : String, regEx : SimpleSchema.RegEx.Email },
		password : { type : String }
	});