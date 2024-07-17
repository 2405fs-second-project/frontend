import React from "react";
import { CartList } from "../components/CartList.jsx";
import "./Cart.css";

const Cart = () => {
  let cart_page = "홈,장바구니";
  return (
    <main>
      <div className="cart_page">
        <p>{cart_page}</p>
      </div>
      <div className="cart_form">
        <CartList />
      </div>
    </main>
  );
};
export default Cart;
