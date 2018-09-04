import { Post } from '/imports/ui/component';
import Pagination from '/imports/ui/component/Pagination';
import { PostResource } from '/imports/ui/util/service';
import React, { Component } from 'react';

export default class PostList extends Component {
	constructor() {
		super();
		this.state = { posts : null };
	}
	
	getPosts() {
		
		PostResource.get((err, results) => {
			this.setState({ posts : results });
		});
		
	}
	
	componentDidMount() {
		this.getPosts();
	}
	
	render() {
		const { posts } = this.state;
		
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