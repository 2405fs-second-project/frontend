import React, { useState, useEffect } from "react";
import "./CartItem.css";

export const CartItem = ({
  item,
  quantity,
  onQuantityChange,
  isSelected,
  onCheckboxChange,
}) => {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const deleteCartItem = () => {};
  // 컴포넌트 마운트 시 초기 수량 설정
  useEffect(() => {
    setCurrentQuantity(quantity); // 전달받은 초기 quantity 설정
  }, [quantity]);

  // 수량 변경 핸들러
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);

    // 유효하지 않은 수량 처리
    if (isNaN(newQuantity) || newQuantity <= 0) {
      return;
    }

    // 상태 업데이트 (최적화를 위해 바로 업데이트)
    setCurrentQuantity(newQuantity);

    // 서버에 수량 변경 요청 보내기
    fetch("http://localhost:8081/cart/updateQuantity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemId: item.id,
        quantity: newQuantity,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update quantity");
        }
        return response.json(); // 서버에서 업데이트된 아이템을 반환
      })
      .then((updatedCartItem) => {
        // 서버에서 반환한 수량으로 상태 업데이트
        if (updatedCartItem && updatedCartItem.quantity !== undefined) {
          onQuantityChange(item.id, updatedCartItem.quantity); // 부모 컴포넌트에 변경 사항 알림
        } else {
          console.error("Invalid data structure received:", updatedCartItem);
        }
      })
      .catch((error) => {
        console.error("Error updating quantity:", error);
      });
  };

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
        <label htmlFor={`quantity_${item.id}`}>수량:</label>
        <input
          type="number"
          id={`quantity_${item.id}`}
          value={currentQuantity} // 현재 수량으로 수정
          onChange={handleQuantityChange}
        />
      </div>
      <div className="item_delete">
        <button onChange={deleteCartItem}>삭제</button>
      </div>
      <div className="item_price">{item.itemPrice * currentQuantity} 원</div>
    </div>
  );
};
