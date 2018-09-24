import { Redirect } from '/imports/ui/util/service/';
import { CommentListQuery } from '/imports/ui/view';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';

const LoadingView = <p>Loading...</p>;
const ErrorView = <p>Error :(</p>;
const EmptyDataView = <p>No Comments for this Post</p>;

class CommentList extends Component {
	handleCreateCommentRedirection = () => Redirect.toAddComment(this.props.postId);
	
	constructor() {
		super();
		
		this.handleCreateCommentRedirection = this.handleCreateCommentRedirection.bind(this);
	}
	
	render() {
		
		const { postId } = this.props;
		
		const commentListQueryProps = {
			postId,
			loadingView : LoadingView,
			errorView : ErrorView,
			emptyDataView : EmptyDataView
		};
		
		return (
			<div>
				
				<CommentListQuery { ... commentListQueryProps }/>
				
				<button onClick={ this.handleCreateCommentRedirection }>
					Create a new comment
				</button>
			
			</div>)
		
	}
}

export default CommentList;