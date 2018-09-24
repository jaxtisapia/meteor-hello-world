import { initialize } from 'meteor/cultofcoders:apollo';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { ApolloProvider } from 'react-apollo';


const { client } = initialize();

const App = ({ main, routeProps, user }) => {
	
	return (
		<ApolloProvider client={ client }>
			<div id="app">
				<div className="uk-flex uk-flex-center uk-flex-column">
					{ React.createElement(main, routeProps, user) }
				</div>
			</div>
		</ApolloProvider>
	)
};

export default withTracker(() => {
	const user = Meteor.user();
	return { user };
})(App);