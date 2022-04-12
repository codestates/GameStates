import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MypageModal from './MypageModal';

function Mypage({ userInfo, handleLogout }) {
	return (
		<div className="container">
			<div className="container-view">
				<div className="container-view_box">
					<div className="container-view_title">개인정보 관리</div>
					<div className="edit-table">
						<div className="edit_tr">
							<div className="edit_th">이메일</div>
							<div className="edit_td">{}</div>
						</div>
						<div className="edit_tr">
							<div className="edit_th">생성일자</div>
							<div className="edit_td">{}</div>
						</div>
						<div className="edit_tr">
							<div className="edit_th">비밀번호</div>
							<div className="edit_td">****</div>
						</div>
						<div className="edit_tr">
							<div className="edit_th">닉네임</div>
							<div className="edit_td">{}</div>
						</div>
					</div>
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
					<div className="user-delete_title">회원탈퇴</div>
					<div className="user-delete_sub">
						개인정보 및 개인화 서비스 이용기록이 모두 삭제 되며, 삭제된 데이터는
						복구되지 않습니다. 필요한 데이터는 미리 백업해 주시기 바랍니다.
					</div>
					<div className="container-checkbox">
						<input type="checkbox" />
						<lable className="checkbox-sub">
							회원탈퇴 시 유의사항을 확인하였으며, 모두 동의합니다.
						</lable>
					</div>
					<button type="submit" className="user-delete-btn">
						탈퇴
					</button>
				</div>
			</div>
		</div>
	);
}
export default Mypage;
