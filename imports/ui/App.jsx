import gql from 'graphql-tag';
import { initialize } from 'meteor/cultofcoders:apollo';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { ApolloProvider } from 'react-apollo';


const { client } = initialize();

const QUERY = gql`query { posts {
																		title
																}}`;

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