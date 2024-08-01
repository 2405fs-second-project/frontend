import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./ProductForm.css";

const ProductForm = () => {
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
        let url;

        // 수정된 부분: searchQuery로 검색 쿼리를 처리하고, gender에 따른 필터링도 지원
        if (searchQuery) {
          url = `/api/product/search?searchQuery=${encodeURIComponent(searchQuery)}`;
        } else if (gender) {
          url = `/api/product/${gender}`;
        } else {
          return;
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

    // 수정된 부분: gender나 searchQuery가 있을 경우에만 fetchProduct를 호출
      fetchProducts();
  }, [gender, searchQuery]);

  return (
    <>
      <div className="container">
        {products.length === 0 ? (
          <div className="no_products_message">
            검색된 상품이 없습니다.
            </div>
        ) : (
        <div className="products">
          {products.map((product, index) => (
            <div className="product_wrapper" key={index}>
              <Link to={`/productdetail/${product.id}`}>
                <img className="product_men_img" src={product.fileUrl} alt="사진오류" />
              </Link>
              <div className="product_name">{product.name}</div>
              <div className="product_color_type">{product.color}</div>
              <div className="product_normal_price">₩{formatNumber(product.price)}</div>
            </div>
          ))}
        </div>
        )}
      </div>
    </>
  );
};

export default ProductForm;
