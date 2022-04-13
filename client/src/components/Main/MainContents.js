import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function MainContents() {
	const [posts, setPosts] = useState([]);

	const getBoardList = async () => {
		await axios
			.get(`http://localhost:4000/board`)
			.then((res) => setPosts(res.data.data));
	};

	useEffect(() => {
		getBoardList();
	}, []);

	return (
		<section className="mainContetns">
			<div className="inner">
				<div className="leftMainContents">
					<h4>Update</h4>
					{posts.map((item) => {
						return (
							<Link to={`/board/read/${item.id}`}>
								<div className="mainArticleList">
									<div className="listItem" key={item.id}>
										<div className="title">{item.title}</div>
										<div className="createAt">
											{item.createdAt.slice(0, 10)}
										</div>
									</div>
								</div>
							</Link>
						);
					})}
				</div>
				<div className="rightMainContents">
					<h4>Board</h4>
					{posts.map((item) => {
						return (
							<Link to={`/board/read/${item.id}`}>
								<div className="mainArticleList">
									<div className="listItem" key={item.id}>
										<div className="title">{item.title}</div>
										<div className="createAt">
											{item.createdAt.slice(0, 10)}
										</div>
									</div>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</section>
	);
}
export default MainContents;
