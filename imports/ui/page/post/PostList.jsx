import { Redirect } from '/imports/ui/util/service/';
import { PostListQuery } from '/imports/ui/view';
import React, { Component } from 'react';

const LoadingView = <p>Loading...</p>;
const ErrorView = <p>Error :(</p>;
const EmptyDataView = <p>No Post found</p>;

class PostList extends Component {
	constructor() {
		super();
	}
	
	render() {
		
		const postListQueryProps = {
			loadingView : LoadingView,
			errorView : ErrorView,
			emptyDataView : EmptyDataView
		};
		
		return (
			<div>
				
				<div className={ 'uk-margin uk-margin-large' }>
					<button onClick={ () => Redirect.toAddPost() }>Create a new Post</button>
					<button onClick={ () => Redirect.toLogin() }>Go to Login Screen</button>
				</div>
				
				<PostListQuery { ... postListQueryProps }/>
				
			</div>
		)
	}
}

export default PostList;