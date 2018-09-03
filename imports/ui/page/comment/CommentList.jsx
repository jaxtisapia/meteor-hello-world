import { Redirect } from '/imports/ui/util/service/';
import { CommentResource } from 'imports/ui/util/service/index';
import React, { Component } from 'react';
import Comment from '../../component/Comment';

export default class CommentList extends Component {
	constructor() {
		super();
		this.state = { comments : null };
	}
	
	getComments(postId) {
		
		CommentResource.get(postId, (err, results) => {
			this.setState({ comments : results.comments });
		});
		
	}
	
	componentDidMount() {
		this.getComments(this.props.postId);
	}
	
	render() {
		const { comments } = this.state;
		const { postId } = this.props;
		
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