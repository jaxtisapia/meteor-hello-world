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
		
		const { _id : postId } = post;
		const { _id : commentId, title : commentTitle, description : commentDescription } = comment;
		
		
		return (<div key={ commentId }>
				
				<p>Comment id: { commentId } </p>
				<p>Comment title: { commentTitle }, Comment Description: { commentDescription } </p>
				
				<button onClick={ () => Redirect.toEditComment(postId, commentId) }>
					Edit comment
				</button>
				
				<DeleteCommentButton commentId={ commentId }/>
			
			</div>
		)
	}
}