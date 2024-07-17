import React from "react";
import "./Cart.css";
export const Cart = () => {
  return (
    <main>
      <div className="cart_page">
        <p>홈, 장바구니</p>
      </div>
      <div className="cart_form">
        <div className="count">
          <h6 className="count_label">장바구니</h6>
          <div className="count_num">0</div>
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
          <div className="amount_total">
            <div className="amount_total_label">
              <p>총 주문금액</p>
              <p>배송비</p>
              <p className="font_bold_total">총 주문금액</p>
            </div>
            <div className="amount_total_price">
              <p className="font_bold">
                {"-"} {"원"}
              </p>
              <p className="font_bold">
                {"-"} {"원"}
              </p>
              <p className="font_bold_total">
                {"-"} {"원"}
              </p>
            </div>
            <div></div>
          </div>
        </div>
        <div className="pay">
          <div className="pay_member">
            <button className="pay_member_no">비회원 구매</button>
            <button className="pay_member_yes">회원 구매</button>
          </div>
          <button className="pay_continue">계속 쇼핑하기</button>
        </div>
      </div>
    </main>
  );
};
