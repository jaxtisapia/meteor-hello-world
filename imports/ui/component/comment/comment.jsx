import { DeleteCommentButton } from '/imports/ui/component'
import { Redirect } from '/imports/ui/util/service';

import React, { Component } from 'react';


export default class Comment extends Component {
	
	constructor() {
		super();
	}
	
	render() {
		
		const { comment } = this.props;
		const { post } = comment;
		
		const postId = post._id;
		const commentId = comment._id;
		
		
		return (<div key={ comment._id }>
				<p>Comment id: { comment._id } </p>
				<p>Comment title: { comment.title }, Comment Description: { comment.description } </p>
				<button onClick={ () => Redirect.toEditComment(postId, comment._id) }> Edit comment
				</button>
				
				<DeleteCommentButton commentId={ commentId }/>
			
			</div>
		)
	}
}