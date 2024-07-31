import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./ViewForm.css";

const ViewForm = () => {
  const [products, setProducts] = useState([]);
  const gender = new URLSearchParams(useLocation().search).get("gender");

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/product/${gender}`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        // data.content에서 실제 제품 목록을 추출
        const productList = data.content || [];
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // 오류 발생 시 빈 배열로 설정
      }
    };

    if (gender) {
      fetchProducts();
    }
  }, [gender]);

  return (
    <>
      <div className="container">
        <div className="products">
          {products.map((product, index) => (
            <div className="product_wrapper" key={index}>
              <Link to={`/viewdetail/${product.id}`}>
                <img
                  className="product_men_img"
                  src={product.fileUrl}
                  alt="사진오류"
                />
              </Link>
              <div className="product_name">{product.name}</div>
              <div className="product_color_type">{product.color}</div>
              <div className="product_normal_price">
                ₩{formatNumber(product.price)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewForm;
