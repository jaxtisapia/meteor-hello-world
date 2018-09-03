import { UserResource } from '/imports/ui/util/service';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';

import './styles/uikit/uikit.min.css'

const App = ({ main, routeProps, user }) => {
	
	let loginMessage = null;
	
	function Logout() {
		UserResource.logout();
	}
	
	if ( user ) {
		let email = 'Unknown user';
		if ( user.emails && user.emails.length > 0 ) {
			email = user.emails[0].address;
		}
		
		loginMessage = <div>
			<b>
				<a href="/posts/add">Create new post</a> | { ' ' }
				<a href="/posts">Posts list</a>
			</b>
			<br/><br/>
			Welcome { email }! <a href="/" onClick={ Logout }>Logout</a>
		</div>
		
	}
	else {
		
		loginMessage = <div>Log in <a href="/login">here</a> or <a href="/register">create new account</a></div>
		
	}
	
	
	return (<div id="app">
			
			<h1>Post - Commenter - Onboarding Test</h1>
			
			{ loginMessage }
			
			{ React.createElement(main, routeProps, user) }
		
		</div>
	)
};

export default withTracker(() => {
	const user = Meteor.user();
	return { user };
})(App);