import { Post } from '/imports/ui/component';

import gql from 'graphql-tag';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { Query } from 'react-apollo';

const GET_POST_QUERY = gql`query {
  posts { _id description title
    comments { title }
  }
}`;

class PostList extends Component {
	constructor() {
		super();
	}
	
	render() {
		
		return (
			<Query query={ GET_POST_QUERY }>
				{ ({ loading, error, data }) => {
					if ( loading ) return <p>Loading...</p>;
					if ( error ) return <p>Error :(</p>;
					
					return data.posts.map(post => <Post key={ post._id } post={ post }/>)
				}
				}
			</Query>
		
		)
	}
}

export default PostList;