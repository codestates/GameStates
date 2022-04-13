import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function MypageModal({ accessToken }) {
	const navigate = useNavigate();
	const [nickname, SetUserNickname] = useState('');
	const [password, setUserPassword] = useState('');
	// const [userPasswordCheck, setUserPasswordCheck] = useState('');
	// 유효한 비밀번호를 입력했는지 확인
	const isValidPassword = () => {
		const passwordFailMessage = document.querySelector(
			'.password-invalid-message',
		);
		// 최소 8 자, 최소 하나의 알파벳, 하나의 숫자 및 하나의 특수 문자 :
		if (/(?=.*\d)(?=.*[a-zA-ZS]).{8,}/.test(password)) {
			passwordFailMessage.classList.add('hide');
		} else {
			passwordFailMessage.classList.remove('hide');
		}
	};

	// 동일한 비밀번호를 입력했는지 확인
	// const isCheckPassword = () => {
	// 	const passwordCheckMessage = document.querySelector(
	// 		'.password-check-message',
	// 	);
	// 	if (
	// 		/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,}$/.test(
	// 			userPasswordCheck,
	// 		) &&
	// 		userPassword !== userPasswordCheck
	// 	) {
	// 		passwordCheckMessage.classList.add('hide');
	// 	} else {
	// 		passwordCheckMessage.classList.remove('hide');
	// 	}
	// };
	// 유효한 닉네임을 입력했는지 확인
	const isVaildNickname = () => {
		const nicknameFailMessage = document.querySelector(
			'.nickname-invalid-message',
		);
		// 특수문자 제외 2자 ~ 20자
		if (/^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/.test(nickname)) {
			nicknameFailMessage.classList.add('hide');
		} else {
			nicknameFailMessage.classList.remove('hide');
		}
	};

	// 유저정보 수정 후 서버에 확인 버튼 클릭시 요청
	console.log(nickname);
	const saveEditUserInfo = () => {
		// const { editData } = { data: { password, nickname } };
		if (nickname === '' || password === '') {
			alert('모든 칸을 작성해야합니다!');
		}
		axios
			.patch(
				'http://localhost:4000/user/modifyUserInfo',
				{
					nickname,
					password,
				},
				{
					headers: { authorization: `Bearer ${accessToken}` },
				},
				{
					withCredentials: true,
				},
			)
			.then((res) => {
				navigate('/mypage');
			});
	};

	return (
		<div className="edit-container">
			<div className="edit-modal_backdrop">
				<div className="edit-modal_view">
					<div className="edit-modal_body">
						<div className="edit-table">
							<div className="edit_tr">
								<div className="edit_th">새 비밀번호</div>
								<div className="edit_td">
									<input
										className="edit-user-info"
										type="password"
										placeholder="새 비밀번호"
										onChange={(e) =>
											isValidPassword(setUserPassword(e.target.value))
										}
									/>
									<div className="password-invalid-message hide">
										비밀번호는 최소 8자 이상, 알파벳과 숫자 및 특수문자를
										포함해야 합니다.
									</div>
								</div>
							</div>
							{/* <div className="edit_tr">
								<div className="edit_th">새 비밀번호 확인</div>
								<div className="edit_td">
									<input
										className="edit-user-info"
										type="password"
										placeholder="새 비밀번호 확인"
										// onChange={(e) =>
										// 	// isCheckPassword(setUserPasswordCheck(e.target.value))
										// }
									/>
									<div className="password-check-message hide">
										비밀번호가 맞지 않습니다.
									</div>
								</div> */}
							{/* </div> */}
							<div className="edit_tr">
								<div className="edit_th">닉네임</div>
								<div className="edit_td">
									<input
										className="edit-user-info"
										type="text"
										placeholder="닉네임"
										onChange={(e) =>
											isVaildNickname(SetUserNickname(e.target.value))
										}
									/>
									<div className="nickname-invalid-message hide">
										유효한 닉네임을 입력해 주시기 바랍니다.
									</div>
								</div>
							</div>
						</div>
						<div className="modalBtn">
							<Link to="/mypage">
								<button type="button" className="cancel-btn">
									취소
								</button>
							</Link>
							<Link to="/mypage">
								<button
									type="button"
									className="save-btn"
									onClick={() => saveEditUserInfo()}
								>
									확인
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MypageModal;
