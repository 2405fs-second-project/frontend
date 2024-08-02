import React from "react";
import { SellerForm } from "./SellerForm.jsx";
import { SellerList } from "./SellerList.jsx";
import "./Seller.css";

const Seller = () => {
  return (
    <div>
      <div className="product_page">
        <p>홈,상품등록/조회</p>
      </div>
      <div className="product_form">
        <div className="product_in">
          <h6 className="product_title">상품등록</h6>
          <div className="product_input">
            <SellerForm />
          </div>
        </div>
        <div className="product_search">
          <h6 className="product_title">상품조회</h6>
          <div className="product_list">
            <SellerList />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Seller;
