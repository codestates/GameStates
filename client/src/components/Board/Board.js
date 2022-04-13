import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BoardList from './BoardList';
import BoardSidebar from './BoardSidebar';
import Pagination from './Pagination';

function Board({ isLogin, accessToken }) {
	const [posts, setPosts] = useState([]);
	const { id } = useParams();
	const getBoardList = async () => {
		await axios
			.get(`http://localhost:4000/board`)
			.then((res) => setPosts(res.data.data));
	};

	useEffect(() => {
		getBoardList();
	}, []);

	// pagenation 구현
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(10);
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	// 검색 구현
	const [search, setSearch] = useState('');
	const onChangeSearch = (e) => {
		e.preventDefault();
		setSearch(e.target.value);
	};

	const onSerach = (e) => {
		e.preventDefault();
		if (search === null || search === '') {
			axios
				.get(`http://localhost:4000/board`)
				.then((res) => setPosts(res.data.data));
		} else {
			const filterData = posts.filter((el) => el.title.includes(search));
			setPosts(filterData);
		}
	};

	return (
		<div className="wrap">
			<div className="back">
				<img src={`${process.env.PUBLIC_URL}/img/jungleNuNu.jpg`} alt="back" />
			</div>

			<div className="content">
				<div className="boardTitle">
					<p>Board </p>
					<form className="searchInput" onsSubmit={onSerach}>
						<input
							type="text"
							name="search"
							value={search}
							placeholder="검색하세요"
							onChange={onChangeSearch}
						/>
						<button type="submit" className="searchButton">
							Go
						</button>
					</form>
				</div>
				<div className="inner">
					<BoardSidebar boardData={posts} accessToken={accessToken} />
					<BoardList currentPosts={currentPosts} />
				</div>
				<div className="bottomBtm">
					<Pagination
						postsPerPage={postsPerPage}
						totalPosts={posts.length}
						currentPage={currentPage}
						paginate={paginate}
					/>
					{isLogin ? (
						<button type="button" className="writeButton">
							<Link to="/board/create">글쓰기</Link>
						</button>
					) : null}
				</div>
			</div>
		</div>
	);
}
export default Board;
