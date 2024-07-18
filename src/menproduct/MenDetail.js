import React, { useState } from "react";
import "./MenDetail.css";

const MenDetail = () => {
  const MenDetail = [
    {
      id: 1,
      image:
        "https://media.worksout.co.kr/uploads/live/CA24SSTSSS00358011/CA24SSTSSS00358011-1.jpg",
      category: "티셔츠",
      title: "W S/S BLUSH T-SHIRT",
      color: "BLACK",
      product_num: "CA23SSTSSS00002015",
      price: 78000,
      size: "S",
      product_detail:
        "W S/S BLUSH T-SHIRT는 오가닉 코튼100% 싱글 저지 소재의 반팔 티셔츠입니다. 레귤러 핏이며, 정면 가슴에 그래픽 자수가 있습니다. ",
    },
  ];

  const [isExpanded, setIsExpanded] = useState(Array(5).fill(false));
  const [selectedSize, setSelectedSize] = useState(null);

  const handleToggle = (index) => {
    setIsExpanded((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  return (
    <>
      <div className="navbar"></div>
      <div className="wrapper">
        <div className="product_detail">
          {MenDetail.map((product, index) => (
            <div className="product" key={index}>
              <img className="product_image" src={product.image} alt="" />
              <div className="product_info">
                <span className="product_title">{product.title}</span>
                <div className="product_description">
                  {product.color}
                  <br />
                  {product.product_num}
                </div>
                <span className="product_price">₩{product.price}</span>
                <div className="product_guide">
                  사용자 가이드 <br />
                  상품 정보 고시
                </div>
                <div className="size_buttons">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <div
                      key={size}
                      className={`size_button ${
                        selectedSize === size ? "size_button__selected" : ""
                      }`}
                      onClick={() => handleSizeClick(size)}
                    >
                      {size}
                    </div>
                  ))}
                  {selectedSize ? (
                    <div className="action_buttons">
                      <button className="buy_button">구매하기</button>
                      <button className="cart_button">장바구니 담기</button>
                    </div>
                  ) : (
                    <div className="selection_size">사이즈를 선택해주세요</div>
                  )}
                </div>
                <div className="detail">
                  {[
                    "상세정보",
                    "배송안내",
                    "반품안내",
                    "A/S 안내",
                    "세탁 및 취급 시 주의사항",
                  ].map((title, index) => (
                    <div className="detail_item" key={index}>
                      <div
                        className="detail_title"
                        onClick={() => handleToggle(index)}
                        role="button"
                        tabIndex={index}
                      >
                        &gt; {title}
                      </div>
                      <div
                        className="detail_content"
                        style={{
                          display: isExpanded[index] ? "block" : "none",
                        }}
                      >
                        {index === 0 && <>{product.product_detail}</>}
                        {index === 1 && (
                          <>
                            <br />
                            CJ대한통운 (1588-1255) / 우체국 택배 (1588-1300){" "}
                            <br />
                            배송 지역 : 전국 (일부 지역 제외) <br />
                            배송비 : 10만원 이상 구매 시 무료 배송
                            <br />
                            배송 기간 : 평일 오후 2시 이전 결제 완료된
                            <br /> 주문건은 당일 출고되며 배송은 1~3일 정도
                            소요됩니다.
                            <br />
                          </>
                        )}
                        {index === 2 && (
                          <>
                            <br />
                            교환/환불의 경우 모든 상품은 상품을 공급받으신
                            날로부터 <br />
                            7일 이내 신청하시면 기사님께서 빠른 시일 내에
                            수거하실 예정입니다.
                            <br /> 고객님의 단순 변심으로 인한 상품의
                            교환/반품을 요청하시는 경우, <br />
                            택배비용은 고객님 부담이오니 이점 양해 바랍니다.{" "}
                            <br />
                            칼하트 (마이페이지 &gt; 주문 내역 &gt;주문서 상세
                            페이지 조회 &gt; 교환/환불 신청)
                            <br />
                          </>
                        )}
                        {index === 3 && (
                          <>
                            <br />
                            칼하트윕 한국 공식 판매처를 통하여 구입한 모든
                            제품은 <br />
                            A/S를 받으실 수 있습니다.
                            <br />
                          </>
                        )}
                        {index === 4 && (
                          <>
                            <br />
                            제품 혼용율에 따라 세탁 및 취급 유의 사항이 변경될
                            수 있습니다. <br />
                            반드시 부착되어 있는 케어라벨 내용을 확인하신 후
                            세탁하시기 바랍니다. <br />
                            따라서 세탁 시에는 반드시 세탁 및 취급 시 주의사항
                            페이지를 참고 부탁드립니다.
                            <br />
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MenDetail;
