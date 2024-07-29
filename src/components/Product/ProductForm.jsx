import React, { useState } from "react";
//import { ProductContext } from "../../service/ProductService.jsx";
import "./ProductForm.css";

export const ProductForm = () => {
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedKind, setSelectedKind] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [code, setCode] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sizes, setSizes] = useState([{ size: "", stock: "" }]);

  const genderOptions = ["남성", "여성", "악세사리"];
  const kindOptions = [
    "자켓",
    "스웨트",
    "니트",
    "셔츠",
    "티셔츠",
    "바지",
    "반바지",
    "스커트",
    "언더웨어",
    "모자",
    "가방",
    "악세사리",
    "가젯",
  ];

  const handleGenderChange = (e) => setSelectedGender(e.target.value);
  const handleKindChange = (e) => setSelectedKind(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleColorChange = (e) => setColor(e.target.value);
  const handleCodeChange = (e) => setCode(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);

  const handleSizeChange = (index, field, value) => {
    const newSizes = sizes.map((size, i) => {
      if (i === index) {
        return { ...size, [field]: value };
      }
      return size;
    });
    setSizes(newSizes);
  };

  const addSizeField = () => setSizes([...sizes, { size: "", stock: "" }]);

  const handleSubmitClick = (e) => {
    e.preventDefault();

    const productData = {
      gender: selectedGender,
      kind: selectedKind,
      name: name,
      color: color,
      code: code,
      price: price,
      file: file ? file.name : null, // 파일 이름을 JSON에 포함
      description: description,
      endDate: endDate,
      sizes: sizes,
    };

    console.log(JSON.stringify(productData, null, 2));
  };
  return (
    <form className="form_page" onSubmit={handleSubmitClick}>
      <div className="form_group">
        <div className="input_group">
          <div className="input_field">
            <label for="gender_select">대분류</label>
            <select id="gender_select" className="input_select" value={selectedGender} onChange={handleGenderChange}>
              {genderOptions.map((genderOption, index) => (
                <option key={index} value={genderOption}>
                  {genderOption}
                </option>
              ))}
            </select>
          </div>
          <div className="input_field">
            <label for="kind_select">중분류</label>
            <select id="kind_select" className="input_select" value={selectedKind} onChange={handleKindChange}>
              {kindOptions.map((kindOption, index) => (
                <option key={index} value={kindOption}>
                  {kindOption}
                </option>
              ))}
            </select>
          </div>
          <div className="input_field">
            <label for="name">상품명</label>
            <input type="text" className="input_text" value={name} onChange={handleNameChange} id="name" />
          </div>
          <div className="input_field">
            <label for="color">색상</label>
            <input type="text" className="input_text" value={color} onChange={handleColorChange} id="color" />
          </div>
          <div className="input_field">
            <label for="code">상품코드</label>
            <input type="text" className="input_text" value={code} onChange={handleCodeChange} id="code" />
          </div>
          <div className="input_field" id="sizes">
            <label>사이즈별 재고</label>
            {sizes.map((size, index) => (
              <div key={index} className="size_stock_group">
                <input
                  type="text"
                  className="Input_text_size"
                  placeholder="사이즈"
                  value={size.size}
                  onChange={(e) => handleSizeChange(index, "size", e.target.value)}
                />
                <input
                  type="number"
                  className="input_number"
                  placeholder="재고"
                  value={size.stock}
                  onChange={(e) => handleSizeChange(index, "stock", e.target.value)}
                />
              </div>
            ))}
            <button type="button" onClick={addSizeField} className="add_size_btn">
              사이즈 추가
            </button>
          </div>
          <div className="input_field">
            <label for="price">금액</label>
            <input type="text" className="input_text" value={price} onChange={handlePriceChange} id="price" />
          </div>
          <div className="input_field">
            <label for="file">상품이미지</label>
            <input type="file" className="input_file" onChange={handleFileChange} id="file" />
          </div>
          <div className="input_field">
            <label for="description">상세설명</label>
            <textarea
              className="input_textarea"
              value={description}
              onChange={handleDescriptionChange}
              id="description"
            />
          </div>
          <div className="input_field">
            <label for="end_date">판매종료일자</label>
            <input type="date" className="input_date" value={endDate} onChange={handleEndDateChange} id="end_date" />
          </div>
        </div>
      </div>
      <button type="submit" className="submit_btn">
        등록
      </button>
    </form>
  );
};
