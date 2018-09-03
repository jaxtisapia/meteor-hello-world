import POST from '/imports/constant/post'
import Pagination from '/imports/ui/component/Pagination';
import Post from '/imports/ui/component/Post';
import React, { Component } from 'react';

export default class PostList extends Component {
	constructor() {
		super();
		this.state = { posts : null };
	}
	
	componentDidMount() {
		Meteor.call(POST.FIND, (err, results) => {
			this.setState({ posts : results.posts });
		});
	}
	
	render() {
		const { posts } = this.state;
		const { history } = this.props;
		
		if ( ! posts ) return <div>Loading....</div>;
		
		else return (
			<div className="post">
				{
					
					posts.map((post) => {
						return (
							<Post key={ post._id } post={ post }/>
						)
					}) }
				
				<Pagination/>
				
			</div>
		)
	}
}