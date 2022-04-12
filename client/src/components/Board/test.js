import { useState, useEffect } from 'react';
import { Link, useParams, Route } from 'react-router-dom';
import axios from 'axios';
import BoardList from './BoardList';
import BoardSidebar from './BoardSidebar';
import Pagination from './Pagination';

function BoardCreate() {
	const [read, setRead] = useState([]);
	const { id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios({
					method: 'get',
					url: `http://localhost:4003/articles/${id}`,
					baseURL: 'http://localhost:4003/articles',
					timeout: 2000,
				});
				setRead(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	const axiosPost = () => {
		axios
			.post(
				'http://localhost:4003/articles',
				{
					title: titleRef.current.value,
					content: contentRef.current.value,
				},
				{
					withCredentials: true,
				},
			)
			.then(() => alert('게시판 등록이 완료 되었습니다'))
			.then(() => navigate('/board'));
	};

	const onSubmit = (e) => {
		e.preventDefault();
	};

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
	const currentPosts = posts
		.sort((a, b) => b.id - a.id)
		.slice(indexOfFirstPost, indexOfLastPost);
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
				.get(`http://localhost:4003/articles`)
				.then((res) => setPosts(res.data));
		} else {
			const filterData = posts.filter((el) => el.title.includes(search));
			console.log(filterData);
			setPosts(filterData);
		}
	};
	console.log(posts);

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
						<div>{read.id}</div>
						<div>{read.title}</div>
						<div>{read.content}</div>
						<div>{read.insertDate}</div>{' '}
					</div>
				</div>
				<div className="bottomBtm">
					<Pagination
						postsPerPage={postsPerPage}
						totalPosts={posts.length}
						currentPage={currentPage}
						paginate={paginate}
					/>
					<button type="button" className="writeButton">
						<Link to="/board/create">글쓰기</Link>
					</button>
				</div>
			</div>
		</div>
	);
}
export default BoardRead;
