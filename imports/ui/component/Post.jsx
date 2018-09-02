import React, { Component } from 'react';

export default class Post extends Component {
	
	render() {
		
		const { post } = this.props;
		
		const userId = Meteor.userId();
		const isOwnerOfPost = (post.userId === userId);
		
		return (
			<div key={ post._id }>
				<p>Post id: { post._id } </p>
				<p>Post title: { post.title }, Post Description: { post.description } </p>
				
				<button onClick={ () => {
					route.go('/posts/edit/' + post._id)
				} }> Edit post
				</button>
				
				{ (isOwnerOfPost)
					? <button onClick={ () => {} }>Delete Post</button>
					: null
				}
				
				<button onClick={ () => {
					route.go(`/posts/${post._id}/comments`)
				} }> View Comments
				</button>
			
			</div>
		)
		
	}
}