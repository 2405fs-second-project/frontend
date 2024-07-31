import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./ViewForm.css";

const ViewForm = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const gender = new URLSearchParams(useLocation().search).get("gender");
  const searchQuery = new URLSearchParams(useLocation().search).get("search");

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `/api/product/${gender}`;
        if (searchQuery) {
          url = `/api/product/search?name=${encodeURIComponent(searchQuery)}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        // Ensure data is an array
        const productList = Array.isArray(data) ? data : data.content || [];
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Set to empty array on error
      }
    };

    if (gender || searchQuery) {
      fetchProducts();
    }
  }, [gender, searchQuery]);

  return (
    <>
      <div className="container">
        <div className="products">
          {products.map((product, index) => (
            <div className="product_wrapper" key={index}>
              <Link to={`/viewdetail/${product.id}`}>
                <img className="product_men_img" src={product.fileUrl} alt="사진오류" />
              </Link>
              <div className="product_name">{product.name}</div>
              <div className="product_color_type">{product.color}</div>
              <div className="product_normal_price">₩{formatNumber(product.price)}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewForm;
