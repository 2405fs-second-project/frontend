import React, { useState, createContext, useEffect } from "react";

export const CartInContext = createContext();

export const CartInProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 로컬 스토리지에서 장바구니 아이템 불러오기
  const loadCartItems = () => {
    const storedItems = localStorage.getItem("cartItems");
    return storedItems ? JSON.parse(storedItems) : [];
  };

  // 로컬 스토리지에 장바구니 아이템 저장하기
  const saveCartItems = (items) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  // 장바구니 아이템을 상태와 로컬 스토리지에 동기화
  useEffect(() => {
    const initialItems = loadCartItems();
    setCartItems(initialItems);
  }, []);

  // 장바구니에 아이템 추가
  const addToCart = async (item) => {
    try {
      // API를 통해 장바구니에 아이템 추가 시도
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      // 응답 상태가 실패일 경우 에러 처리
      if (!response.ok) {
        let errorMessage = "장바구니 추가에 실패했습니다.";
        try {
          // 응답 본문을 JSON으로 파싱 시도
          const errorData = await response.json();
          errorMessage = `장바구니 추가에 실패했습니다: ${errorData.message}`;
        } catch (jsonError) {
          // JSON 파싱에 실패할 경우 텍스트로 읽기
          errorMessage = `장바구니 추가에 실패했습니다: 응답 본문을 읽는 중 오류가 발생했습니다.`;
        }
        console.error("장바구니 추가 실패:", response.status, errorMessage);
        throw new Error(errorMessage);
      }

      // 서버에 성공적으로 추가되면 상태 업데이트
      setCartItems((prevItems) => {
        const updatedItems = [...prevItems, item];
        saveCartItems(updatedItems); // 로컬 스토리지에 저장
        return updatedItems;
      });

      console.log("장바구니에 상품 추가 성공");
    } catch (error) {
      // 서버가 꺼져 있는 경우, 로컬 스토리지에 저장
      const updatedItems = [...cartItems, item];
      saveCartItems(updatedItems); // 로컬 스토리지에 저장
      setCartItems(updatedItems);
      console.error("장바구니 추가 오류:", error.message);
    }
  };

  return <CartInContext.Provider value={{ cartItems, addToCart }}>{children}</CartInContext.Provider>;
};
