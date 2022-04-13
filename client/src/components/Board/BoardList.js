import { Link } from 'react-router-dom';

function BoardList({ currentPosts }) {
	return (
		<div className="article-list">
			{currentPosts.map((item) => {
				return (
					<div className="listItem" key={item.id}>
						<Link to={`/board/read/${item.id}`}>
							<div className="title">{item.title}</div>
							<div className="name">{item.title}</div>
							<div className="createAt">{item.createdAt.slice(0, 10)}</div>
						</Link>
					</div>
				);
			})}
		</div>
	);
}

export default BoardList;
