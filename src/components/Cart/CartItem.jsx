import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CartItem.css";

export const CartItem = ({ item, quantity, isSelected, onCheckboxChange, deleteCartItem }) => {
  const [id, initialQuantity] = quantity;
  const [itemQuantity, setItemQuantity] = useState(initialQuantity || 0);

  // 수량 증가 함수
  const handleIncrease = () => {
    setItemQuantity((prev) => prev + 1); // 상태 업데이트는 이전 상태를 기반으로 합니다.
  };

  // 수량 감소 함수
  const handleDecrease = () => {
    setItemQuantity((prev) => Math.max(prev - 1, 1)); // 최소값 1로 설정
  };

  // 수량 직접 입력 시 처리 함수
  const handleChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setItemQuantity(value);
    }
  };
  // itemQuantity가 변경될 때마다 API에 PUT 요청을 보냅니다.
  useEffect(() => {
    const updateQuantity = async () => {
      try {
        await axios.put("http://localhost:8081/api/cart/quantity", {
          id: id,
          itemQuantity: itemQuantity,
        });
        console.log(`Successfully updated quantity to ${itemQuantity}`);
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    };

    // 상태가 변경될 때마다 API 요청을 보냅니다.
    updateQuantity();
  }, [itemQuantity, id]); // itemQuantity 또는 id가 변경될 때마다 호출됩니다.

  return (
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
      <img className="item_file" src={`${item.itemUrl}`} alt="사진오류" />
      <div className="item_des">
        <div className="item_des_bold">
          <div className="item_title">{item.itemName}</div>
        </div>
        <div className="item_des_thin">
          <div className="item_color">{item.itemColor},</div>
          <div className="item_size">사이즈 {item.itemSize}</div>
        </div>
      </div>
      <div className="item_quantity">
        <label for={id}>수량:</label>
        <button type="button" onClick={handleDecrease}>
          -
        </button>
        <input type="number" id={id} value={itemQuantity} onChange={handleChange} min="1" />
        <button type="button" onClick={handleIncrease}>
          +
        </button>
      </div>
      <div className="item_delete">
        <button onClick={deleteCartItem}>삭제</button>
      </div>
      <div className="item_price">{new Intl.NumberFormat().format(item.itemPrice * itemQuantity)} 원</div>
    </div>
  );
};
