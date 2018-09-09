import React, { Component } from 'react';
import { AutoField } from 'uniforms-unstyled';

import './cultAutoField.scss'

export default class CultAutoField extends Component {
	
	render() {
		return (
			<div className={ 'coc-input' }>
				<AutoField className={"uk-flex uk-flex-column"} {...this.props}/>
			</div>
		)
	}
	
}