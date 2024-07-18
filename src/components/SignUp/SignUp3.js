import React from "react";
import "./SignUp3.css";
import { Link } from "react-router-dom";

const Signup_3 = () => {
  return (
    <div className="signup_3">
      <div className="signup_box_3">
        <h2>회원가입 완료</h2>
        <div className="info_1">
          주식회사 원스아웃 통합회원 가입이 완료 되었습니다.
          <br />
          앞으로 아래와 같은 서비스를 이용하실 수 있습니다.
        </div>
        <h2>쿠폰 혜택을 받으실 수 있습니다.</h2>
        <div className="button">
          <button className="info_2">
            →<span>웰컴 5% 쿠폰 이용하기</span>
          </button>
        </div>
        <h2>적립금 적립 및 사용 혜택을 받으실 수 있습니다.</h2>
        <div className="info_3">
          → 온라인 및 오프라인 구매 시 1% 적립금 적립
          <br />→ 온라인 구매 시 적립금 사용 가능 (오프라인 불가)
        </div>
        <div>
          <h2>회원 전용 상품 및 구매 제한 상품을 이용하실 수 있습니다.</h2>
          <h2>응모를 통하여 한정 상품을 구매 하실 수 있습니다.</h2>
        </div>
        <div>
          <button className="member_benefit">
            더 자세한 회원 혜택 바로가기
          </button>
          <Link to="/login">
            <button className="go_login">로그인 하기</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup_3;
