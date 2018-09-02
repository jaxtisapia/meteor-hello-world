import React, { Component } from 'react';
import POST from '/imports/constant/post'

export default class PostList extends Component {
	constructor() {
		super();
		this.state = {posts: null};
	}
	
	componentDidMount() {
		Meteor.call(POST.FIND, (err, results) => {
			this.setState({posts: results.posts});
		});
	}
	
	render() {
		const {posts} = this.state;
		const {history} = this.props;
		
		if (!posts) return <div>Loading....</div>;
		
		else return (
			<div className="post">
				{
					posts.map((post) => {
						return (
							<div key={post._id}>
								<p>Post id: {post._id} </p>
								<p>Post title: {post.title}, Post Description: {post.description} </p>
								<button onClick={() => {
									history.push("/posts/edit/" + post._id)
								}}> Edit post
								</button>
							</div>
						)
					})}
				<button onClick={() => history.push('/posts/create')}>Create a new post</button>
			</div>
		)
	}
}