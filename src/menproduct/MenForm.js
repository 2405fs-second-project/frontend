import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MenForm.css";

const MenForm = () => {
  const [products, setProducts] = useState([]);
  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };
  useEffect(() => {
    // 서버에서 제품 목록을 가져오는 함수
    const fetchProducts = async () => {
      try {
        const response = await fetch("/home");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <>
      <div className="container">
        <div className="products">
          {products.map((products, index) => (
            <div className="product_wrapper" key={index}>
              <Link to={`/menproduct/${products.id}`}>
                <img className="product_men_img" src={products.file} alt="사진오류" />
              </Link>
              <div className="product_name">{products.name}</div>
              <div className="product_color_type">{products.color}</div>
              <div className="product_normal_price">₩{formatNumber(products.price)}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MenForm;
