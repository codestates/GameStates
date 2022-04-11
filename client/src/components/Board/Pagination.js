import React from 'react';
import PropTypes from 'prop-types';

function Pagination({ postsPerPage, totalPosts, currentPage, paginate }) {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i += 1) {
		pageNumbers.push(i);
	}

	return (
		<ul className="pagination justify-content-center">
			{pageNumbers.map((number) => (
				<li key={number} className="page-item">
					<button
						type="button"
						onClick={() => paginate(number)}
						className="pageBtn"
						style={currentPage === number ? { color: '#ff5000' } : null}
					>
						{number}
					</button>
				</li>
			))}
		</ul>
	);
}

Pagination.propTypes = {
	postsPerPage: PropTypes.node.isRequired,
	totalPosts: PropTypes.node.isRequired,
	currentPage: PropTypes.node.isRequired,
	paginate: PropTypes.node.isRequired,
};

export default Pagination;
