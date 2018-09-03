import Pagination from '/imports/ui/component/Pagination';
import Post from '/imports/ui/component/Post';
import { PostResource } from '/imports/ui/util/service';
import React, { Component } from 'react';

export default class PostList extends Component {
	constructor() {
		super();
		this.state = { posts : null };
	}
	
	getPosts(page, limit) {
		
		PostResource.get(page, limit, (err, results) => {
			this.setState({ posts : results.posts });
		});
		
	}
	
	componentDidMount() {
		// TODO process page and limits better
		const page = 1;
		const limit = 20;
		
		this.getPosts(page, limit);
	}
	
	render() {
		const { posts } = this.state;
		const { history } = this.props;
		
		if ( ! posts ) return <div>Loading....</div>;
		
		else return (
			<div className="post">
				{
					
					posts.map(post => <Post key={ post._id } post={ post }/>) }
				
				<Pagination/>
			
			</div>
		)
	}
}