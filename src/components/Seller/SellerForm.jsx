import React, { useState } from "react";
import axios from "axios";
import "./SellerForm.css";

export const SellerForm = () => {
  const [sizes, setSizes] = useState([{ size: "", stock: 0 }]);
  const [file, setFile] = useState(null);
  const [genderOptions, setGenderOptions] = useState(["MALE", "FEMALE", "UNKNOWN"]);
  const [kindOptions, setKindOptions] = useState([
    "jacket",
    "sweater",
    "knit",
    "shirt",
    "t-shirt",
    "pants",
    "shorts",
    "skirt",
    "underwear",
    "hat",
    "bag",
    "accessories",
    "wallet",
  ]);
  const [data, setData] = useState({
    gender: genderOptions[0],
    kind: kindOptions[0],
    end_date: new Date().toLocaleDateString("en-CA"),
    sizesStock: {},
    price: 0,
  });

  const addSizeField = () => {
    setSizes([...sizes, { size: "", stock: 0 }]);
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // 선택한 파일을 상태에 저장
  };

  const DataChange = (e) => {
    const { id, value } = e.target;
    const index = parseInt(id.split("-")[1]);

    if (id.startsWith("size-")) {
      // 사이즈 입력 필드 변경
      setSizes((prevSizes) => {
        const updatedSizes = [...prevSizes];
        updatedSizes[index].size = value;
        return updatedSizes;
      });

      setData((prevdata) => {
        const updatedSizesStock = { ...prevdata.sizesStock };
        // 사이즈와 재고를 매칭하기 위해 현재 재고 값을 유지합니다.
        const currentStock = prevdata.sizesStock[prevdata.currentSize] || 0;
        if (value in updatedSizesStock) {
          updatedSizesStock[value] = currentStock;
        }
        return { ...prevdata, sizesStock: updatedSizesStock, currentSize: value };
      });
    } else if (id.startsWith("stock-")) {
      // 재고 입력 필드 변경
      setSizes((prevSizes) => {
        const updatedSizes = [...prevSizes];
        updatedSizes[index].stock = value;
        return updatedSizes;
      });

      setData((prevdata) => {
        const updatedSizesStock = { ...prevdata.sizesStock };
        const size = sizes[index].size;
        if (size) {
          updatedSizesStock[size] = Number(value) || 0;
        }
        return { ...prevdata, sizesStock: updatedSizesStock };
      });
    } else {
      // 기타 입력 필드 변경
      setData({
        ...data,
        [id]: value,
      });
    }
  };
  // 폼 제출 핸들러
  const dataSubmit = async (e) => {
    e.preventDefault();
    const sendata = {
      gender: data.gender,
      kind: data.kind,
      name: data.name,
      color: data.color,
      fullname: data.fullname,
      code: data.code,
      delisteddate: data.end_date,
      price: Number(data.price),
      sizesStock: data.sizesStock,
      description: data.description,
    };

    const formData = new FormData();
    if (file) {
      formData.append("productfile", file);
    } else {
      console.error("파일이 선택되지 않았습니다.");
      alert("파일을 선택해주세요.");
      return;
    }

    try {
      formData.append(`productinfo`, new Blob([JSON.stringify(sendata)], { type: "application/json" }));
      const response = await axios.post("http://localhost:8081/api/sale/9/insert", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      alert("처리 성공");
    } catch (error) {
      console.error("JSON 데이터를 Blob으로 변환하는 중 오류 발생:", error);
      alert("데이터를 처리하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <form className="form_page" onSubmit={dataSubmit}>
      <div className="form_group">
        <div className="input_group">
          <div className="input_field">
            <label for="gender">대분류</label>
            <select id="gender" className="input_select" onChange={DataChange} value={data.gender}>
              {genderOptions.map((genderOption, index) => (
                <option key={index} value={genderOption}>
                  {genderOption}
                </option>
              ))}
            </select>
          </div>
          <div className="input_field">
            <label for="kind">중분류</label>
            <select id="kind" className="input_select" onChange={DataChange} value={data.kind}>
              {kindOptions.map((kindOption, index) => (
                <option key={index} value={kindOption}>
                  {kindOption}
                </option>
              ))}
            </select>
          </div>
          <div className="input_field">
            <label for="name">상품명</label>
            <input type="text" className="input_text" id="name" onChange={DataChange} />
          </div>
          <div className="input_field">
            <label for="color">색상</label>
            <input type="text" className="input_text" id="color" onChange={DataChange} />
          </div>
          <div className="input_field">
            <label for="fullname">풀네임</label>
            <input type="text" className="input_text" id="fullname" onChange={DataChange} />
          </div>
          <div className="input_field">
            <label for="code">상품코드</label>
            <input type="text" className="input_text" id="code" onChange={DataChange} />
          </div>
          <div className="input_field" id="sizesStock">
            <label>사이즈별 재고</label>
            {sizes.map((size, index) => (
              <div key={index} className="size_stock_group">
                <input
                  type="text"
                  className="Input_text_size"
                  placeholder="사이즈"
                  id={`size-${index}`}
                  onChange={DataChange}
                  value={sizes.size}
                />
                <input
                  type="number"
                  className="input_number"
                  placeholder="재고"
                  id={`stock-${index}`}
                  onChange={DataChange}
                  value={sizes.stock}
                />
              </div>
            ))}
          </div>
          <div className="input_field">
            <button type="button" className="add_size_btn" onClick={addSizeField}>
              사이즈 추가
            </button>
          </div>
          <div className="input_field">
            <label for="price">금액</label>
            <input type="text" className="input_text" id="price" onChange={DataChange} />
          </div>
          <div className="input_field">
            <input type="file" className="input_file" onChange={handleFileChange} />
          </div>
          <div className="input_field">
            <label for="description">상세설명</label>
            <textarea className="input_textarea" id="description" onChange={DataChange} />
          </div>
          <div className="input_field">
            <label for="end_date">판매종료일자</label>
            <input type="date" className="input_date" id="end_date" onChange={DataChange} />
          </div>
        </div>
      </div>
      <button type="submit" className="submit_btn" id="send">
        등록
      </button>
    </form>
  );
};
