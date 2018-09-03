import COMMENT from '/imports/constant/comment';
import { Redirect } from '/imports/ui/util/service';
import React, { Component } from 'react';

export default class Comment extends Component {
	
	constructor() {
		super();
	}
	
	render() {
		
		const { comment, postId } = this.props;
		
		return (<div key={ comment._id }>
			<p>Comment id: { comment._id } </p>
			<p>Comment title: { comment.title }, Comment Description: { comment.description } </p>
			<button onClick={ () => {
				Redirect.toEditComment(postId, comment._id);
			} }> Edit comment
			</button>
			<button onClick={ () => this.handleDeleteComment(comment._id) }> Delete comment</button>
		</div>)
	}
	
	handleDeleteComment(commentId) {
		Meteor.call(COMMENT.DELETE_ONE, commentId, (err, result) => {
			console.log(err, result);
			if ( err ) return alert(err.error);
			alert('Comment deleted!')
			
		});
	}
}