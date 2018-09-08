import { Align, Button, TextLink } from '/imports/ui/component/index';
import { Redirect, UserResource } from '/imports/ui/util/service/index';
import React, { Component } from 'react';

export default class LoggedIn extends Component {
	
	constructor(props) {
		super(props);
		
		this.handleLogout = this.handleLogout.bind(this);
	}
	
	handleLogout() {
		UserResource.logout();
	}
	
	render() {
		
		return (
			<div>
				
				<Align center column>
					
					<p>You are already logged in as { this.props.email } </p>
					
					<Align center>
						<TextLink label={ 'View Posts' } clickAction={ Redirect.toPosts }/>
					</Align>
					
					<Align center>
						<TextLink label={ 'Create a Post' } clickAction={ Redirect.toAddPost }/>
					</Align>
				
				</Align>
				
				<Align center>
					<Button onClick={ this.handleLogout } type="submit">Logout</Button>
				</Align>
			
			
			</div>
		)
		
	}
}