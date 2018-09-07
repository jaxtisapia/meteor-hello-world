import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PaginationButton extends Component {
	
	render() {
		
		const { page, active, navigateToPage } = this.props;
		
		const activeClass = (! active) ? '' : 'uk-active';
		
		return (
			<li className={ activeClass }><span onClick={ () => navigateToPage(page) }>{ page }</span></li>
		);
	}
}

PaginationButton.propTypes = {
	page: PropTypes.number,
	active: PropTypes.bool,
	navigateToPage: PropTypes.func,
};

export default PaginationButton;