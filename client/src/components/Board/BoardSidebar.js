import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BoardSidebar({ boardData, accessToken, isLogin }) {
	const [userInfo, setUserInfo] = useState([]);
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios({
					method: 'get',
					url: `${process.env.GAMESTATES_API_URL}`,
					baseURL: `${process.env.GAMESTATES_API_URL}`,
				});
				setData(response.data.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		axios
			.get(`${process.env.GAMESTATES_API_URL}user/getUserInfo`, {
				headers: { authorization: `Bearer ${accessToken}` },
			})
			.then((res) => {
				// console.log(res.data.data);
				setUserInfo(res.data.data);
			});
	}, []);

	const countPosts = data.filter((el) => el.userId === userInfo.id).length;
	return (
		<div className="sidebar">
			<div className="mypage">
				{isLogin ? (
					<>
						<div>
							<h4> {userInfo.nickname}님</h4> <br /> 게시글 수 : {countPosts}
						</div>
						<Link to="/board/mycontent">
							<button type="button" className="postCountButton">
								내가 쓴 글
							</button>
						</Link>
					</>
				) : (
					<>
						<div>로그인 하셔야합니다!</div>
						<Link to="/Login">
							<button type="button" className="postCountButton">
								로그인 바로가기
							</button>
						</Link>
					</>
				)}
			</div>

			<div className="menu">
				<div className="menuTitle">
					<h3> 메뉴 </h3>
				</div>
				<div className="menuList">
					<Link to="/board">업데이트</Link>
				</div>
				<div className="menuList">
					<Link to="/board">커뮤니티</Link>
				</div>
			</div>
		</div>
	);
}

BoardSidebar.propTypes = {
	boardData: PropTypes.node.isRequired,
};
export default BoardSidebar;
