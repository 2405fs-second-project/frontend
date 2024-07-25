import React from "react";
import { CartList } from "./CartList.jsx";

import "./Cart.css";

const Cart = () => {
  let cart_page = "홈,장바구니";
  return (
    <div>
      <div className="cart_page">
        <p>{cart_page}</p>
      </div>
      <div className="cart_form">
        <CartList />
      </div>
    </div>
  );
};
export default Cart;
