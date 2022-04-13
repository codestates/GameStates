import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

function BoardComment({ read, accessToken }) {
	const descriptionRef = useRef(null);
	const { id } = useParams();

	const PostCommnt = () => {
		if (descriptionRef.current.value === '') {
			alert('모든 칸을 작성해야합니다!');
		} else {
			axios
				.post(
					`http://localhost:4000/board/${id}`,
					{
						description: descriptionRef.current.value,
					},
					{
						headers: { authorization: `Bearer ${accessToken}` },
						withCredentials: true,
					},
				)
				.then(() => alert('댓글 등록이 완료 되었습니다'));
			// .then(() => navigate('/board'));
		}
	};

	return (
		<div className="boardComment">
			<div className="boardCommentTitle"> 댓글 </div>

			<form className="boardSubmit">
				<textarea
					ref={descriptionRef}
					className="comment"
					type="text"
					placeholder="예쁜말 바른말 고운말만 적어주세요"
				/>
				<button onClick={PostCommnt} type="button" className="commentBtn">
					댓 글 <br /> 등 록
				</button>
			</form>
			{/* 
			{read.map((item) => {
				return (
					<div className="commnetListItem" key={item.id}>
						<div className="title">{item.comments}</div>
						<div className="name">{item.comments}</div>
						<div className="createAt">{item.comments}</div>
					</div>
				);
			})} */}
		</div>
	);
}

export default BoardComment;
