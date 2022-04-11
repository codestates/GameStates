/* eslint-disable import/no-unresolved */
import './App.css';
import { Route, Routes, useNavigate, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { Switch } from 'react-router-dom';
import axios from 'axios';
import Signup from './components/Signup';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main/Main';
import Login from './components/Login';
import Logout from './components/Logout';
import Mypage from './components/Mypage';
import Board from './components/Board';
import './scss/style.scss';

function App() {
	const navigate = useNavigate();
	const [isLogin, setIsLogin] = useState(false);
	const [loginInfo, setLoginInfo] = useState('');
	const [accessToken, setAccessToken] = useState('');

	// 서버 API 확인
	// const handleLogout = () => {
	// 	axios.post('http://localhost:4000/logout').then((res) => {
	// 		setLoginInfo(null);
	// 		setIsLogin(false);
	// 		navigate('/');
	// 	});
	// };

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
			<Header />
			<Routes>
				<Route exact path="/" element={<Main />} />
				<Route path="/mypage" element={<Mypage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/Board" element={<Board />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
