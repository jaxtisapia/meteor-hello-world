import { Button, Card } from '/imports/ui/component';
import { Redirect, UserResource } from '/imports/ui/util/service';
import React, { Component } from 'react';
import SimpleSchema from 'simpl-schema';
import { AutoField, AutoForm, ErrorsField } from 'uniforms-unstyled';

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
			<Card>
				
				<div className="authentication">
					
					<AutoForm schema={ RegisterSchema } onSubmit={ this.onSubmit }>
						
						<ErrorsField/>
						
						<AutoField name="email" placeholder="Email"/>
						<AutoField name="password" type="password" placeholder="Password *"/>
						<AutoField name="confirm_password" type="password" placeholder="Confirm password"/>
						
						<Button type="submit">Create account</Button>
					
					</AutoForm>
				
				</div>
			
			</Card>
		
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