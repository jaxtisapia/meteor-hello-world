import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';

const App = ({ main, routeProps, user }) => {
	
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