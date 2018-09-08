import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';

const App = ({ main, routeProps, user }) => {
	
	let loginMessage = null;
	let email = 'Unknown user';
	
	if ( user && user.emails && user.emails.length > 0 ) email = user.emails[0].address;
	
	return (<div id="app">
			
			<div className="uk-flex uk-flex-center uk-flex-column">
				
				{ React.createElement(main, routeProps, user) }
			
			</div>
		</div>
	)
};

export default withTracker(() => {
	const user = Meteor.user();
	return { user };
})(App);