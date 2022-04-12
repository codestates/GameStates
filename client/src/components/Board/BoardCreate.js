import moment from 'moment';
import 'moment/locale/ko';
import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BoardSidebar from './BoardSidebar';

function BoardCreate() {
	const titleRef = useRef(null);
	const contentRef = useRef(null);
	const navigate = useNavigate();
	const [read, setRead] = useState([]);
	const { id } = useParams();
	const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
	console.log(nowTime);

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

	const axiosPost = () => {
		axios
			.post(
				'http://localhost:4003/articles',
				{
					title: titleRef.current.value,
					content: contentRef.current.value,
					insertDate: nowTime,
					name: '유정',
				},
				{
					withCredentials: true,
				},
			)
			.then(() => alert('게시판 등록이 완료 되었습니다'))
			.then(() => navigate('/board'));
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
						<form onSubmit={onSubmit} className="boardCreate">
							<div className="boardCreateHeader">글쓰기</div>
							<div className="boardCreateInput">
								<input
									className="boarCreateTitle"
									type="text"
									placeholder="제목을입력하세요"
									ref={titleRef}
								/>
								<textarea
									className="boardCreateContent"
									type="textarea"
									placeholder="내용을 입력하세요"
									ref={contentRef}
								/>
								<div className="boardWriteBtn">
									<Link to="/board">
										<button type="button" className="boardWriteBtnLeft">
											취소
										</button>
									</Link>
									<button
										onClick={axiosPost}
										type="button"
										className="boardWriteBtnRight"
									>
										작성완료
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
export default BoardCreate;
