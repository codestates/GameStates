import React, { useState } from 'react';
import './Signup.css';

// import { useHistory } from 'react-router-dom';
// import axios from 'axios';

function Signup() {
	// 유저 이메일 유효성 검사
	// 올바른 이메일 형식 필수 입력
	const [userEmail, setUserEmail] = useState('');
	const isValidEmail = () => {
		const emailFailMessage = document.querySelector('.email-fail-message');
		if (
			/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/.test(
				userEmail,
			)
		) {
			emailFailMessage.classList.add('hide');
		} else {
			emailFailMessage.classList.remove('hide');
		}
	};

	// 유저 비밀번호 유효성 검사
	// 최소 8자 이상, 하나 이상의 문자, 하나의 숫자 및 하나의 특수 문자 필수 입력
	const [userPassword, setUserPassword] = useState('');
	const isValidPassword = () => {
		const pwFailMessage = document.querySelector('.password-fail-message');
		if (
			/^ (?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
				userPassword,
			)
		) {
			pwFailMessage.classList.add('hide');
		} else {
			pwFailMessage.classList.remove('hide');
		}
	};

	// const [userNickname, setUserNickname] = useState('');
	// const isValidNickname = () => {
	// 	const nicknameFailMessage = document.querySelector(
	// 		'.nickname-fail-message',
	// 	)
	// 	if ()
	// };

	// 서버에 회원가입 요청 보낼 유저 정보
	const [userInfo, setUserInfo] = useState({
		email: '',
		password: '',
		nickname: '',
	});

	// 유저가 유효한 이메일을 입력했을 때 서버에 요청한다
	// const handleSingup = () => {
	// 	if (isValidEmail() && isValidPassword() && isValidNickname()) {
	// 		axios.post('https://localhost:4000/signup', {
	// 			...userInfo,
	// 		})
	// 		.then((response) => {

	// 		})
	// 	}
	// };

	return (
		<div className="modal-container">
			<div className="modal-view">
				<div className="modal-view_header">
					<div className="modal-view_logo">Game States</div>
				</div>
				<div className="modal-view_body">
					<div className="signup_title">회원가입</div>
					<div className="signup_sub">
						회원가입을 위해서 이메일 인증이 진행되며, 인증이 완료되기 전까지
						회원가입이 완료가 되지 않습니다.
					</div>
					<form onSubmit={(e) => e.preventDefault()}>
						<input type="email" placeholder="이메일 주소" />
						{/* <button type="submit">중복확인</button> */}
						<div className="email-fail-message hide">
							유효한 이메일 주소를 입력해 주시기 바랍니다.
						</div>
						{/* <div className="id-validate-fail hide">
							아이디는 영어 또는 숫자만 가능합니다.
						</div>
						<div className="id-confirm">중복검사를 진행해 주세요</div>
						<div className="id-existed hide">중복된 이메일 입니다.</div>
						<div className="id-new hide">중복되지 않은 이메일 입니다.</div> */}
						<input type="password" placeholder="비밀번호" />
						<div className="password-fail-message hide">
							유효한 비밀번호를 입력해 주시기 바랍니다.
						</div>
						<input type="text" placeholder="닉네임" />
						{/* <div className="nickname-fail-message hide">
							유효한 닉네임을 입력해 주시기 바랍니다.
						</div> */}
					</form>
					<button className="register_button" type="submit">
						계정 만들기
					</button>
					<div className="singup_go-to-login">
						이미 회원이신가요?
						<a href="/login" type="button" className="signup_go-to-login-btn">
							로그인하기
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Signup;
