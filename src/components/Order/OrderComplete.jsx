import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./OrderComplete.css";

const OrderComplete = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const location = useLocation();

  useEffect(() => {
    // 주문 완료 후 전달된 주문 번호를 쿼리 파라미터로부터 받아옵니다.
    const searchParams = new URLSearchParams(location.search);
    const orderNumber = searchParams.get("orderNumber");
    setOrderNumber(orderNumber);
  }, [location]);

  return (
    <>
      <div className="payment_complete_form">
        <div className="payment_complete">주문이 완료 되었습니다.</div>
        <div className="payment_number_info">
          {" "}
          고객님이 주문하신 주문번호는{" "}
          <div className="payment_number">
            <span className="order_number_highlight">[{orderNumber}]</span>{" "}
            입니다.
          </div>
        </div>
        <div className="payment_info">
          주문내역 확인은 배송/마이페이지의 "전체주문내역"에서 하실 수 있습니다.
          <br /> <br />
          감사합니다.
        </div>
        <div className="go_to_home">
          <Link to="/">홈으로 가기</Link>
        </div>
      </div>
    </>
  );
};

export default OrderComplete;
