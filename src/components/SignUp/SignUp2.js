import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../service/AuthService";
import "./SignUp2.css";

const SignUp2 = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNum: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    passwordMismatch: false,
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password" || name === "confirmPassword") {
      setErrors({
        ...errors,
        passwordMismatch:
          name === "confirmPassword" && formData.password !== value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, passwordMismatch: true });
      setMessage("비밀번호가 일치하지 않습니다");
      return;
    }

    try {
      await AuthService.registerUser(formData);
      setMessage("User registered successfully");
      navigate("/signup3");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error registering user";
      console.error(error);
      setMessage(errorMessage);
    }
  };

  const isFormValid = () => {
    return (
      Object.values(formData).every((value) => value.trim() !== "") &&
      !errors.passwordMismatch
    );
  };

  return (
    <div className="signup_2">
      <div className="signup_box_2">
        <h3>계정 정보 입력</h3>
        <p>고객님이 사용하실 계정 정보를 입력해주세요.</p>
        <div className="signup_info">
          <form onSubmit={handleSubmit}>
            <div>
              <label>이름</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>핸드폰번호</label>
              <input
                type="text"
                name="phoneNum"
                value={formData.phoneNum}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>아이디 (이메일)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="이메일을 입력해주세요."
                required
              />
            </div>
            <div>
              <label>비밀번호</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>비밀번호 확인</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {errors.passwordMismatch && (
                <div className="error">비밀번호가 일치하지 않습니다</div>
              )}
            </div>
            <button
              type="submit"
              className={isFormValid() ? "active" : ""}
              disabled={!isFormValid()}
            >
              통합 회원가입
            </button>
          </form>
          {message && <p>{message}</p>}
          <Link to="/login">
            <button>로그인 페이지로 이동</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp2;
