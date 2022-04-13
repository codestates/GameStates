import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { HiOutlineX } from 'react-icons/hi';
import { useState } from 'react';

function Header({ isLogin, handleLogout }) {
	const [isOpen, setOpen] = useState(true);
	const openHandler = () => {
		setOpen(!isOpen);
		// eslint-disable-next-line no-console
		console.log(isOpen);
	};

	return (
		<header className={isOpen ? null : 'active'}>
			<div className="inner">
				<h1 className="logo">
					<NavLink to="/">GameStates</NavLink>
				</h1>
				{isLogin ? (
					<ul className="navMenu" onMouseUpCapture={openHandler}>
						<li>
							<NavLink to="/board">Board</NavLink>
						</li>
						<li>
							<NavLink to="/Mypage">Mypage</NavLink>
						</li>
						<li>
							<NavLink to="/" onClick={() => handleLogout()}>
								Logout
							</NavLink>
						</li>
					</ul>
				) : (
					<ul className="navMenu" onMouseUpCapture={openHandler}>
						<li>
							<NavLink to="/board">Board</NavLink>
						</li>
						<li>
							<NavLink to="/Login">Login</NavLink>
						</li>
						<li>
							<NavLink to="/Signup">Signup</NavLink>
						</li>
					</ul>
				)}
				<button type="button" className="buggerBtn" onClick={openHandler}>
					<NavLink to="#">{isOpen ? <FaBars /> : <HiOutlineX />}</NavLink>
				</button>
			</div>
		</header>
	);
}

export default Header;
