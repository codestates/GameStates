/* eslint-disable import/no-unresolved */
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main/Main';
import Login from './components/Login';
import Logout from './components/Logout';
import Mypage from './components/Mypage';
import Board from './components/Board/Board';
import BoardRead from './components/Board/BoardRead';
import BoardCreate from './components/Board/BoardCreate';
import './scss/style.scss';

function App() {
	return (
		<div>
			<Header />
			<Routes>
				<Route exact path="/" element={<Main />} />
				<Route path="/login" element={<Login />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/mypage" element={<Mypage />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/board" element={<Board />} />

				<Route path="/board/create" element={<BoardCreate />} />
				<Route path="/board/read/:id" element={<BoardRead />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
