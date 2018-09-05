import { Post } from '/imports/ui/component';
import Pagination from '/imports/ui/component/Pagination';
import POST_CONSTANTS from '/imports/constant/post'
import { withTracker } from 'meteor/react-meteor-data';
import { PostResource } from '/imports/ui/util/service';
import { Posts as PostsCollection } from '/db';

import React, { Component } from 'react';

class PostList extends Component {
	constructor() {
		super();
		this.state = { posts : null, page : 0, limit : 0 };
	}
	
	getPosts(page, limit) {
		PostResource.get(page, limit, (err, results) => {
			this.setState({ posts : results });
		});
	}
	
	componentDidMount() {
		const { page = 0, limit = 10 } = this.props.query;
		this.getPosts(page, limit);
		
		this.setState({ page, limit });
	}
	
	render() {
		const { posts } = this.state;
		const { postsCount } = this.props;
		
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

export default withTracker(props => {
	const handle = Meteor.subscribe(POST_CONSTANTS.COUNT_ALL);
	
	return {
		loading : ! handle.ready(),
		postsCount : PostsCollection.find().count(),
		... props
	};
})(PostList);