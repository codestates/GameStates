import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BoardSidebar from './BoardSidebar';

function BoardCreate({ accessToken, match }) {
	const titleRef = useRef(null);
	const contentRef = useRef(null);
	const navigate = useNavigate();
	const [posts, setPosts] = useState([]);
	// eslint-disable-next-line no-undef

	const { id } = useParams();

	const onSubmit = (e) => {
		e.preventDefault();
	};
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
		if (titleRef.current.value === '' && contentRef.current.value === '') {
			alert('모든 칸을 작성해야합니다!');
		} else if (titleRef.current.value.length >= 20) {
			alert('20글자 이하로 작성해야합니다!!');
		} else {
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
		}
	};

	const [modifyData, setModifyData] = useState([]);

	const getModifyData = async (boardid) => {
		const getData = await axios('http://localhost:4000/board/', {
			method: 'POST',
			headers: new Headers(),
			data: { id: boardid },
		});

		modifyData({
			title: getData.data[0].title,
			contents: getData.data[0].contents,
		});
	};

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
										{id ? '수정 완료' : '작성 완료'}
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
