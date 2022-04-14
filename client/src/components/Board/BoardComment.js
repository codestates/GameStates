import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';

function BoardComment({ accessToken }) {
	const descriptionRef = useRef(null);
	const { id } = useParams();
	const navigate = useNavigate();
	const [read, setRead] = useState([]);
	const [comments, setcomments] = useState([]);
	const readComment = read.comments;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios({
					method: 'get',
					url: `${process.env.REACT_APP_GAMESTATES_API_URL}board/${id}`,
					baseURL: `${process.env.REACT_APP_GAMESTATES_API_URL}board`,
				});
				setRead(response.data.isCreated);
				setcomments(response.data.isCreated.comments);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	const del = async (commnetId) => {
		if (window.confirm('삭제하시겠습니까?')) {
			console.log('1');
			await axios.delete(
				`${process.env.REACT_APP_GAMESTATES_API_URL}comment/${commnetId}`,
				{
					headers: { authorization: `Bearer ${accessToken}` },
					withCredentials: true,
				},
			);
			axios
				.get(`${process.env.REACT_APP_GAMESTATES_API_URL}board/${id}`)
				.then((res) => setRead(res.data.isCreated));
			// .then(() => navigate('/board'));
		} else {
			alert('댓글 삭제가 취소 되었습니다.');
		}
	};

	const PostCommnt = async () => {
		if (descriptionRef.current.value === '') {
			alert('모든 칸을 작성해야합니다!');
		} else {
			await axios.post(
				`${process.env.REACT_APP_GAMESTATES_API_URL}comment/${id}`,
				{
					comment: descriptionRef.current.value,
				},
				{
					headers: { authorization: `Bearer ${accessToken}` },
					withCredentials: true,
				},
			);
			axios
				.get(`${process.env.REACT_APP_GAMESTATES_API_URL}board/${id}`)
				.then((res) => setRead(res.data.isCreated))
				.then((descriptionRef.current.value = ''))
				.then(alert('댓글 등록이 완료 되었습니다'));
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

			{readComment &&
				readComment.map((item) => {
					return (
						<div className="commnetListItem" key={item.comments}>
							<div className="firstline">
								<div className="name">{item.user.nickname}</div>
								<div className="createAt">{item.createdAt.slice(0, 10)}</div>
							</div>
							<div className="title">{item.description}</div>
							<div className="btnLine">
								<button
									type="button"
									className="delBtn"
									onClick={() => del(item.id)}
								>
									삭제
								</button>
							</div>
						</div>
					);
				})}
		</div>
	);
}

export default BoardComment;
