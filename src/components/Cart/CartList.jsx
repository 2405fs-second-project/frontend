import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CartList.css";
import { CartPrice } from "./CartPrice";
import { CartItem } from "../Cart/CartItem";
import { useAuth } from "../../context/AuthContext"; // useAuth를 추가하여 로그인 상태 확인

export const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [itemQuantities, setItemQuantities] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth(); // useAuth에서 사용자 정보 가져오기

  useEffect(() => {
    // `user`가 null일 때 로딩을 방지
    if (!user || !user.id) {
      console.error("User is not logged in or user ID is missing");
      return;
    }

    console.log("User from useAuth:", user); // 디버깅 로그
    const loadCartItems = async () => {
      const userId = user.id; // 예시 userId
      const result = await fetchCartItems(userId);
      setCartItems(result);
      setItemQuantities(result.reduce((acc, item) => ({ ...acc, [item.id]: item.itemQuantity }), {}));
    };

    loadCartItems();
  }, [user]); // user가 업데이트될 때만 실행

  // 장바구니 아이템 가져오는 api
  const fetchCartItems = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8081/api/cart/items/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorDetails = await response.text(); // 응답 본문을 텍스트로 읽기
        console.error(`Error status: ${response.status}, Details: ${errorDetails}`);
        throw new Error("Failed to fetch cart items");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching cart items:", error.message);
      return [];
    }
  };

  // 네비게이션 핸들러
  const handleNavigation = () => {
    if (user) {
      navigate("/order", { state: { userId: user.id } });
    } else {
      navigate("/login");
    }
  };

  // 전체 선택 핸들러
  const handleSelectAllChange = () => {
    setSelectAll((prevSelectAll) => {
      const newSelectAll = !prevSelectAll;
      const allItemIds = new Set(cartItems.map((item) => item.id));
      setSelectedItems(newSelectAll ? allItemIds : new Set());
      console.log("Selected item IDs:", Array.from(newSelectAll));
      return newSelectAll;
    });
  };

  // 체크박스 변경 핸들러
  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      console.log("Selected item IDs:", Array.from(newSet));
      return newSet;
    });
  };

  // 선택된 아이템 삭제 핸들러
  const handleDeleteSelected = async () => {
    const selectedIds = Array.from(selectedItems).map((id) => ({ id }));
    try {
      const response = await fetch("http://localhost:8081/api/cart/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedIds), // 배열 형태로 전송
      });

      if (!response.ok) {
        throw new Error("Failed to delete selected items");
      }

      setCartItems((prevItems) => prevItems.filter((item) => !selectedItems.has(item.id)));
      setSelectedItems(new Set());
      setSelectAll(false);
    } catch (error) {
      console.error("Error deleting selected items:", error);
    }
  };
  // 총 상품 가격 합계 계산
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.itemPrice * (itemQuantities[item.id] || 1), 0);
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
            <label htmlFor="checkall">전체선택</label>
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
            quantity={[item.id, itemQuantities[item.id]]}
            isSelected={selectedItems.has(item.id)}
            onCheckboxChange={handleCheckboxChange}
            deleteCartItem={handleDeleteSelected}
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
              {/* <button
                className="pay_member_no"
                onClick={() => handleNavigation("/order")}
              >
                비회원 구매
              </button> */}
              <button className="pay_member_yes" onClick={() => handleNavigation("/login")}>
                구매하기
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
