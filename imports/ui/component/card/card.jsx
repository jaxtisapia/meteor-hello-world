import React, { Component } from 'react';

export default Card = (props) =>
	<div>
		<div className="uk-card uk-card-default uk-card-body">
			{ props.children }
		</div>
	</div>
