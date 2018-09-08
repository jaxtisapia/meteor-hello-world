import { Button, Card, CultIcon } from '/imports/ui/component';
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
			<div className={"uk-container uk-container-small"}>
			<Card>
				
				<div className={"uk-flex uk-flex-center"}>
				<CultIcon/>
				</div>
				
				<div className="authentication">
					
					<AutoForm className={"uk-flex uk-flex-center uk-flex-column"} onSubmit={ this.handleLogin } schema={ LoginSchema }>
						
						<div className={"coc-input"}>
						<AutoField className={"uk-flex uk-flex-column"} name="email" placeholder="Email"/>
						</div>
						
						<div className={"coc-input"}>
						<AutoField  className={"uk-flex uk-flex-column"} name="password" type="password" placeholder="Password"/>
						</div>
						
						<ErrorsField/>
						
						<div className={"uk-align-center"}>
							<Button type="submit">Login</Button>
						</div>
						
					</AutoForm>
					
					<div className={"uk-flex uk-flex-center"}>
						<p style={{ cursor:'pointer' }} onClick={() => Redirect.toSignUp()}>Create a new account</p>
					</div>
				
				</div>
			</Card>
			</div>
		)
	}
	
}

const LoginSchema = new SimpleSchema(
	{
		email : { type : String, regEx : SimpleSchema.RegEx.Email },
		password : { type : String }
	});