import { CommentQueries } from '/imports/constant/queries'
import { CommentResource, Redirect } from '/imports/ui/util/service/index';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

export default class Comment extends Component {
	
	constructor() {
		super();
	}
	
	render() {
		
		const { comment } = this.props;
		const { post } = comment;
		
		const postId = post._id;
		const commentId = comment._id;
		
		const { deleteComment } = CommentQueries;
		const deleteCommentMutation = gql(deleteComment);
		
		
		return (<div key={ comment._id }>
				<p>Comment id: { comment._id } </p>
				<p>Comment title: { comment.title }, Comment Description: { comment.description } </p>
				<button onClick={ () => Redirect.toEditComment(postId, comment._id) }> Edit comment
				</button>
				
				<Mutation mutation={ deleteCommentMutation }
				          onError={ () => {alert('an error occurred')} }
				          onCompleted={ () => {
					          alert('comment Deleted');
					          Redirect.toPosts()
				          } }>
					{ deleteComment =>
						<button onClick={ () => deleteComment({ variables : { commentId } }) }> Delete comment</button>
					}
				
				</Mutation>
			
			</div>
		)
	}
	
	handleDeleteComment(commentId) {
		
		CommentResource.deleteOne(commentId, (error, result) => {
			
			if ( error ) return alert(error.error);
			alert('Comment deleted!')
			
		});
		
	}
}