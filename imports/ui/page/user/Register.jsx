import { Align, Button, CultAutoField, TextLink } from '/imports/ui/component';
import { Redirect, UserResource } from '/imports/ui/util/service';
import { AuthenticationView } from '/imports/ui/view';
import React, { Component } from 'react';
import SimpleSchema from 'simpl-schema';
import { AutoForm, ErrorsField } from 'uniforms-unstyled';

export default class Register extends Component {
	
	onSubmit = (data) => {
		
		const { email, password } = data;
		
		UserResource.register(email, password, (error, result) => {
			if ( ! error ) this.loginUser(result);
			else return alert(err.error)
			
		})
	};
	
	constructor() {
		super();
	}
	
	
	loginUser(user) {
		
		const { email, password } = user;
		
		UserResource.login(email, password, (err) => {
			if ( err ) alert(err.reason);
			else Redirect.toPosts()
		});
		
	}
	
	render() {
		return (
			<AuthenticationView>
				
				<AutoForm schema={ RegisterSchema } onSubmit={ this.onSubmit }>
					
					<CultAutoField name="email" placeholder="Email"/>
					<CultAutoField name="password" type="password" placeholder="Password *"/>
					<CultAutoField name="confirm_password" type="password" placeholder="Confirm password"/>
					
					<ErrorsField/>
					
					<Align center>
						<Button type="submit">Create account</Button>
					</Align>
				
				</AutoForm>
				
				<Align center>
					<TextLink label={ 'Login to your account' } clickAction={ Redirect.toLogin }/>
				</Align>
			
			</AuthenticationView>
		
		)
	}
}

const RegisterSchema = new SimpleSchema(
	{
		email : { type : String, regEx : SimpleSchema.RegEx.Email },
		password : { type : String, },
		confirm_password : {
			type : String, custom() {
				if ( this.value !== this.field('password').value ) { return 'passwordMismatch';}
			}
		},
	});