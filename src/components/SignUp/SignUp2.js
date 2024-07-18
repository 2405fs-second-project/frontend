import React, { useState } from "react";
import "./SignUp2.css";
import { Link } from "react-router-dom";

const Signup_2 = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    passwordMismatch: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password" || name === "confirmPassword") {
      if (formData.password !== value && name === "confirmPassword") {
        setErrors({
          ...errors,
          passwordMismatch: formData.password !== "" && value !== "",
        });
      } else if (formData.password === value && name === "confirmPassword") {
        setErrors({ ...errors, passwordMismatch: false });
      } else if (name === "password" && formData.confirmPassword !== "") {
        setErrors({
          ...errors,
          passwordMismatch: value !== formData.confirmPassword,
        });
      }
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
          <div>
            <label>이름</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>핸드폰번호</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
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
            />
          </div>
          <div>
            <label>비밀번호</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>비밀번호 확인</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.passwordMismatch &&
              formData.password &&
              formData.confirmPassword && (
                <div className="error">비밀번호가 일치하지 않습니다</div>
              )}
          </div>
        </div>
        <Link to="/signup3">
          <button
            type="submit"
            className={isFormValid() ? "active" : ""}
            disabled={!isFormValid()}
          >
            통합 회원가입
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Signup_2;
