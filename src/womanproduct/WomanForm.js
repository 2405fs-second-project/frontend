import React from "react";
import { Link } from "react-router-dom";
import "./WomanForm.css";

const WomanForm = () => {
  const products = [
    {
      id: 1,
      image:
        "https://media.worksout.co.kr/uploads/live/CA24SSTSSS00358011/CA24SSTSSS00358011-1.jpg",
      category: "티셔츠",
      title: "W S/S BLUSH T-SHIRT",
      color: "BLACK/WHITE",
      product_num: "CA23SSTSSS00002015",
      price: 780_000,
      size: "S",
      product_detail:
        "W S/S BLUSH T-SHIRT는 오가닉 코튼100% 싱글 저지 소재의 반팔 티셔츠입니다. 레귤러 핏이며, 정면 가슴에 그래픽 자수가 있습니다. ",
    },
  ];
  return (
    <>
      <div className="container">
        <div className="products">
          {products.map((products, index) => (
            <div className="product_wrapper" key={index}>
              <Link to="/womandetail">
                <img className="product_img" src={products.image} alt="" />
              </Link>
              <div className="product_name">{products.title}</div>
              <div className="product_color_type">{products.color}</div>
              <div className="product_normal_price">{products.price}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WomanForm;
