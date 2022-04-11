import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function BoardList({ boardListData, currentPosts }) {
	return (
		<div className="article-list">
			{currentPosts.map((item) => {
				return (
					<div className="listItem" key={item.id}>
						<Link to={`/board/read/${item.id}`}>
							<div className="id">{item.id}</div>
							<div className="title">{item.title}</div>
							<div className="createAt">{item.updateDate}</div>
						</Link>
					</div>
				);
			})}
		</div>
	);
}

BoardList.propTypes = {
	boardListData: PropTypes.node.isRequired,
	currentPosts: PropTypes.node.isRequired,
};
export default BoardList;
