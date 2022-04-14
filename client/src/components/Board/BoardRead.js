import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BoardComment from './BoardComment';
import BoardSidebar from './BoardSidebar';

function BoardRead({ accessToken, isLogin }) {
	const [read, setRead] = useState([]);
	const [nickname, setNickname] = useState([]);
	const { id } = useParams();
	const navigate = useNavigate();
	const [posts, setPosts] = useState([]);
	const [userInfo, setUserInfo] = useState([]);

	const getBoardList = async () => {
		await axios
			.get(`${process.env.REACT_APP_GAMESTATES_API_URL}board`)
			.then((res) => setPosts(res.data.data));
	};

	useEffect(() => {
		getBoardList();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios({
					method: 'get',
					url: `${process.env.REACT_APP_GAMESTATES_API_URL}board/${id}`,
					baseURL: `${process.env.REACT_APP_GAMESTATES_API_URL}`,
				});
				setRead(response.data.isCreated);
				setNickname(response.data.isCreated.user);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	const del = () => {
		if (window.confirm('삭제하시겠습니까?')) {
			axios
				.delete(`${process.env.REACT_APP_GAMESTATES_API_URL}${id}`, {
					headers: { authorization: `Bearer ${accessToken}` },
					withCredentials: true,
				})
				.then(() => alert('게시글 삭제가 완료 되었습니다'))
				.then(() => navigate('/board'));
		}
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

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_GAMESTATES_API_URL}user/getUserInfo`, {
				headers: { authorization: `Bearer ${accessToken}` },
			})
			.then((res) => {
				// console.log(res.data.data);
				setUserInfo(res.data.data);
			});
	}, []);

	const findPosts = userInfo.nickname === nickname.nickname;

	return (
		<div className="wrap">
			<div className="back">
				<img src={`${process.env.PUBLIC_URL}/img/jungleNuNu2.jpg`} alt="back" />
			</div>

			<div className="content">
				<div className="boardTitle">
					<p>Board </p>
					<form className="searchInput">
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
					<BoardSidebar
						boardData={posts}
						accessToken={accessToken}
						isLogin={isLogin}
					/>
					<div className="article-list">
						<div className="boardRead">
							<div className="boardHeader">
								<div className="boardReadTitle">{read.title}</div>
								<div className="boardReadTitleSub">
									<div className="boardName">{nickname.nickname}</div>
									<div className="createdAt">{read.createdAt}</div>
								</div>
								{findPosts ? (
									<div className="boardReadTitleBtn">
										<button type="button" onClick={del} className="delButton">
											삭제
										</button>
										<Link to={`/board/modify/${id}`}>
											<button type="button" className="putButton">
												수정
											</button>
										</Link>
									</div>
								) : null}
							</div>
							<div className="boardReadContent">{read.description}</div>
							<BoardComment
								read={read}
								setRead={setRead}
								accessToken={accessToken}
							/>
						</div>
					</div>
				</div>
				<div className="bottomBtm">
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
export default BoardRead;
