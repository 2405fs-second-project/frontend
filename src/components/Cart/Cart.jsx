import React from "react";
import { CartList } from "./CartList.jsx";

import "./Cart.css";

const Cart = () => {
  return (
    <div>
      <div className="cart_page">
        <p>홈,장바구니</p>
      </div>
      <div className="cart_form">
        <CartList />
      </div>
    </div>
  );
};
export default Cart;
