import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BoardSidebar from './BoardSidebar';
import Pagination from './Pagination';

function Boardmycontent({ isLogin, accessToken }) {
	const [userInfo, setUserInfo] = useState([]);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios({
					method: 'get',
					url: `http://localhost:4000/board/`,
					baseURL: 'http://localhost:4000/board/',
				});
				setPosts(response.data.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		axios
			.get('http://localhost:4000/user/getUserInfo', {
				headers: { authorization: `Bearer ${accessToken}` },
			})
			.then((res) => {
				// console.log(res.data.data);
				setUserInfo(res.data.data);
			});
	}, []);

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
				<img src={`${process.env.PUBLIC_URL}/img/jungleNuNu2.jpg`} alt="back" />
			</div>

			<div className="content">
				<div className="boardTitle">
					<p>My content</p>
					<form className="searchInput">
						<input type="text" name="search" placeholder="검색하세요" />
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
						{currentPosts
							.filter((el) => el.userId === userInfo.id)
							.map((item) => {
								return (
									<div className="listItem" key={item.id}>
										<Link to={`/board/read/${item.id}`}>
											<div className="title">{item.title}</div>
											<div className="name">{item.title}</div>
											<div className="createAt">
												{item.createdAt.slice(0, 10)}
											</div>
										</Link>
									</div>
								);
							})}
					</div>{' '}
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
export default Boardmycontent;
