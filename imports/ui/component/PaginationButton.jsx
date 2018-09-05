import React, { Component } from 'react';

class PaginationButton extends Component {
	
	render() {
		
		const { page, active, navigateToPage } = this.props;
		
		const activeClass = (! active) ? '' : 'uk-active';
		
		return (
			<li className={ activeClass }><span onClick={ () => navigateToPage(page) }>{ page }</span></li>
		);
	}
}

export default PaginationButton;