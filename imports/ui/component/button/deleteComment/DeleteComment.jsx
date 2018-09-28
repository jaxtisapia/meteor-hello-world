import { CommentQueries } from '/imports/constant/queries'
import { Redirect } from '/imports/ui/util/service';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

export default DeleteCommentButton = (props) => {
	
	const onErrorOccurred = () => {alert('an error occurred')};
	
	const onCompleted = () => {
		alert('comment Deleted');
		Redirect.toPosts()
	};
	
	const { commentId } = props;
	
	const { deleteComment } = CommentQueries;
	const deleteCommentMutation = gql(deleteComment);
	
	return <Mutation mutation={ deleteCommentMutation }
	                 onError={ onErrorOccurred }
	                 onCompleted={ onCompleted }>
		
		{ deleteComment =>
			
			<button onClick={ () => deleteComment({ variables : { commentId } }) }>
				Delete comment
			</button>
			
		}
	
	</Mutation>
	
}