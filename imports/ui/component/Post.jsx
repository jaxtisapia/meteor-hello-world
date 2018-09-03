import { Redirect } from '/imports/ui/util/service';
import { PostResource } from '/imports/ui/util/service/index';
import React, { Component } from 'react';

export default class Post extends Component {
	
	handleDeletePost(postId) {
		
		PostResource.deleteOne(postId, (error, result) => {
			if ( error ) return alert(error.error);
			alert('Post deleted!')
		});
		
	}
	
	render() {
		
		const { post } = this.props;
		
		const userId = Meteor.userId();
		const isOwnerOfPost = (post.userId === userId);
		
		return (
			<div key={ post._id }>
				<p>Post id: { post._id } </p>
				<p>Post title: { post.title }, Post Description: { post.description } </p>
				
				<button onClick={ () => Redirect.toEditPost(post._id) }> Edit post</button>
				
				{ (isOwnerOfPost)
					? <button onClick={ () => this.handleDeletePost(post._id) }>Delete Post</button>
					: null
				}
				
				<button onClick={ () => Redirect.toComments(post._id) }> View Comments</button>
			
			</div>
		)
		
	}
}