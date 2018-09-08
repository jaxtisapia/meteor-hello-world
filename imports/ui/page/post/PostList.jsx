import { Posts as PostsCollection } from '/db';
import POST_CONSTANTS from '/imports/constant/post'
import { Pagination, Post } from '/imports/ui/component';
import { PostResource, Redirect } from '/imports/ui/util/service';
import { withTracker } from 'meteor/react-meteor-data';

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
	
	componentDidUpdate(prevProps) {
		const {newPage = 0, newLimit = 10} = this.props.query;
		const {oldPage = 0, oldLimit = 10} = prevProps.query;
		
		const hasPageChanged = (newPage !== oldPage);
		const hasLimitChanged = (newLimit !== oldLimit);
		
		const isQueryChanged = hasPageChanged || hasLimitChanged;

		if (isQueryChanged) {
			this.getPosts( newPage, newLimit);
			this.setState({ newPage, newLimit });
		}
		
	}
	
	render() {
		const { posts, page, limit } = this.state;
		const { postsCount } = this.props;
		
		if ( ! posts ) return <div>Loading....</div>;
		
		else return (
			<div className="post">
				{
					
					posts.map(post => <Post key={ post._id } post={ post }/>) }
				
				<Pagination count={ postsCount } limit={ limit } page={ page } navigateToPage={ Redirect.toPostsPage }/>
			
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