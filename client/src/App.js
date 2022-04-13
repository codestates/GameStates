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
import Mypage from './components/Mypage/Mypage';
import MypageModal from './components/Mypage/MypageModal';
import Board from './components/Board/Board';
import BoardRead from './components/Board/BoardRead';
import BoardCreate from './components/Board/BoardCreate';
import BoardList from './components/Board/BoardList';
import './scss/style.scss';

function App() {
	const [isLogin, setIsLogin] = useState(false);
	const [userInfo, setUserInfo] = useState(null);
	const [accessToken, setAccessToken] = useState('');
	const navigate = useNavigate();

	const handleResponseSuccess = () => {
		// console.log(accessToken);
		setIsLogin(true);
	};

	const issueAccessToken = (token) => {
		setAccessToken(token);
	};

	const handleLogout = () => {
		axios
			.post(
				'http://localhost:4000/auth/logout',
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
				navigate('/');
			});
	};

	useEffect(() => {
		setIsLogin(false);
	}, []);

	useEffect(() => {
		const url = new URL(window.location.href);
		const authorization = url.searchParams.get('code');
		if (authorization) {
			google(authorization);
		}
	}, []);

	function google(authorizationCode) {
		axios
			.post('http://localhost:4000/auth/google/callback', null, {
				headers: {
					authorization: authorizationCode,
				},
				withCredentials: true,
			})
			.then((result) => console.log(result));
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
					element={<Mypage userInfo={userInfo} handleLogout={handleLogout} />}
				/>
				<Route
					path="/login"
					element={
						<Login
							issueAccessToken={issueAccessToken}
							handleResponseSuccess={handleResponseSuccess}
						/>
					}
				/>
				<Route path="/signup" element={<Signup isLogin={isLogin} />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/mypage" element={<Mypage />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/board" element={<Board isLogin={isLogin} />} />
				<Route path="/mypagemodal" element={<MypageModal />} />

				<Route path="/board/List" element={<BoardList />} />
				<Route
					path="/board/create"
					element={<BoardCreate accessToken={accessToken} />}
				/>
				<Route
					path="/board/create/:id"
					element={<BoardCreate accessToken={accessToken} />}
				/>
				<Route
					path="/board/modify/:id"
					element={<BoardCreate accessToken={accessToken} />}
				/>
				<Route
					path="/board/read/:id"
					element={<BoardRead accessToken={accessToken} isLogin={isLogin} />}
				/>
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
