import { CommentQueries } from '/imports/constant/queries'
import Comment from '/imports/ui/component/comment/comment';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Query } from 'react-apollo';

export default class QueryCommentList extends Component {
	
	constructor(props) {
		super(props);
	}
	
	render() {
		
		const { generalComments } = CommentQueries;
		const query = gql(generalComments);
		
		const { postId, loadingView : LoadingView, errorView : ErrorView, emptyDataView : EmptyDataView } = this.props;
		
		return (
			<Query query={ query } variables={ { postId } }>
				
				{ ({ loading, error, data }) => {
					if ( loading ) return LoadingView;
					if ( error ) return ErrorView;
					
					const { comments } = data;
					
					if ( comments.length === 0 ) return EmptyDataView;
					// else return comments.map((comment) => <ValidView key={ comment._id } comment={ comment }/>)
					else return comments.map(comment => <Comment key={ comment._id } comment={ comment }/>)
				} }
			
			</Query>
		)
		
	}
	
}