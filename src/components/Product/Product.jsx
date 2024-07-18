import React from "react";
import { ProductProvider } from "./service/ProductService.jsx";
import { ProductForm } from "./ProductForm";
import { ProductList } from "./ProductList";
import "./Product.css";

const Product = () => {
  let product_page = "홈,상품등록/조회";

  return (
    <div>
      <ProductProvider>
        <div className="product_page">
          <p>{product_page}</p>
        </div>
        <div className="product_form">
          <div className="product_in">
            <h6 className="product_title">상품등록</h6>
            <div className="product_input">
              <ProductForm />
            </div>
          </div>
          <div className="product_search">
            <h6 className="product_title">상품조회</h6>
            <div className="product_list">
              <ProductList />
            </div>
          </div>
        </div>
      </ProductProvider>
    </div>
  );
};
export default Product;
