import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login">
      <div className="login_box">
        <h2>로그인</h2>
        <div className="login_info">
          <div className="id_box">
            <label htmlFor="id">아이디</label>
            <input id="id" type="email" placeholder="이메일을 입력해주세요." />
          </div>
          <div className="pw_box">
            <label>비밀번호</label>
            <input type="password" placeholder="비밀번호를 입력해주세요." />
          </div>
          <div className="check_box">
            <div className="check_left">
              <input type="checkbox" />
              <div>아이디 저장</div>
            </div>
            <div className="check_right">
              <div>아이디 찾기</div>
              <div className="blank"></div>
              <div>비밀번호 찾기</div>
            </div>
          </div>
          <button className="login_button">로그인</button>
          <Link to="/signup1">
            <button className="signup_button">회원가입</button>
          </Link>
          <div className="help_link">비회원 주문조회</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
