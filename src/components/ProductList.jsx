import React, { useState } from "react";
import "../assets/css/ProductList.css";
export const ProductList = ({ products }) => {
  return (
    <div>
      <h2>제출된 제품 목록</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <strong>성별:</strong> {product.gender}, <strong>종류:</strong> {product.kind}, <strong>이름:</strong>{" "}
            {product.name}, <strong>색상:</strong> {product.color}, <strong>풀네임:</strong> {product.full_name},{" "}
            <strong>코드:</strong> {product.code}, <strong>재고:</strong> {product.stock}
          </li>
        ))}
      </ul>
    </div>
  );
};
