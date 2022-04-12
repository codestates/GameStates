import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BoardComment from './BoardComment';
import BoardSidebar from './BoardSidebar';

function BoardRead({ accessToken }) {
	const [read, setRead] = useState([]);
	const { id } = useParams();
	const navigate = useNavigate();
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios({
					method: 'get',
					url: `http://localhost:4000/board/${id}`,
					baseURL: 'http://localhost:4000/board/',
					timeout: 2000,
				});
				setRead(response.data.isCreated);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);
	console.log(read);

	// const getBoardList = async () => {
	// 	await axios
	// 		.get(`http://localhost:4000/board/`)
	// 		.then((res) => setPosts(res.data.data));
	// };

	// useEffect(() => {
	// 	getBoardList();
	// }, []);

	const del = () => {
		axios
			.delete(`http://localhost:4000/board/${id}`, {
				headers: { authorization: `Bearer ${accessToken}` },
				withCredentials: true,
			})
			.then(() => alert('게시판 삭제가 완료 되었습니다'))
			.then(() => navigate('/board'));
	};

	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(10);
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

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
				.get(`http://localhost:4003/articles`)
				.then((res) => setPosts(res.data));
		} else {
			const filterData = posts.filter((el) => el.title.includes(search));
			console.log(filterData);
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
					<BoardSidebar boardData={posts} />
					<div className="article-list">
						<div className="boardRead">
							<div className="boardHeader">
								<div className="boardReadTitle">{read.title}</div>
								<div className="boardReadTitleSub">
									<div className="boardName">{read.title}</div>
									<div className="createdAt">{read.createdAt}</div>
								</div>
								<div className="boardReadTitleBtn">
									<button type="button" onClick={del} className="delButton">
										삭제
									</button>
									<button type="button" onClick={del} className="putButton">
										수정
									</button>
								</div>
							</div>
							<div className="boardReadContent">{read.description}</div>
							<BoardComment currentPosts={currentPosts} />
						</div>
					</div>
				</div>
				<div className="bottomBtm">
					<button type="button" className="writeButton">
						<Link to="/board/create">글쓰기</Link>
					</button>
				</div>
			</div>
		</div>
	);
}
export default BoardRead;
