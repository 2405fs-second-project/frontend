// productservice.js
import React, { useState, createContext, useRef } from "react";

// Context 생성
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const gender_options = ["남성", "여성", "악세사리"];
  const kind_options = [
    "자켓",
    "스웨트",
    "니트",
    "셔츠",
    "티셔츠",
    "바지",
    "반바지",
    "언더웨어",
  ];

  const [selectedGender, setSelectedGender] = useState(gender_options[0]);
  const [selectedKind, setSelectedKind] = useState(kind_options[0]);
  const [submittedProducts, setSubmittedProducts] = useState([]);

  const nameRef = useRef();
  const colorRef = useRef();
  const fullNameRef = useRef();
  const codeRef = useRef();
  const stockRef = useRef();
  const priceRef = useRef();
  const fileRef = useRef();

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleKindChange = (event) => {
    setSelectedKind(event.target.value);
  };

  const handleSubmitClick = () => {
    // 필수 입력 필드들이 비어있는지 확인
    if (
      !selectedGender ||
      !selectedKind ||
      !nameRef.current.value ||
      !colorRef.current.value ||
      !fullNameRef.current.value ||
      !codeRef.current.value ||
      !stockRef.current.value ||
      !priceRef.current.value ||
      !fileRef.current.files[0]
    ) {
      // 필수 입력 필드가 하나라도 비어있으면 알림창 표시
      alert("모든 필드를 입력해주세요.");
      return; // 함수 종료
    }
    // FormData 객체 생성
    const formData = new FormData();
    formData.append("category_gender", selectedGender);
    formData.append("category_kind", selectedKind);
    formData.append("name", nameRef.current.value);
    formData.append("color", colorRef.current.value);
    formData.append("fullname", fullNameRef.current.value);
    formData.append("code", codeRef.current.value);
    formData.append("stock", stockRef.current.value);
    formData.append("price", priceRef.current.value);
    formData.append("file", fileRef.current.files[0]);

    // FormData의 모든 키-값 쌍을 콘솔에 출력
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    fetch("http://localhost:8080/products/post", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setSubmittedProducts([
          ...submittedProducts,
          {
            category_gender: selectedGender,
            category_kind: selectedKind,
            name: nameRef.current.value,
            color: colorRef.current.value,
            fullname: fullNameRef.current.value,
            code: codeRef.current.value,
            stock: stockRef.current.value,
            price: priceRef.current.value,
            file: fileRef.current.files[0].name, // 파일 이름을 저장
          },
        ]);
        // 입력 필드 초기화
        nameRef.current.value = "";
        colorRef.current.value = "";
        fullNameRef.current.value = "";
        codeRef.current.value = "";
        stockRef.current.value = "";
        priceRef.current.value = "";
        fileRef.current.value = null;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <ProductContext.Provider
      value={{
        selectedGender,
        handleGenderChange,
        gender_options,
        selectedKind,
        handleKindChange,
        kind_options,
        submittedProducts,
        handleSubmitClick,
        nameRef,
        colorRef,
        fullNameRef,
        codeRef,
        stockRef,
        priceRef,
        fileRef,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
