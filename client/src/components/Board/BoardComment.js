import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function BoardComment({ currentPosts }) {
	return (
		<div className="boardComment">
			<div className="boardCommentTitle"> 댓글 </div>

			<form className="boardSubmit">
				<textarea
					className="comment"
					type="text"
					name="search"
					placeholder="예쁜말 바른말 고운말만 적어주세요"
				/>
				<button type="submit" className="commentBtn">
					댓 글 <br /> 등 록
				</button>
			</form>

			{currentPosts.map((item) => {
				return (
					<div className="commnetListItem" key={item.id}>
						<div className="title">{item.title}</div>
						<div className="name">{item.name}</div>
						<div className="createAt">{item.insertDate}</div>
					</div>
				);
			})}
		</div>
	);
}

BoardComment.propTypes = {
	currentPosts: PropTypes.node.isRequired,
};
export default BoardComment;
