import gql from 'graphql-tag';

import { initialize } from 'meteor/cultofcoders:apollo';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';

import { ApolloProvider, Query } from 'react-apollo';

const { client } = initialize();

const QUERY = gql`query { sayMasa }`;

const App = ({ main, routeProps, user }) => {
	
	return (
		<ApolloProvider client={ client }>
			<div id="app">
				<div className="uk-flex uk-flex-center uk-flex-column">
					
					<Query query={ QUERY }>
						{ ({ loading, error, data }) => {
							if ( loading ) return <p>Loading...</p>;
							if ( error ) return <p>Error :(</p>;
							
							return <p>{ data.sayMasa }</p>
						} }
					</Query>
					
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