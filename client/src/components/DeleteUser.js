import { Link } from 'react-router-dom';

function DeleteUser() {
	return (
		<div>
			<div>회원탈퇴가 완료되었습니다.</div>
			<Link to="/">
				<button type="button">확인</button>
			</Link>
		</div>
	);
}

export default DeleteUser;
