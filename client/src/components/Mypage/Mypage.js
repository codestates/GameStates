/* eslint-disable no-alert */
/* eslint-disable no-empty */
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Mypage({ accessToken }) {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [nickname, setNickname] = useState('');
	const [isChecked, setIsChecked] = useState(false);

	const handleChecked = () => {
		setIsChecked(!isChecked);
	};

	useEffect(() => {
		axios
			.get('http://localhost:4000/user/getUserInfo', {
				headers: { authorization: `Bearer ${accessToken}` },
			})
			.then((res) => {
				// console.log(res.data.data.email);
				setEmail(res.data.data.email);
				setNickname(res.data.data.nickname);
			});
	});

	const confirmMessage = () => {
		if (window.confirm('정말 탈퇴하시겠습니까?')) {
			navigate('/deleteUser');
		} else {
			alert('취소되었습니다.');
			navigate('/mypage');
		}
	};
	// 회원탈퇴 서버 요청
	const deleteUserInfo = () => {
		// confirm창에서 취소를 누르면 마이페이지로 이동
		// 확인을 누르면 정상 회원탈퇴 페이지로 이동
		confirmMessage();
		axios
			.delete(
				'http://localhost:4000/user/deleteUserInfo',
				{
					headers: { authorization: `Bearer ${accessToken}` },
				},
				{
					withCredentials: true,
				},
			)
			.then((res) => {
				navigate('/');
			});
	};

	return (
		<div className="container">
			<div className="container-view">
				<div className="container-view_box">
					<div className="container-view_title">개인정보 관리</div>
					<div className="edit-table">
						<div className="edit_tr">
							<div className="edit_th">이메일</div>
							<div className="edit_td">{email}</div>
						</div>
						<div className="edit_tr">
							<div className="edit_th">닉네임</div>
							<div className="edit_td">{nickname}</div>
						</div>
					</div>
					<div className="mypageBtn">
						<Link to="/mypagemodal">
							<button type="submit" className="edit-btn">
								수정
							</button>
						</Link>
						<Link to="/">
							<button type="submit" className="save-btn">
								저장
							</button>
						</Link>
					</div>
					<div className="user-delete_title">회원탈퇴</div>
					<div className="user-delete_sub">
						개인정보 및 개인화 서비스 이용기록이 모두 삭제 되며, 삭제된 데이터는
						복구되지 않습니다. 필요한 데이터는 미리 백업해 주시기 바랍니다.
					</div>
					<div className="container-checkbox">
						<input type="checkbox" onClick={handleChecked} />
						<lable className="checkbox-sub">
							회원탈퇴 시 유의사항을 확인하였으며, 모두 동의합니다.
						</lable>
					</div>
					{isChecked ? (
						<button
							type="submit"
							className="user-delete-btn"
							onClick={() => deleteUserInfo()}
						>
							탈퇴
						</button>
					) : (
						<button type="submit" className="user-delete-btn">
							탈퇴
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
export default Mypage;
