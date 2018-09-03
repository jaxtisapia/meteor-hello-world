import React, { Component } from 'react';

export default class Pagination extends Component {
	
	constructor() {
		super();
	}
	
	render() {
		
		return (<div>
			<ul className="uk-pagination">
				<li><a href="#">1</a></li>
				<li className="uk-disabled"><span>...</span></li>
				<li><a href="#">5</a></li>
				<li><a href="#">6</a></li>
				<li className="uk-active"><span>7</span></li>
				<li><a href="#">8</a></li>
			</ul>
		</div>)
	}
	
}