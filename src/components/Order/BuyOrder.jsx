import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./Order.css";
import { useAuth } from "../../context/AuthContext";

function BuyOrder() {
  const { id: userId, productId } = useParams(); // URL 파라미터에서 productId 가져오기
  const { user, logout } = useAuth(); // 로그인한 사용자 정보 가져오기
  const [activeButton, setActiveButton] = useState(null);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [updateAddress, setUpdateAddress] = useState("");
  const [updatePhoneNum, setUpdatePhoneNum] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [shippingInfo, setShippingInfo] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // 상태 객체 접근
  const { size } = location.state || {}; // navigate에서 전달한 상태 객체
  const [quantity, setQuantity] = useState(1); // 기본값 1

  useEffect(() => {
    const validateUserToken = async () => {
      const token = localStorage.getItem("token");
      console.log("Retrieved token:", token);

      if (token) {
        try {
          const response = await axios.post(
            `http://localhost:8081/api/auth/validateToken`,
            null, // 요청 본문은 비워도 됩니다
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          console.log("Token validation response:", response.data);

          if (!response.data.valid) {
            logout();
            navigate("/login");
          } else {
            fetchData();
          }
        } catch (error) {
          console.error(
            "Token validation error:",
            error.response ? error.response.data : error.message
          );
          logout();
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    validateUserToken();
  }, [logout, navigate]);

  const fetchData = async () => {
    await fetchProduct(); // 상품 정보 가져오기
    if (user) {
      await handleFetchUserOrder(user.id); // 사용자 ID를 user 객체에서 가져오기
    }
  };

  const fetchProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8081/api/orders/buy-item/${productId}?size=${size}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts([response.data]);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleFetchUserOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8081/api/orders/user-info/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrder(response.data);
      setUpdateName(response.data.updateName || "");
      setUpdateAddress(response.data.updateAddress || "");
      setUpdatePhoneNum(response.data.updatePhoneNum || "");
      setShippingInfo(response.data.shippingInfo || "");
    } catch (error) {
      console.error(
        `Failed to fetch user with id ${userId}:`,
        error.response ? error.response.data : error.message
      );
    }
  };

  const handlePayment = async () => {
    if (isChecked1 && isChecked2) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `http://localhost:8081/api/orders/direct/${userId}`,
          {
            productId,
            quantity,
            size,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 201) {
          const orderNumber = response.data.orderNumber;
          navigate(`/ordercomplete?orderNumber=${orderNumber}`);
        }
      } catch (error) {
        console.error("Error creating order:", error);
        alert("주문 생성 중 오류가 발생했습니다.");
      }
    }
  };

  const handleOrderAndShippingUpdate = async (event) => {
    event.preventDefault();
    await handleUpdateShipping(event);
    await handlePayment();
  };

  const handleUpdateShipping = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:8081/api/orders/${userId}/shipping`,
        {
          updateName,
          updateAddress,
          updatePhone: updatePhoneNum,
          shippingInfo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await handleFetchUserOrder();
    } catch (error) {
      console.error(
        "배송 정보 업데이트 실패:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  const handleCheckboxChange1 = () => {
    setIsChecked1(!isChecked1);
  };

  const handleCheckboxChange2 = () => {
    setIsChecked2(!isChecked2);
  };

  const isButtonActive = isChecked1 && isChecked2;

  const totalPrice = Array.isArray(products)
    ? products.reduce(
        (total, item) =>
          total + (item.productPrice || 0) * (item.quantity || 0),
        0
      )
    : 0;

  return (
    <div>
      <div className="order_form">
        <div className="order_info">
          <h6 className="info_title">주문자 정보</h6>
          <div className="info_group">
            <div className="person_name">
              <div className="label_field">
                <label htmlFor="name">이름</label>
              </div>
              <div className="person_name_box">
                <input
                  type="text"
                  id="name"
                  className="input_field"
                  value={order ? order.name : ""}
                  readOnly
                />
              </div>
            </div>
            <div className="person_phone">
              <div className="label_field">
                <label htmlFor="phone_num">핸드폰 번호</label>
              </div>
              <div className="phone_box">
                <div className="phone_boxes">
                  <input
                    id="phone_num"
                    type="text"
                    value={order ? order.phoneNum : ""}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
          <h6 className="info_title">배송정보</h6>
          <div className="info_group">
            <div className="person_name">
              <div className="label_field">
                <label htmlFor="update_name">수령인 이름</label>
              </div>
              <div className="person_name_box">
                <input
                  type="text"
                  id="update_name"
                  className="input_field"
                  value={updateName}
                  onChange={(e) => setUpdateName(e.target.value)}
                />
              </div>
            </div>
            <div className="person_phone">
              <div className="label_field">
                <label htmlFor="update_phone">수취인 전화번호</label>
              </div>
              <div className="phone_box">
                <div className="phone_boxes">
                  <input
                    id="update_phone"
                    type="tel"
                    className="input_field"
                    value={updatePhoneNum}
                    onChange={(e) => setUpdatePhoneNum(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="adress_info">
            <div>
              <div className="label_field">
                <label htmlFor="update_address">주소</label>
              </div>
              <div className="info_group">
                <input
                  type="text"
                  id="update_address"
                  className="input_field"
                  value={updateAddress}
                  onChange={(e) => setUpdateAddress(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="request_info">
            <div>
              <div className="label_field">
                <label htmlFor="request">배송시 요청사항</label>
              </div>
              <div className="select_field">
                <input
                  type="text"
                  id="request"
                  className="input_field"
                  value={shippingInfo}
                  onChange={(e) => setShippingInfo(e.target.value)}
                />
              </div>
            </div>
          </div>
          <h6 className="info_payment">결제수단 선택</h6>
          <div className="payments_info">
            <button
              onClick={() => handleClick(1)}
              className={activeButton === 1 ? "buttonActive" : "button"}
            >
              신용카드
            </button>
            <button
              onClick={() => handleClick(2)}
              className={activeButton === 2 ? "buttonActive" : "button"}
            >
              에스크로 계좌이체
            </button>
            <button
              onClick={() => handleClick(3)}
              className={activeButton === 3 ? "buttonActive" : "button"}
            >
              카카오페이
            </button>
            <button
              onClick={() => handleClick(4)}
              className={activeButton === 4 ? "buttonActive" : "button"}
            >
              네이버페이
            </button>
          </div>
        </div>

        <div className="product_info_order">
          <div className="product_section_top">
            <h6 className="info_title_order">주문상품</h6>
            <div className="order_num"> 1개</div>
          </div>
          {products.map((product) => (
            <div key={product.productId} className="product_section">
              <div className="order_summary">
                <div className="order_image">
                  <img
                    className="order_image_size"
                    src={product.productFileUrl}
                    alt=""
                  />
                </div>
                <div className="order_info_total">
                  <div className="order_info_name">{product.productName}</div>
                  <div className="order_info_sub">{product.productColor}</div>
                  <div className="order_info_sub">
                    사이즈 {product.productSize}
                  </div>
                  <div className="order_info_sub">
                    수량 {product.quantity} 개
                  </div>
                </div>
                <div className="order_price">{product.productPrice} 원</div>
              </div>
            </div>
          ))}
          <div className="product_payment">
            <div>
              <div className="price_detail">
                <div>총 상품금액</div>
                <div>{totalPrice.toLocaleString()} 원</div>
              </div>
              <div className="price_detail">
                <div>배송비</div>
                <div>0원</div>
              </div>
              <div className="price_detail">
                <div>총 쿠폰 할인금액</div>
                <div>-0원</div>
              </div>
              <div className="price_detail">
                <div>총 적립금 할인금액</div>
                <div>-0원</div>
              </div>
              <div className="price_detail_title">
                <div>총 결제금액</div>
                <div>{totalPrice.toLocaleString()} 원</div>
              </div>
              <div className="price_detail">
                <div>적립금 적립 금액</div>
                <div>0원</div>
              </div>
            </div>
          </div>
          <div className="product_order">
            <div className="product_order_agree">
              <input
                className="item_check"
                type="checkbox"
                id="check_order1"
                checked={isChecked1}
                onChange={handleCheckboxChange1}
              />
              <label htmlFor="check_order1">주문정보 동의</label>
            </div>
            <div className="product_order_agree">
              <input
                className="item_check"
                type="checkbox"
                id="check_order2"
                checked={isChecked2}
                onChange={handleCheckboxChange2}
              />
              <label htmlFor="check_order2">제3자 제공동의</label>
            </div>
          </div>
          <div className="order_button">
            <button
              className={`goto_order ${isButtonActive ? "active" : ""}`}
              disabled={!isButtonActive} // Invert the logic to disable the button if not active
              style={{
                backgroundColor: isButtonActive ? "#000" : "#ccc",
                color: isButtonActive ? "#fff" : "#000",
              }}
              onClick={handleOrderAndShippingUpdate} // Add onClick event to the button
            >
              주문하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyOrder;
