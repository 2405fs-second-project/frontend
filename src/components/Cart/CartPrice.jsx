import React from "react";
import "./CartPrice.css";

export const CartPrice = () => {
  return (
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
    </div>
  );
};
