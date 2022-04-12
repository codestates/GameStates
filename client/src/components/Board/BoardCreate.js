// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'moment/locale/ko';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BoardSidebar from './BoardSidebar';

function BoardCreate({ accessToken }) {
	const titleRef = useRef(null);
	const contentRef = useRef(null);
	const navigate = useNavigate();
	const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
	const [posts, setPosts] = useState([]);

	const onSubmit = (e) => {
		e.preventDefault();
	};
	console.log(accessToken);

	const getBoardList = async () => {
		await axios
			.get(`http://localhost:4000/board`)
			.then((res) => setPosts(res.data.data));
	};

	useEffect(() => {
		getBoardList();
	}, []);

	// // 검색 구현
	// const [search, setSearch] = useState('');
	// const onChangeSearch = (e) => {
	// 	e.preventDefault();
	// 	setSearch(e.target.value);
	// };
	// const onSerach = (e) => {
	// 	e.preventDefault();
	// 	if (search === null || search === '') {
	// 		axios
	// 			.get(`http://localhost:4003/articles`)
	// 			.then((res) => setPosts(res.data));
	// 	} else {
	// 		const filterData = posts.filter((el) => el.title.includes(search));
	// 		setPosts(filterData);
	// 	}
	// };

	const axiosPost = () => {
		axios
			.post(
				'http://localhost:4000/board',
				{
					title: titleRef.current.value,
					description: contentRef.current.value,
				},
				{
					headers: { authorization: `Bearer ${accessToken}` },
					withCredentials: true,
				},
			)
			.then(() => alert('게시판 등록이 완료 되었습니다'))
			.then(() => navigate('/board'));
	};

	// const axiosPost = () => {
	// 	const { postData } = {
	// 		title: titleRef.current.value,
	// 		escription: contentRef.current.value,
	// 	};
	// 	axios
	// 		.post(
	// 			`http://localhost:4000/board`,
	// 			postData,
	// 			{
	// 				headers: {
	// 					'Content-type': 'application/json',
	// 				},
	// 			},
	// 			// {
	// 			//     title: titleRef.current.value,
	// 			//     description: contentRef.current.value,
	// 			// },
	// 			{
	// 				withCredentials: true,
	// 			},
	// 		)
	// 		.then(() => alert('게시판 등록이 완료 되었습니다'))
	// 		.then(() => navigate('/board'));
	// };

	return (
		<div className="wrap">
			<div className="back">
				<img src={`${process.env.PUBLIC_URL}/img/jungleNuNu.jpg`} alt="back" />
			</div>

			<div className="content">
				<div className="boardTitle">
					<p>Board </p>
					<form className="searchInput">
						<input type="text" name="search" placeholder="검색하세요" />
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
