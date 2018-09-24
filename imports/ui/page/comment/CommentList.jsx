import { Redirect } from '/imports/ui/util/service/';
import CommentListQuery from '/imports/ui/view/CommentListQuery';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';


class CommentList extends Component {
	handleCreateCommentRedirection = () => Redirect.toAddComment(this.props.postId);
	
	constructor() {
		super();
		
		this.handleCreateCommentRedirection = this.handleCreateCommentRedirection.bind(this);
	}
	
	render() {
		
		const { postId } = this.props;
		
		const LoadingView = <p>Loading...</p>;
		const ErrorView = <p>Error :(</p>;
		const EmptyDataView = <p>No Comments for this Post</p>;
		
		return (
			<div>
				
				{ /*
				 TODO: pass for instance, <CommentList> item to QueryCommentList,
				 instead of explicitly using <Comment> within the QueryCommentList class
				 */ }
				
				<CommentListQuery postId={ postId }
				                  loadingView={ LoadingView }
				                  errorView={ ErrorView }
				                  emptyDataView={ EmptyDataView }/>
				
				<button onClick={ this.handleCreateCommentRedirection }>
					Create a new comment
				</button>
			
			</div>)
		
	}
}

export default CommentList;