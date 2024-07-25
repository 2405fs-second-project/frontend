import React from "react";
import "./CartPrice.css";

export const CartPrice = ({ totalPrice }) => {
  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  // 배송비 계산 함수
  const calculateShippingCost = (price) => {
    const freeShippingThreshold = 100000; // 10만원
    const standardShippingCost = 3000; // 3,000원

    return price >= freeShippingThreshold ? 0 : standardShippingCost;
  };

  // 배송비 계산
  const shippingCost = calculateShippingCost(totalPrice);
  return (
    <div className="amount_total">
      <div className="amount_total_label">
        <p>총 주문금액</p>
        <p>배송비</p>
        <p className="font_bold_total">총 주문금액</p>
      </div>
      <div className="amount_total_price">
        <p className="font_bold">
          {formatNumber(totalPrice)} {"원"}
        </p>
        <p className="font_bold">
          {formatNumber(shippingCost)} {"원"}
        </p>
        <p className="font_bold_total">
          {formatNumber(totalPrice + shippingCost)} {"원"}
        </p>
      </div>
    </div>
  );
};
