import { PaginationButton } from '/imports/ui/component/index';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Pagination extends Component {
	
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
						
						return <PaginationButton key={ currentPage } active={ isActivePage } page={ currentPage }
						                         navigateToPage={ navigateToPage }/>
					})
				}
			
			</ul>
		</div>)
	}
	
}

Pagination.propTypes = {
	count : PropTypes.number,
	limit : PropTypes.number,
	page : PropTypes.number,
	navigateToPage : PropTypes.func
};

export default Pagination;