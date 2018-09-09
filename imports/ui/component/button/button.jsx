import React, { Component } from 'react';

import './button.scss';

export default Button = props =>
	<button className="coc-button-cult" { ... props }>
		{ props.children }
	</button>