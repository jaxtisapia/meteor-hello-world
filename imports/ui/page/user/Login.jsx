import {
	Button, Card, CultIcon, Align,
	CultAutoField, Container, TextLink
} from '/imports/ui/component';

import { Redirect, UserResource } from '/imports/ui/util/service';
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
		return (
			<Container>
				
				<Card>
					
					<Align center>
						<CultIcon/>
					</Align>
					
					<div>
						
						<Align center column>
							
							<AutoForm onSubmit={ this.handleLogin } schema={ LoginSchema }>
								
								<CultAutoField name="email" placeholder="your.email@cult-o-coders.com"/>
								<CultAutoField name="password" type="password" placeholder="Password"/>
								
								<ErrorsField/>
								
								<Align center>
									<Button type="submit">Login</Button>
								</Align>
							
							</AutoForm>
						
						</Align>
						
						<Align center>
							
							<TextLink label={ 'Create a new account' } clickAction={ Redirect.toSignUp }/>
						
						</Align>
					
					</div>
				</Card>
			</Container>
		)
	}
	
}

const LoginSchema = new SimpleSchema(
	{
		email : { type : String, regEx : SimpleSchema.RegEx.Email },
		password : { type : String }
	});