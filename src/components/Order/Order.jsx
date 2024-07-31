import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Order.css";

function Order() {
  const [activeButton, setActiveButton] = useState(null);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [order, setOrder] = useState(null);
  const [cartItems, setCartItems] = useState([]); // 상태 추가
  const [updateAddress, setUpdateAddress] = useState("");
  const [updatePhoneNum, setUpdatePhoneNum] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [shippingInfo, setShippingInfo] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate
  const { id: userId } = useParams();
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      handleFetchUserOrder();
      handleFetchCartItems(); // Fetch cart items after fetching user order
    }
  }, [user, userId, navigate]);

  const handleFetchUserOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8081/api/api/orders/user-info/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(response.data);
      // 기본값 초기화
      if (response.data) {
        setUpdateName(response.data.updateName || "");
        setUpdateAddress(response.data.updateAddress || "");
        setUpdatePhoneNum(response.data.updatePhoneNum || "");
        setShippingInfo(response.data.shippingInfo || "");
      }
    } catch (error) {
      console.error(
        `Failed to fetch user with id ${userId}:`,
        error.response ? error.response.data : error.message
      );
    }
  };

  const handlePayment = async () => {
    if (isButtonActive) {
      try {
        const token = localStorage.getItem("token"); // 토큰 가져오기
        const response = await axios.post(
          `http://localhost:8081/api/orders/create/${userId}`,
          {
            // 주문 정보 포함
            updateName,
            updateAddress,
            updatePhoneNum,
            shippingInfo,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // 인증 헤더 추가
            },
          }
        );
        if (response.status === 201) {
          console.log("Order created successfully:", response.data);
          const orderNumber = response.data.orderNumber; // 주문 번호를 응답에서 추출
          navigate(`/ordercomplete?orderNumber=${orderNumber}`); // 쿼리 파라미터로 주문 번호 전달
        }
      } catch (error) {
        console.error("Error creating order:", error);
      }
    }
  };

  const handleOrderAndShippingUpdate = async (event) => {
    event.preventDefault(); // 기본 동작 방지
    await handleUpdateShip(event); // 배송 정보 업데이트
    await handlePayment(); // 주문하기
  };

  const handleUpdateShip = async () => {
    try {
      {
        const response = await axios.post(
          `http://localhost:8081/api/orders/${userId}/shipping`, // API 엔드포인트
          {
            updateName: updateName,
            updateAddress: updateAddress,
            updatePhone: updatePhoneNum,
            shippingInfo: shippingInfo,
          }
        );

        if (response.status === 200) {
          console.log("배송 정보가 성공적으로 업데이트되었습니다.");
          await handleFetchUserOrder(); // 사용자 데이터 새로 고침
        }
      }
    } catch (error) {
      console.error(
        "배송 정보 업데이트 실패:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleFetchCartItems = async () => {
    try {
      const token = localStorage.getItem("token"); // 토큰 가져오기
      const response = await axios.get(
        `http://localhost:8081/api/orders/cart-items/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // 인증 헤더 추가
          },
        }
      );
      setCartItems(response.data || []); // 응답 데이터가 배열인지 확인
    } catch (error) {
      console.error(
        `Failed to fetch cart items for user with id ${userId}:`,
        error.response ? error.response.data : error.message
      );
      setCartItems([]); // 에러 발생 시 빈 배열로 설정
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

  // Ensure cartItems is an array before using reduce
  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce(
        (total, item) => total + (item.price || 0) * (item.quantity || 0),
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
            <div className="order_num">{cartItems.length} 개</div>
          </div>
          {cartItems.map((item) => (
            <div key={item.productId} className="product_section">
              <div className="order_summary">
                <div className="order_image">
                  <img
                    className="order_image_size"
                    src={`http://localhost:8081/${item.productFileUrl}`}
                    alt=""
                  />
                </div>
                <div className="order_info_total">
                  <div className="order_info_name">{item.productName}</div>
                  <div className="order_info_sub">{item.productColor}</div>
                  <div className="order_info_sub">사이즈 {item.size}</div>
                  <div className="order_info_sub">수량 {item.quantity} 개</div>
                </div>
                <div className="order_price">{item.price} 원</div>
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

export default Order;
