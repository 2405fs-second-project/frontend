import React from "react";
import "./CartItem.css";
export const CartItem = ({ item, quantity, onQuantityChange, isSelected, onCheckboxChange }) => {
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      onQuantityChange(item.id, newQuantity);
    } else {
      onQuantityChange(item.id, 1); // 기본값 1
    }
  };

  return (
    <>
      <div className="item_rows">
        <div>
          <input
            className="item_check"
            type="checkbox"
            id={`checkrow_${item.id}`}
            checked={isSelected}
            onChange={() => onCheckboxChange(item.id)}
          />
          <label for={`checkrow_${item.id}`}></label>
        </div>
        <img className="item_file" src={`/${item.fileUrl}`} alt="사진오류" />
        <div className="item_des">
          <div className="item_des_bold">
            <div className="item_title">{item.name}</div>
          </div>
          <div className="item_des_thin">
            <div className="item_color">{item.color},</div>
            <div className="item_size">사이즈 {item.size}</div>
          </div>
        </div>
        <div className="item_quantity">
          <label for={`quantity_${item.id}`}>수량:</label>
          <input type="number" id={`quantity_${item.id}`} value={item.quantity} onChange={handleQuantityChange} />
        </div>
        <div className="item_delete">
          <button>삭제</button>
        </div>
        <div className="item_price">{new Intl.NumberFormat().format(item.price * (quantity || 1))} 원</div>
      </div>
    </>
  );
};
