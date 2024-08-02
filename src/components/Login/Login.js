import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../service/AuthService"; // AuthService import 변경
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await AuthService.loginUser({ email, password }); // AuthService.loginUser 호출
      const { jwt, userId, userName } = response;
      login({ jwt, id: userId, name: userName });
      setMessage("로그인 성공");
      // userId가 9이면 /product 페이지로 이동, 그렇지 않으면 /mypage/{userId}로 이동
      if (userId === 9) {
        navigate(`/seller`);
      } else {
        navigate(`/mypage/${userId}`);
      }
    } catch (error) {
      setMessage(
        "아이디 또는 비밀번호를 잘못 입력하셨습니다. 다시 시도해주세요."
      );
    }
  };

  return (
    <div className="login">
      <div className="login_box">
        <h2>로그인</h2>
        <div className="login_info">
          <form onSubmit={handleSubmit}>
            <div className="id_box">
              <label htmlFor="id">아이디</label>
              <input
                id="id"
                type="email"
                placeholder="이메일을 입력해주세요."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="pw_box">
              <label>비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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
            <button className="login_button" type="submit">
              로그인
            </button>
            <Link to="/signup1">
              <button className="signup_button" type="button">
                회원가입
              </button>
            </Link>
          </form>
          {message && <p>{message}</p>}
          <div className="help_link">비회원 주문조회</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
