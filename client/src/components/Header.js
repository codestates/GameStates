import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { HiOutlineX } from 'react-icons/hi';
import { useState } from 'react';

function Header() {
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
					<li>
						<NavLink to="/Mypage">Mypage</NavLink>
					</li>
				</ul>
				<button type="button" className="buggerBtn" onClick={openHandler}>
					<NavLink to="#">{isOpen ? <FaBars /> : <HiOutlineX />}</NavLink>
				</button>
			</div>
		</header>
	);
}

export default Header;
