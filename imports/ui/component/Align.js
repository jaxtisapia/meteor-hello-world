import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Align extends Component {
	
	render() {
		
		const { column, center } = this.props;
		
		const columnStyle = (!column) ? '': 'uk-flex-column';
		const centerStyle = (!center) ? '': 'uk-flex-center';
		
		return (
			<div className={ `uk-flex ${columnStyle}  ${centerStyle} ` }>
				{ this.props.children }
			</div>
		)
	}
}

Align.propTypes ={
	column: PropTypes.bool,
	center: PropTypes.bool,
};

export default Align;