import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import POST from '/imports/constant/post'

export default class Home extends Component {
	
	constructor() {
		super();
		this.state = { loading : true, donuts : [] }
	}
	
	getPosts() {
		Meteor.call(POST.FIND, (err, results) => {
			console.log(results);
			this.setState({ loading : false, posts : results.posts })
		})
	}
	
	componentDidMount() {
		this.getPosts();
	}
	
	render() {
		
		const { loading, posts } = this.state;
		
		if ( loading ) return <div>Loading</div>;
		
		else return (<div>
			Home
		</div>)
	}
}