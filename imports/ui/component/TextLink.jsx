import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TextLink extends Component {
	
	render() {
		
		const { label, clickAction } = this.props;
		const style = { cursor : 'pointer', marginTop : '40px' };
		
		return (
			<p style={ style } onClick={ () => clickAction() }>
				{ label }
			</p>
		)
		
	}
}

TextLink.propTypes = {
	label : PropTypes.string,
	clickAction : PropTypes.func,
};

export default TextLink;