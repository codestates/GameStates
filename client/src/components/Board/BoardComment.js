import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';

function BoardComment({ currentPosts }) {
	// const getBoardList = async () => {
	// 	const [comment, setComment] = useState([]);
	// 	await axios
	// 		.get(`http://localhost:4000/board/{id}`)
	// 		.then((res) => setComment(res.data.data.comments));
	// };

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
						<div className="title">{item.comments}</div>
						<div className="name">{item.comments}</div>
						<div className="createAt">{item.comments}</div>
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
