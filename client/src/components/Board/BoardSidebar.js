import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function BoardSidebar({ boardData }) {
	return (
		<div className="sidebar">
			<div className="mypage">
				<div>
					<h4>김유정 님</h4> <br /> 게시글 수 : {boardData.length}
				</div>
				<button type="button" className="postCountButton">
					내가 쓴 글
				</button>
			</div>

			<div className="menu">
				<div className="menuTitle">
					<h3> 메뉴 </h3>
				</div>
				<div className="menuList">
					<Link to="/board">커뮤니티</Link>
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
