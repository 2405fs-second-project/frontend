import React, { useState, useEffect } from "react";
import "./SellerList.css";
export const SellerList = () => {
  // products 상태를 정의하고 초기값을 빈 배열로 설정
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/sale/9");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <table className="list_container">
        <thead>
          <tr>
            <th>대분류</th>
            <th>중분류</th>
            <th>상품명</th>
            <th>색상</th>
            <th>상품명(KR)</th>
            <th>상품코드</th>
            <th>수량</th>
            <th>금액</th>
            <th>상품 이미지</th>
          </tr>
        </thead>
        <tbody className="list-body">
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.gender}</td>
                <td>{product.kind}</td>
                <td>{product.name}</td>
                <td>{product.color}</td>
                <td>{product.fullname}</td>
                <td>{product.code}</td>
                <td>{product.stock}</td>
                <td>{product.price}</td>
                <td>
                  {product.fileurl && (
                    <img src={product.fileurl} alt={product.name} style={{ maxWidth: "100px", maxHeight: "100px" }} />
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr tr key="no-products">
              <td colSpan="9">No products available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
