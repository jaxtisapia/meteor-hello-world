import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

const App = ({ main, routeProps, user }) => {
	
	let loginMessage = null;
	
	function Logout() {
		Meteor.logout();
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

export default withTracker((props) => {
	const user = Meteor.user();
	return { user };
})(App);