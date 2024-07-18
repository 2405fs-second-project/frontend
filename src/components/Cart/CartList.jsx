import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CartList.css";
import { CartPrice } from "./CartPrice";
import { CartInContext } from "../../service/CartService";

export const CartList = () => {
  const { cartItems } = useContext(CartInContext);
  console.log("Current cartItems:", cartItems);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [itemQuantities, setItemQuantities] = useState(cartItems.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {})); // 아이템별 수량 상태
  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  // 가격 총합 계산 함수
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + Number(item.price) * (itemQuantities[item.id] || 1), 0);
  };

  const handleMemberPurchase = () => {
    navigate("/order");
  };

  const handleNonMemberPurchase = () => {
    navigate("/login");
  };

  const handleHome = () => {
    navigate("/");
  };
  const handleQuantityChange = (itemId, value) => {
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: value,
    }));
  };

  let count_label = "장바구니";

  return (
    <div className="cart_form">
      <div className="count">
        <h6 className="count_label">{count_label}</h6>
        <div className="count_num">{cartItems.length}</div>
      </div>
      <div className="select">
        <div className="select_all">
          <div className="select_all_box">
            <input type="checkbox" id="checkall"></input>
            <label for="checkall">전체선택</label>
          </div>
        </div>
        <button className="cancel_all">선택상품 삭제</button>
      </div>
      <div className="list">
        {cartItems.length > 0 ? (
          <div>
            {cartItems.map((item, index) => (
              <div key={item.id}>
                <div className="item_rows">
                  <div className="item_check">
                    <input type="checkbox" id="checkrow"></input>
                    <label for="checkrow"></label>
                  </div>
                  <div className="item_file">{item.file}</div>
                  <div className="item_des">
                    <div className="item_des_bold">
                      <div className="item_title">{item.title}</div>
                    </div>
                    <div className="item_des_thin">
                      <div className="item_color">{item.color},</div>
                      <div className="item_size">사이즈 {item.size}</div>
                    </div>
                  </div>
                  <div className="item_quantity">
                    <label for="quantity">수량:</label>
                    <input
                      type="number"
                      id={`quantity_${item.id}`}
                      value={itemQuantities[item.id] || 1}
                      onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                    ></input>
                  </div>
                  <div className="item_delete">
                    <button>삭제</button>
                  </div>
                  <div className="item_price">
                    {formatNumber(Number(item.price) * (itemQuantities[item.id] || 1))} 원
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h4>장바구니에 담은 상품이 없습니다.</h4>
        )}
      </div>
      <div className="amount">
        <CartPrice totalPrice={calculateTotalPrice()} />
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
        <div className="pay_btn">
          <button className="pay_continue" onClick={handleHome}>
            계속 쇼핑하기
          </button>
        </div>
      </div>
    </div>
  );
};
