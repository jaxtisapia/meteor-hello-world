import USER from '/imports/constant/user'
import { Button, Card } from '/imports/ui/component';
import React, { Component } from 'react';
import SimpleSchema from 'simpl-schema';
import { AutoField, AutoForm, ErrorsField } from 'uniforms-unstyled';

export default class Register extends Component {
	onSubmit = (data) => {
		
		
		Meteor.call(USER.CREATE, data, (err) => {
			
			if ( ! err ) this._loginUser(data);
			else return alert(err.reason)
			
		});
	};
	
	constructor() {
		super();
		
		this.navigateToPosts = this.navigateToPosts.bind(this);
	}
	
	navigateToPosts() {
		this.props.history.push('/posts')
	}
	
	_loginUser(user) {
		Meteor.loginWithPassword(user.email, user.password, (err) => {
			if ( err ) alert(err.reason);
			else this.navigateToPosts();
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