import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function BoardList({ currentPosts }) {
	return (
		<div className="article-list">
			{currentPosts.map((item) => {
				return (
					<div className="listItem" key={item.id}>
						<Link to={`/board/read/${item.id}`}>
							<div className="title">{item.title}</div>
							<div className="name">{item.name}</div>
							<div className="createAt">{item.createdAt}</div>
						</Link>
					</div>
				);
			})}
		</div>
	);
}

BoardList.propTypes = {
	currentPosts: PropTypes.node.isRequired,
};
export default BoardList;
