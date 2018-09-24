import { PostQueries } from '/imports/constant/queries'
import Post from '/imports/ui/component/post/post';
import gql from 'graphql-tag';
import React, { Component } from 'react'
import { Query } from 'react-apollo';


export default class PostListQuery extends Component {
	
	render() {
		
		const { generalGet } = PostQueries;
		const query = gql(generalGet);
		
		const { loadingView : LoadingView, errorView : ErrorView, emptyDataView : EmptyDataView } = this.props;
		
		return (
			<Query query={ query }>
				
				{ ({ loading, error, data }) => {
					if ( loading ) return LoadingView;
					if ( error ) return ErrorView;
					
					const { posts } = data;
					
					if ( posts.length === 0 ) return EmptyDataView;
					else return posts.map(post => <Post key={ post._id } post={ post }/>)
					
				} }
			
			</Query>
		)
	}
	
}