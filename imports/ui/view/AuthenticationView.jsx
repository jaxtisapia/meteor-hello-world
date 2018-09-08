import React, { Component } from 'react';
import { Container, Card, Align, CultIcon } from '/imports/ui/component';

export default AuthenticationView = props =>
	<Container>
		
		<Card>
			
			<Align center>
				<CultIcon/>
			</Align>
			
			<div>
				
				<Align center column>
					
					{ props.children }
				
				</Align>
			
			</div>
		</Card>
	</Container>