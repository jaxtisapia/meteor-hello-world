import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Container extends Component {
	
	render(){
		
		return (
			<div className={ 'uk-container uk-container-small' }>
				{this.props.children}
			</div>
			)
	}
	
}

export default Container;
