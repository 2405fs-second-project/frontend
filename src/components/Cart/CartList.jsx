import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CartList.css";
import { CartPrice } from "./CartPrice";
import { CartItem } from "./CartItem";
import { CartInContext } from "../../service/CartService";

export const CartList = () => {
  const { cartItems, setCartItems } = useContext(CartInContext);
  console.log("Current cartItems:", cartItems);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [itemQuantities, setItemQuantities] = useState(cartItems.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {}));
  const navigate = useNavigate();
  const handleQuantityChange = (itemId, value) => {
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: value,
    }));
  };

  // 가격 총합 계산 함수
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + Number(item.price) * (itemQuantities[item.id] || 1), 0);
  };
  const handleNavigation = (path) => {
    navigate(path);
  };
  const handleDeleteSelected = () => {
    // 현재 선택된 항목 확인
    console.log("Selected Items to Delete:", selectedItems);

    // cartItems에서 선택된 항목 제거
    setCartItems((prevItems) => {
      const newItems = prevItems.filter((item) => !selectedItems.has(item.id));
      console.log("New Cart Items:", newItems); // 새 항목 확인
      return newItems;
    });

    // 삭제 후 선택된 항목 초기화
    setSelectedItems(new Set());
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
        <button className="cancel_all" onClick={handleDeleteSelected}>
          선택상품 삭제
        </button>
      </div>
      <div className="list">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            quantity={itemQuantities[item.id]}
            onQuantityChange={handleQuantityChange}
          />
        ))}
      </div>
      <div className="amount">
        <CartPrice totalPrice={calculateTotalPrice()} />
      </div>
      <div className="pay">
        <div className="pay_member">
          {isLoggedIn ? (
            <>
              <button className="pay_member_yes" onClick={() => handleNavigation("/order")}>
                회원 구매
              </button>
            </>
          ) : (
            <>
              <button className="pay_member_no" onClick={() => handleNavigation("/login")}>
                비회원 구매
              </button>
              <button className="pay_member_yes" onClick={() => handleNavigation("/order")}>
                회원 구매
              </button>
            </>
          )}
        </div>
        <div className="pay_btn">
          <button className="pay_continue" onClick={() => handleNavigation("/")}>
            계속 쇼핑하기
          </button>
        </div>
      </div>
    </div>
  );
};
