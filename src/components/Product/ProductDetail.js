import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; //주은추가
import "./ProductDetail.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const [isExpanded, setIsExpanded] = useState(Array(5).fill(false));
  const [selectedSize, setSelectedSize] = useState(null);
  const { id } = useParams();
  const { user } = useAuth(); //주은추가
  const userId = user ? user.id : null; // 사용자 ID 설정
  const [productdetail, setProductdetail] = useState(null);
  const navigate = useNavigate(); // useNavigate 추가
  const formatNumber = (number) => {
    console.log(number); // 디버깅을 위해 숫자 출력
    return new Intl.NumberFormat().format(number);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`/api/product/detail/${id}`);
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          const product = data[0];
          // sizes를 배열로 변환
          const sizesArray = convertSizesToArray(product.sizes);
          // 변환된 배열을 product 객체에 추가
          setProductdetail({ ...product, sizes: sizesArray });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const convertSizesToArray = (sizes) => {
    return Object.entries(sizes).map(([id, size]) => ({
      id: parseInt(id), // 키를 정수로 변환
      size: size,
    }));
  };

  const handleToggle = (index) => {
    setIsExpanded((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  const handleSizeClick = (sizeId) => {
    setSelectedSize(sizeId);
  };

  const handleCartInClick = async () => {
    if (userId == null) {
      alert(`로그인을 해주세요! 현재 userID는 ${userId}입니다.`);
    } else {
      const data = {
        usersid: userId,
        itemSizeid: selectedSize,
      };

      try {
        const response = await axios.post(
          "http://localhost:8081/api/cart/add",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        alert("장바구니에 담겼습니다.");
      } catch (error) {
        console.log(data);
        console.error("장바구니에 담는 중 오류 발생:", error);
        alert("장바구니에 담는 중 오류가 발생했습니다.");
      }
    }
  };

  const handleBuyClick = () => {
    if (productdetail && selectedSize !== null) {
      const sizeString = productdetail.sizes.find(
        (size) => size.id === selectedSize
      )?.size;

      if (sizeString) {
        navigate(
          `/buyorder/${userId}/${
            productdetail.productId
          }?size=${encodeURIComponent(sizeString)}`
        );
      } else {
        alert("선택한 사이즈가 올바르지 않습니다.");
      }
    } else {
      alert("사이즈를 선택해 주세요.");
    }
  };

  if (!productdetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="wrapper">
      <div className="product_detail">
        <div className="product">
          <img
            className="product_image"
            src={productdetail.fileUrl} // URL 조정 필요
            alt={productdetail.name}
          />
          <div className="product_info">
            <span className="product_title">{productdetail.name}</span>
            <div className="product_description">
              {productdetail.color}
              <br />
              {productdetail.fullname}
              <br />
              {productdetail.code}
            </div>
            <span className="product_price">
              ₩ {formatNumber(productdetail.price)}
            </span>
            <div className="product_guide">
              사용자 가이드 <br />
              상품 정보 고시
            </div>
            <div className="size_buttons">
              {productdetail.sizes.map(({ id, size }) => (
                <div
                  key={id}
                  className={`size_button ${
                    selectedSize === id ? "size_button__selected" : ""
                  }`}
                  onClick={() => handleSizeClick(id)}
                >
                  {size}
                </div>
              ))}
              {selectedSize ? (
                <div className="action_buttons">
                  <button className="buy_button" onClick={handleBuyClick}>
                    {" "}
                    추가 구매하기
                  </button>

                  <button className="cart_button" onClick={handleCartInClick}>
                    장바구니 담기
                  </button>
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
                    style={{ display: isExpanded[index] ? "block" : "none" }}
                  >
                    {index === 0 && <>{productdetail.description}</>}
                    {index === 1 && (
                      <>
                        <br />
                        CJ대한통운 (1588-1255) / 우체국 택배 (1588-1300) <br />
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
                        교환/환불의 경우 모든 상품은 상품을 공급받으신 날로부터{" "}
                        <br />
                        7일 이내 신청하시면 기사님께서 빠른 시일 내에 수거하실
                        예정입니다.
                        <br /> 고객님의 단순 변심으로 인한 상품의 교환/반품을
                        요청하시는 경우, <br />
                        택배비용은 고객님 부담이오니 이점 양해 바랍니다. <br />
                        칼하트 (마이페이지 &gt; 주문 내역 &gt;주문서 상세 페이지
                        조회 &gt; 교환/환불 신청)
                        <br />
                      </>
                    )}
                    {index === 3 && (
                      <>
                        <br />
                        칼하트윕 한국 공식 판매처를 통하여 구입한 모든 제품은{" "}
                        <br />
                        A/S를 받으실 수 있습니다.
                        <br />
                      </>
                    )}
                    {index === 4 && (
                      <>
                        <br />
                        제품 혼용율에 따라 세탁 및 취급 유의 사항이 변경될 수
                        있습니다. <br />
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
      </div>
    </div>
  );
};

export default ProductDetail;
