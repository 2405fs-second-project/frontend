import React, { useState, useRef } from "react";
import { ProductList } from "../components/ProductList.jsx";
import { submitProduct } from "../service/ProductSubmit.jsx";
import "./Product.css";

const Product = () => {
  let product_page = "홈,상품등록";
  const gender_options = ["남성", "여성"];
  const kind_options = ["자켓", "스웨트", "니트", "셔츠", "티셔츠", "바지", "반바지", "언더웨어"];
  const [selectedGender, setSelectedGender] = useState(gender_options[0]);
  const [selectedKind, setSelectedKind] = useState(kind_options[0]);
  const [submittedProducts, setSubmittedProducts] = useState([]);
  const nameRef = useRef(null);
  const colorRef = useRef(null);
  const fullNameRef = useRef(null);
  const codeRef = useRef(null);
  const stockRef = useRef(null);
  const fileRef = useRef(null);
  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };
  const handleKindChange = (event) => {
    setSelectedKind(event.target.value);
  };
  const handleSubmitClick = () => {
    const formData = {
      gender: selectedGender,
      kind: selectedKind,
      name: nameRef.current.value,
      color: colorRef.current.value,
      full_name: fullNameRef.current.value,
      code: codeRef.current.value,
      stock: stockRef.current.value,
      file: fileRef.current.files[0], // 파일 업로드 처리는 별도의 로직이 필요합니다.
    };

    console.log(formData); // 폼 데이터 확인용
    submitProduct(selectedGender, selectedKind, formData);
    // 제출된 제품 정보를 상태에 추가
    setSubmittedProducts([...submittedProducts, formData]);

    // 입력 필드 초기화
    nameRef.current.value = "";
    colorRef.current.value = "";
    fullNameRef.current.value = "";
    codeRef.current.value = "";
    stockRef.current.value = "";
    fileRef.current.value = null; // 파일 입력 필드 초기화 (옵셔널)
  };

  return (
    <main>
      <div className="product_page">
        <p>{product_page}</p>
      </div>
      <div className="product_form">
        <div className="product_input">
          <form>
            gender :
            <select id="gender_select" value={selectedGender} onChange={handleGenderChange}>
              {gender_options.map((gender_options, index) => (
                <option key={index} value={gender_options}>
                  {gender_options}
                </option>
              ))}
            </select>
            <br />
            kind :
            <select id="kind_select" value={selectedKind} onChange={handleKindChange}>
              {kind_options.map((kind_options, index) => (
                <option key={index} value={kind_options}>
                  {kind_options}
                </option>
              ))}
            </select>{" "}
            <br />
            name : <input type="text" ref={nameRef} id="name" /> <br />
            color : <input type="text" ref={colorRef} id="color" /> <br />
            full_name : <input type="text" ref={fullNameRef} id="full_name" /> <br />
            code : <input type="text" ref={codeRef} id="code" /> <br />
            stock : <input type="number" ref={stockRef} id="stock" /> <br />
            file : <input type="file" ref={fileRef} id="file" /> <br />
            <input type="button" value="등록" onClick={handleSubmitClick} />
            <br />
          </form>
        </div>
        <div className="product_list">
          <ProductList products={submittedProducts} />
        </div>
      </div>
    </main>
  );
};
export default Product;
