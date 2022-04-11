import { useState, useEffect } from 'react';
import { Link, useParams, Route } from 'react-router-dom';
import axios from 'axios';
import BoardList from './BoardList';
import BoardSidebar from './BoardSidebar';
import Pagination from './Pagination';

function Board() {
	const [posts, setPosts] = useState([]);

	const getBoardList = async () => {
		await axios
			.get(`http://localhost:4003/articles`)
			.then((res) => setPosts(res.data));
	};

	useEffect(() => {
		getBoardList();
	}, []);

	// const getRead = async () => {
	// 	await axios
	// 		.get(`http://localhost:4003/articles?id=${id}`)
	// 		.then((res) => setRead(res.data));
	// };

	// useEffect(() => {
	// 	getRead();
	// }, [read]);

	// pagenation 구현
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(10);
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<div className="wrap">
			<div className="back">
				<img src={`${process.env.PUBLIC_URL}/img/jungleNuNu.jpg`} alt="back" />
			</div>

			<div className="content">
				<div className="boardTitle">
					<p>Board </p>
					<div className="searchInput">
						<input type="text" name="userName" placeholder="검색하세요" />
						<button type="button" className="searchButton">
							Go
						</button>
					</div>
				</div>
				<div className="inner">
					<BoardSidebar boardData={posts} />
					<BoardList boardListData={posts} currentPosts={currentPosts} />
				</div>
				<div className="bottomBtm">
					<Pagination
						postsPerPage={postsPerPage}
						totalPosts={posts.length}
						currentPage={currentPage}
						paginate={paginate}
					/>
					<button type="button" className="writeButton">
						<Link to="/board/write">글쓰기</Link>
					</button>
				</div>
			</div>
		</div>
	);
}
export default Board;
