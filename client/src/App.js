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
	const navigate = useNavigate();
	const [isLogin, setIsLogin] = useState(false);
	const [loginInfo, setLoginInfo] = useState(null);
	const [accessToken, setAccessToken] = useState('');

	const handleLogout = () => {
		axios.post('http://localhost:4000/auth/logout').then((res) => {
			setLoginInfo(null);
			setIsLogin(false);
			navigate('/');
		});
	};

	const issueAccessToken = (token) => {
		setAccessToken(token);
	};

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
			<Header isLogin={isLogin} handleLogout={handleLogout} />
			<Routes>
				<Route exact path="/" element={<Main />} />
				<Route
					path="/mypage"
					element={<Mypage loginInfo={loginInfo} handleLogout={handleLogout} />}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup isLogin={isLogin} />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/mypage" element={<Mypage />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/board" element={<Board />} />
				<Route path="/mypagemodal" element={<MypageModal />} />
			</Routes>
			<Routes>
				<Route path="/board/List" element={<BoardList />} />
				<Route path="/board/create" element={<BoardCreate />} />
				<Route path="/board/read/:id" element={<BoardRead />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
