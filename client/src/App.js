<<<<<<< HEAD
/* eslint-disable import/no-unresolved */
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
=======
import { Route, Routes } from 'react-router-dom';
>>>>>>> 8c0793a0b6dd9fb0945195af8f9e82aab2b9dde0
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import Login from './components/Login';
import Logout from './components/Logout';
import Mypage from './components/Mypage';
<<<<<<< HEAD
=======
import Signup from './components/Signup';
>>>>>>> 8c0793a0b6dd9fb0945195af8f9e82aab2b9dde0
import Board from './components/Board';
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
				<Route path="/Board" element={<Board />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
