import { PostQueries } from '/imports/constant/queries'

import { Post } from '/imports/ui/component';
import { Redirect } from '/imports/ui/util/service/';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Query } from 'react-apollo';

class PostList extends Component {
	constructor() {
		super();
	}
	
	render() {
		
		const { generalGet } = PostQueries;
		const query = gql(generalGet);
		
		return (
			<div>
				
				<div className={ 'uk-margin uk-margin-large' }>
					<button onClick={ () => Redirect.toAddPost() }>Create a new Post</button>
					<button onClick={ () => Redirect.toLogin() }>Go to Login Screen</button>
				</div>
				
				<Query query={ query }>
					
					{ ({ loading, error, data }) => {
						if ( loading ) return <p>Loading...</p>;
						if ( error ) return <p>Error :(</p>;
						
						return data.posts.map(post => <Post key={ post._id } post={ post }/>)
					} }
				
				</Query>
			</div>
		)
	}
}

export default PostList;