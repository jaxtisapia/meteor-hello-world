import { CommentQueries } from '/imports/constant/queries'

import { Comment } from '/imports/ui/component';
import { Redirect } from '/imports/ui/util/service/';
import gql from 'graphql-tag';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { Query } from 'react-apollo';


class CommentList extends Component {
	constructor() {
		super();
		this.state = { postId : null }
	}
	
	
	componentDidMount() {
		this.setState({ postId : this.props.postId });
	}
	
	render() {
		
		const { postId } = this.state;
		
		const { generalComments } = CommentQueries;
		const query = gql(generalComments);
		
		return (
			<div>
				
				<Query query={ query } variables={ { postId } }>
					
					{ ({ loading, error, data }) => {
						if ( loading ) return <p>Loading...</p>;
						if ( error ) return <p>Error :(</p>;
						
						const { comments } = data;
						
						if ( comments.length === 0 ) return <div>No Comments for this Post</div>;
						else return comments.map((comment) => <Comment key={ comment._id } comment={ comment }/>)
					} }
				
				</Query>
				
				<button onClick={ () => Redirect.toAddComment(postId) }>Create a new comment</button>
			
			</div>)
		
	}
}

export default CommentList;