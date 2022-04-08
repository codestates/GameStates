import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

function Header() {
	return (
		<header>
			<div className="inner">
				<h1 className="logo">
					<NavLink to="/">GmaeStates</NavLink>
				</h1>
				<ul className="navMenu">
					<li>
						<NavLink to="/board">board</NavLink>
					</li>
					<li>
						<NavLink to="/Login">Login</NavLink>
					</li>
					<li>
						<NavLink to="/Signup">Signup</NavLink>
					</li>
				</ul>
				<div className="buggerBtn">
					<NavLink to="#">
						<FaBars />
					</NavLink>
				</div>
			</div>
		</header>
	);
}

export default Header;
