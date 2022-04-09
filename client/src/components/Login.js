function Login() {
	return (
		<div className="modal-container">
			<div className="modal-view-container">
				<div className="modal-view-header">
					<div className="modal-view_logo">Game States</div>
					<div className="modal-view_body">
						<div className="simpleLogin_title">간편 로그인</div>
						<button className="simpleLogin_button" type="button">
							<span className="google-button_inner">
								<img
									src={`${process.env.PUBLIC_URL} + /img/google.jpeg`}
									className="google-button_img"
									alt="google"
								/>
								<span className="google-button_txt">Signup with Google</span>
							</span>
						</button>
						<div className="login__l-or">OR</div>
						<div className="emailLogin_title">이메일 로그인</div>
						<form onSubmit={(e) => e.preventDefault()}>
							<input type="email" placeholder="이메일 주소" />
							<input type="password" placeholder="비밀번호" />
						</form>
						<span className="user_find-pw-btn">
							<a href="/" className="user-link">
								비밀번호를 잊으셨나요?
							</a>
						</span>
						<div className="btn-container">
							<button type="submit" className="login_button">
								로그인
							</button>
						</div>
						<div className="login__l-sign-up">
							GameStates가 처음이세요?
							<span className="login__signup_link">회원가입하기</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
