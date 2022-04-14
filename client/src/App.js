/* eslint-disable import/no-unresolved */
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Signup from './components/Signup';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main/Main';
import Login from './components/Login';
import Logout from './components/Logout';
import DeleteUser from './components/DeleteUser';
import Mypage from './components/Mypage/Mypage';
import MypageModal from './components/Mypage/MypageModal';
import Board from './components/Board/Board';
import BoardRead from './components/Board/BoardRead';
import BoardCreate from './components/Board/BoardCreate';
import BoardList from './components/Board/BoardList';
import Boardmycontent from './components/Board/Boardmycontent';
import './scss/style.scss';

function App() {
	const [isLogin, setIsLogin] = useState(false);
	const [userInfo, setUserInfo] = useState('');
	const [accessToken, setAccessToken] = useState('');
	const navigate = useNavigate();

	// 로그인 상태 변경
	const handleResponseSuccess = () => {
		setIsLogin(true);
	};

	// 서버에서 받아온 토큰 최신화
	const issueAccessToken = (token) => {
		setAccessToken(token);
	};

	// 서버에 토큰을 보내며 로그아웃 요청
	const handleLogout = () => {
		if (window.confirm('정말 로그아웃 하시겠습니까?')) {
			axios
				.post(
					`${process.env.REACT_APP_GAMESTATES_API_URL}auth/logout`,
					null,
					{
						headers: { authorization: `Bearer ${accessToken}` },
					},
					{
						withCredentials: true,
					},
				)
				.then((res) => {
					setUserInfo(null);
					setIsLogin(false);
					alert('로그아웃 되었습니다.');
					navigate('/');
				});
		}
	};

	useEffect(() => {
		const url = new URL(window.location.href);
		const authorization = url.searchParams.get('code');
		if (authorization) {
			google(authorization);
		}
	}, []);

	// 구글에 authorization code와 함께 요청
	function google(authorizationCode) {
		axios
			.post('http://localhost:4000/auth/google/callback', null, {
				headers: {
					authorization: authorizationCode,
				},
				withCredentials: true,
			})
			.then((result) => {
				alert('로그인 되었습니다.');
				handleResponseSuccess();
				navigate('/');
			});
		// 액세스 토큰을 받아온다.
	}

	return (
		<div>
			<Header
				isLogin={isLogin}
				accessToken={accessToken}
				handleLogout={handleLogout}
			/>
			<Routes>
				<Route exact path="/" element={<Main />} />
				<Route
					path="/mypage"
					element={
						<Mypage
							userInfo={userInfo}
							accessToken={accessToken}
							isLogin={isLogin}
							setIsLogin={setIsLogin}
							setUserInfo={setUserInfo}
							handleLogout={handleLogout}
						/>
					}
				/>
				<Route
					path="/login"
					element={
						<Login
							setIsLogin={setIsLogin}
							setUserInfo={setUserInfo}
							issueAccessToken={issueAccessToken}
							handleResponseSuccess={handleResponseSuccess}
						/>
					}
				/>
				<Route
					path="/signup"
					element={<Signup isLogin={isLogin} accessToken={accessToken} />}
				/>
				<Route path="/logout" element={<Logout />} />
				<Route
					path="/mypagemodal"
					element={<MypageModal accessToken={accessToken} />}
				/>
				<Route path="/deleteUser" element={<DeleteUser />} />

				<Route path="/board/List" element={<BoardList />} isLogin={isLogin} />
				<Route
					path="/board"
					element={<Board isLogin={isLogin} accessToken={accessToken} />}
				/>
				<Route path="/board:id" element={<Board isLogin={isLogin} />} />
				<Route
					path="/board/create"
					element={<BoardCreate accessToken={accessToken} isLogin={isLogin} />}
				/>
				<Route
					path="/board/mycontent"
					element={
						<Boardmycontent accessToken={accessToken} isLogin={isLogin} />
					}
				/>

				<Route
					path="/board/modify/:id"
					element={<BoardCreate accessToken={accessToken} isLogin={isLogin} />}
				/>
				<Route
					path="/board/read/:id"
					element={<BoardRead accessToken={accessToken} isLogin={isLogin} />}
				/>
				<Route
					path="/board/comment/:commentId"
					element={<BoardRead accessToken={accessToken} isLogin={isLogin} />}
				/>
			</Routes>

			<Footer />
		</div>
	);
}

export default App;
