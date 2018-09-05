import React, { Component } from 'react';
import { PaginationButton } from '/imports/ui/component';

export default class Pagination extends Component {
	
	constructor(props) {
		super(props);
	}
	
	render() {
		
		const { count, limit, page, navigateToPage } = this.props;
		
		let numberOfPages = Math.ceil(count / limit);
		numberOfPages = (numberOfPages < 1) ? 1 : numberOfPages;
		
		return (<div>
			
			<ul className="uk-pagination">
				
				{
					[...new Array(numberOfPages)].map((element, index) => {
						
						const currentPage = index + 1;
						const isActivePage = page === currentPage;
						
						return <PaginationButton key={ currentPage } active={ isActivePage } page={ currentPage } navigateToPage={navigateToPage} />
					})
				}
			
			</ul>
		</div>)
	}
	
}