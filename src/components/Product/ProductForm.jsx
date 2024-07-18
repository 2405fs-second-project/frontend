import React, { useContext } from "react";
import { ProductContext } from "../../service/ProductService.jsx";
import "./ProductForm.css";

export const ProductForm = () => {
  const {
    selectedGender,
    handleGenderChange,
    gender_options,
    selectedKind,
    handleKindChange,
    kind_options,
    handleSubmitClick,
    nameRef,
    colorRef,
    fullNameRef,
    codeRef,
    stockRef,
    priceRef,
    fileRef,
  } = useContext(ProductContext);

  return (
    <div className="form_page">
      <div className="form_group">
        <div className="label_group">
          <div className="label">
            <label for="gender_select">대분류</label>
          </div>
          <div className="label">
            <label for="kind_select">중분류</label>
          </div>
          <div className="label">
            <label for="name">상품명</label>
          </div>
          <div className="label">
            <label for="color">색상</label>
          </div>
          <div className="label">
            <label for="full_name">상품명(KR)</label>
          </div>
          <div className="label">
            <label for="code">상품코드</label>
          </div>
          <div className="label">
            <label for="stock">수량</label>
          </div>
          <div className="label">
            <label for="price">금액</label>
          </div>
          <div className="label">
            <label for="file">상품이미지</label>
          </div>
        </div>
        <div className="input_group">
          <div>
            <select id="gender_select" className="input_select" value={selectedGender} onChange={handleGenderChange}>
              {gender_options.map((gender_option, index) => (
                <option key={index} value={gender_option}>
                  {gender_option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select id="kind_select" className="input_select" value={selectedKind} onChange={handleKindChange}>
              {kind_options.map((kind_option, index) => (
                <option key={index} value={kind_option}>
                  {kind_option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <input type="text" className="input_text" ref={nameRef} id="name" />
          </div>
          <div>
            <input type="text" className="input_text" ref={colorRef} id="color" />
          </div>
          <div>
            <input type="text" className="input_text" ref={fullNameRef} id="full_name" />
          </div>
          <div>
            <input type="text" className="input_text" ref={codeRef} id="code" />
          </div>
          <div>
            <input type="number" className="input_number" ref={stockRef} id="stock" />
          </div>
          <div>
            <input type="text" className="input_text" ref={priceRef} id="price" />
          </div>
          <div>
            <input type="file" className="input_file" ref={fileRef} id="file" />
          </div>
        </div>
      </div>
      <button className="submit_btn" onClick={handleSubmitClick}>
        등록
      </button>
    </div>
  );
};
