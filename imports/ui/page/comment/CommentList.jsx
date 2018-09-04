import { CommentResource, Redirect } from '/imports/ui/util/service/';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import COMMENT_CONSTANTS from '/imports/constant/comment'
import { Comment } from '../../component';
import { Comments } from '/db';

class CommentList extends Component {
	constructor() {
		super();
		this.state = { comments : null };
	}
	
	// getComments(postId) {
	//
	// 	CommentResource.get(postId, (err, results) => {
	// 		this.setState({ comments : results.comments });
	// 	});
	//
	// }
	//
	// componentDidMount() {
	// 	this.getComments(this.props.postId);
	// }
	
	render() {
		// const { comments } = this.state;
		const { postId, comments } = this.props;
		
		if ( ! comments ) return <div>Loading....</div>;
		
		else return (
			<div className="comment">
				{
					(comments.length === 0)
						
						? <div>No Comments for this Post</div>
						: comments.map((comment) => <Comment key={ comment._id } comment={ comment } postId={ postId }/>
						)
				}
				<button onClick={ () => Redirect.toAddComment(postId) }>Create a new comment</button>
			</div>
		)
	}
}

export default withTracker(props => {
	const handle = Meteor.subscribe(COMMENT_CONSTANTS.FIND);
	const postId = props.postId;
	
	return {
		loading : ! handle.ready(),
		comments : Comments.find({ postId }).fetch(),
		... props
	};
})(CommentList);