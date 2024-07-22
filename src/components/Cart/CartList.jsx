import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CartList.css";
import { CartPrice } from "./CartPrice";
import { CartItem } from "../Cart/CartItem";

export const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [itemQuantities, setItemQuantities] = useState(cartItems.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {}));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * (itemQuantities[item.id] || 1), 0);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };
  const handleSelectAllChange = () => {
    setSelectAll((prevSelectAll) => {
      const newSelectAll = !prevSelectAll;
      if (newSelectAll) {
        // 전체 선택
        const allItemIds = new Set(cartItems.map((item) => item.id));
        setSelectedItems(allItemIds);
      } else {
        // 전체 선택 해제
        setSelectedItems(new Set());
      }
      return newSelectAll;
    });
  };

  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const fetchCartItems = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/cart/items?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }
      const data = await response.json();
      return data; // 데이터 반환
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return []; // 에러 발생 시 빈 배열 반환
    }
  };

  useEffect(() => {
    const loadCartItems = async () => {
      const userId = 1; // 예시 userId
      const result = await fetchCartItems(userId);
      setCartItems(result);
      setItemQuantities(result.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {}));
    };

    loadCartItems();
  }, []);

  const handleQuantityChange = (itemId, value) => {
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: value,
    }));
  };

  const handleDeleteSelected = async () => {
    const selectedIds = Array.from(selectedItems);
    const requestData = {
      ids: selectedIds,
    };
    console.log("Request Data:", JSON.stringify(requestData, null, 2));
    try {
      const response = await fetch("http://localhost:8080/cart/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete selected items");
      }

      // 서버에서 성공적으로 삭제되면 상태를 업데이트
      setCartItems((prevItems) => prevItems.filter((item) => !selectedItems.has(item.id)));
      setSelectedItems(new Set());
      setSelectAll(false); // 전체 선택 체크박스도 해제
    } catch (error) {
      console.error("Error deleting selected items:", error);
    }
  };

  return (
    <div className="cart_form">
      <div className="count">
        <h6 className="count_label">장바구니</h6>
        <div className="count_num">{cartItems.length}</div>
      </div>
      <div className="select">
        <div className="select_all">
          <div className="select_all_box">
            <input type="checkbox" id="checkall" checked={selectAll} onChange={handleSelectAllChange} />
            <label for="checkall">전체선택</label>
          </div>
        </div>
        <button className="cancel_all" onClick={handleDeleteSelected}>
          선택상품 삭제
        </button>
      </div>
      <div className="list">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            quantity={itemQuantities[item.id]}
            onQuantityChange={handleQuantityChange}
            isSelected={selectedItems.has(item.id)}
            onCheckboxChange={handleCheckboxChange}
          />
        ))}
      </div>
      <div className="amount">
        <CartPrice totalPrice={calculateTotalPrice()} />
      </div>
      <div className="pay">
        <div className="pay_member">
          {isLoggedIn ? (
            <>
              <button className="pay_member_yes" onClick={() => handleNavigation("/order")}>
                회원 구매
              </button>
            </>
          ) : (
            <>
              <button className="pay_member_no" onClick={() => handleNavigation("/order")}>
                비회원 구매
              </button>
              <button className="pay_member_yes" onClick={() => handleNavigation("/login")}>
                회원 구매
              </button>
            </>
          )}
        </div>
        <div className="pay_btn">
          <button className="pay_continue" onClick={() => handleNavigation("/")}>
            계속 쇼핑하기
          </button>
        </div>
      </div>
    </div>
  );
};
