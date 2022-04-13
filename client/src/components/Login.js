import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login({ handleResponseSuccess, issueAccessToken }) {
	const [loginInfo, setLoginInfo] = useState({
		email: '',
		password: '',
	});
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState('');
	// const [invalidErroMessage, setInvalidErrorMessage] = useState('');
	const handleInputValue = (key) => (e) => {
		setLoginInfo({ ...loginInfo, [key]: e.target.value });
	};

	// 구글 로그인을 위해 요청
	const handleAuthLogin = () => {
		window.location.assign(
			`https://accounts.google.com/o/oauth2/v2/auth?scope=
			https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile
			&access_type=offline&response_type=code&state=state_parameter_passthrough_value&
			redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`,
		);
	};

	// 로그인 정보 서버에 요청
	const handleLogin = () => {
		const { email, password } = loginInfo;
		if (!email || !password) {
			setErrorMessage('이메일과 비밀번호를 입력하세요');
			return;
		}
		axios
			.post(
				'http://localhost:4000/auth/login',
				{ email, password },
				{ withCredentials: true },
			)
			.then((result) => {
				// console.log(result);
				if (result.data.message === '잘못된 정보를 입력하였습니다.') {
					setErrorMessage(
						'ID가 존재하지 않거나 비밀번호가 일치하지 않습니다 다시 시도해주세요',
					);
				} else {
					handleResponseSuccess();
					issueAccessToken(result.data.token);
					navigate('/');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="modal-container">
			<div className="modal-view-container">
				<div className="modal-view-header">
					<Link to="/">
						<div className="modal-view_logo">GameStates</div>
					</Link>
					<div className="modal-view_body">
						<div className="simpleLogin_title">간편 로그인</div>
						<button
							className="simpleLogin_button"
							type="button"
							onClick={handleAuthLogin}
						>
							<span className="google-button_inner">
								<img
									src={`${process.env.PUBLIC_URL}/img/google.jpeg`}
									className="google-button_img"
									alt="google"
								/>
								<span className="google-button_txt">Signup with Google</span>
							</span>
						</button>
						<div className="login__l-or">OR</div>
						<div className="emailLogin_title">이메일 로그인</div>
						<form onSubmit={(e) => e.preventDefault()}>
							<input
								type="email"
								placeholder="이메일 주소"
								onChange={handleInputValue('email')}
								// onKeyPress={inputKeyPress}
							/>
							<input
								type="password"
								placeholder="비밀번호"
								onChange={handleInputValue('password')}
								// onKeyPress={inputKeyPress}
							/>
							<div className="user-info-empty_alert-box">{errorMessage}</div>
						</form>
						<span className="user_find-pw-btn">
							<Link to="/mypage">
								<span className="user-link">비밀번호를 잊으셨나요?</span>
							</Link>
						</span>
						<div className="btn-container">
							<button
								type="submit"
								className="login_button"
								onClick={handleLogin}
							>
								로그인
							</button>
						</div>
						<div className="login__l-sign-up">
							GameStates가 처음이세요?
							<Link to="/signup">
								<span className="login__signup_link">회원가입하기</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
