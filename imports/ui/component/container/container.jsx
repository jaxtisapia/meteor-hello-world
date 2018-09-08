import React, { Component } from 'react';

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
