import React, { useContext, useState } from "react";
import "./CartItem.css";
import { CartInContext } from "../../service/CartService";
export const CartItem = ({ item, quantity, onQuantityChange, isSelected, onCheckboxChange }) => {
  const { cartItems } = useContext(CartInContext);
  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    onQuantityChange(item.id, newQuantity);
  };
  return (
    <>
      <div className="list">
        {cartItems.length > 0 ? (
          <div>
            {cartItems.map((item, index) => (
              <div key={item.id}>
                <div className="item_rows">
                  <div>
                    <input
                      className="item_check"
                      type="checkbox"
                      id={`checkrow_${item.id}`}
                      checked={isSelected}
                      onChange={onCheckboxChange}
                    ></input>
                    <label for={`checkrow_${item.id}`}></label>
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
                    <label for={`quantity_${item.id}`}>수량:</label>
                    <input
                      type="number"
                      id={`quantity_${item.id}`}
                      value={quantity}
                      onChange={handleQuantityChange}
                    ></input>
                  </div>
                  <div className="item_delete">
                    <button>삭제</button>
                  </div>
                  <div className="item_price">{formatNumber(Number(item.price) * (quantity || 1))} 원</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h4>장바구니에 담은 상품이 없습니다.</h4>
        )}
      </div>
    </>
  );
};
