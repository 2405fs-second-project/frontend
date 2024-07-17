import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/CartList.css";
import { CartPrice } from "./CartPrice";

export const CartList = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const handleMemberPurchase = () => {
    navigate("/order");
  };

  const handleNonMemberPurchase = () => {
    navigate("/login");
  };

  const handleHome = () => {
    navigate("/");
  };
  let count_label = "장바구니";
  let count_num = "0";

  return (
    <div className="cart_form">
      <div className="count">
        <h6 className="count_label">{count_label}</h6>
        <div className="count_num">{count_num}</div>
      </div>
      <div className="select">
        <div className="select_all">
          <div className="select_all_box">
            <input type="checkbox" id="checkbox1"></input>
            <label for="checkbox1">전체선택</label>
          </div>
        </div>
        <button className="cancel_all">선택상품 삭제</button>
      </div>
      <div className="list">
        <h4>장바구니에 담은 상품이 없습니다.</h4>
      </div>
      <div className="amount">
        <CartPrice />
      </div>
      <div className="pay">
        <div className="pay_member">
          {isLoggedIn ? (
            <>
              <button className="pay_member_yes" onClick={handleMemberPurchase}>
                회원 구매
              </button>
            </>
          ) : (
            <>
              <button className="pay_member_no" onClick={handleMemberPurchase}>
                비회원 구매
              </button>
              <button className="pay_member_yes" onClick={handleNonMemberPurchase}>
                회원 구매
              </button>
            </>
          )}
        </div>
        <button className="pay_continue" onClick={handleHome}>
          계속 쇼핑하기
        </button>
      </div>
    </div>
  );
};
