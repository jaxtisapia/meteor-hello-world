import { UserResource } from '/imports/ui/util/service';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';

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
		
		// loginMessage = <div>Log in <a href="/login">here</a> or <a href="/register">create new account</a></div>
		
	}
	
	
	return (<div id="app">
		
			<div className="uk-flex uk-flex-center uk-flex-column">
			
			{ loginMessage }
				
				{ React.createElement(main, routeProps, user) }
				
		</div>
		</div>
	)
};

export default withTracker(() => {
	const user = Meteor.user();
	return { user };
})(App);