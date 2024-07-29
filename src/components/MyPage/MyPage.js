import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyPage.css";

const MyPage = () => {
  const [view, setView] = useState("order");
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [updateName, setUpdateName] = useState("");
  const [updateAddress, setUpdateAddress] = useState("");
  const [updatePhone, setUpdatePhone] = useState("");
  const [shippingInfo, setShippingInfo] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const userId = 3; // 사용자 ID (예제에서는 1로 설정)

  // 사용자 정보를 가져오는 함수
  const handleFetchUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/users/${userId}`
      );
      setUser(response.data);

      // 배송 정보 가져오기
      if (response.data) {
        setUpdateName(response.data.updateName || "");
        setUpdateAddress(response.data.updateAddress || "");
        setUpdatePhone(response.data.updatePhone || "");
        setShippingInfo(response.data.shippingInfo || "");
      }
    } catch (error) {
      console.error(
        `Failed to fetch user with id ${userId}:`,
        error.response ? error.response.data : error.message
      );
    }
  };

  // 주문 내역을 가져오는 함수
  const handleFetchOrderItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/order-items/user/${userId}`
      );
      console.log(response.data);
      setOrderItems(response.data);
    } catch (error) {
      console.error(
        `Failed to fetch order items for user with id ${userId}:`,
        error.response ? error.response.data : error.message
      );
    }
  };

  // 컴포넌트 마운트 시 사용자 정보 및 주문 내역 가져오기
  useEffect(() => {
    handleFetchUser();
    handleFetchOrderItems();
  }, [userId]);

  // 뷰 상태를 설정하는 함수
  const handleViewClick = (viewName) => {
    setView(viewName);

    // 특정 뷰를 클릭했을 때 주문 내역을 새로 고침
    if (viewName === "order") {
      handleFetchOrderItems();
    }
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const formData = new FormData();
    formData.append("file", file); // 'file'이라는 이름으로 파일을 추가합니다.

    try {
      if (user) {
        await axios.post(
          `http://localhost:8081/api/users/${user.id}/upload`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        handleFetchUser(); // 이미지 업로드 후 사용자 데이터 새로 고침
      }
    } catch (error) {
      console.error(
        "Failed to upload image:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // 배송 정보 업데이트 핸들러
  const handleUpdateShip = async (event) => {
    event.preventDefault();

    try {
      if (user) {
        const response = await axios.post(
          `http://localhost:8081/api/users/${user.id}/shipping`,
          {
            updateName: updateName,
            updateAddress: updateAddress,
            updatePhone: updatePhone,
            shippingInfo: shippingInfo,
          }
        );

        if (response.status === 200) {
          console.log("배송 정보가 성공적으로 업데이트되었습니다.");
          handleFetchUser(); // 정보 업데이트 후 사용자 데이터 새로 고침
        }
      }
    } catch (error) {
      console.error(
        "배송 정보 업데이트 실패:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // 주문 아이템을 order_id별로 그룹화하는 함수
  const groupByOrderId = (items) => {
    return items.reduce((acc, item) => {
      (acc[item.order_id] = acc[item.order_id] || []).push(item);
      return acc;
    }, {});
  };

  // 주문 상태에 따라 필터링
  const filterOrderItemsByState = (state) => {
    return orderItems.filter((item) => item.payState === state);
  };

  const groupedOrderItems = groupByOrderId(orderItems);

  return (
    <div className="my_page">
      <header className="header">
        <p>마이페이지</p>
      </header>
      <div className="my_page_all">
        <main>
          <div className="info_box">
            <h6>나의 주문</h6>
            <div className="order_box">
              <a
                className={view === "order" ? "active" : ""}
                onClick={() => handleViewClick("order")}
              >
                전체 주문 내역
              </a>
              <a
                className={view === "cancel" ? "active" : ""}
                onClick={() => handleViewClick("cancel")}
              >
                주문 취소 내역
              </a>
              <a
                className={view === "exchange" ? "active" : ""}
                onClick={() => handleViewClick("exchange")}
              >
                교환 · 반품 내역
              </a>
            </div>
            <h6>나의 정보</h6>
            <div className="member_box">
              <a
                className={view === "memberInfo" ? "active" : ""}
                onClick={() => handleViewClick("memberInfo")}
              >
                회원 정보
              </a>
            </div>
            <div className="logout">
              <a
                className={view === "logout" ? "active" : ""}
                onClick={() => handleViewClick("logout")}
              >
                로그아웃
              </a>
            </div>
          </div>
          <div>
            {view === "order" && (
              <div className="side_info_box">
                <div className="side_header">
                  <div className="side_header_1">전체 주문 내역</div>
                </div>
                <div className="ordered_list">
                  {Object.keys(groupedOrderItems).length > 0 ? (
                    Object.keys(groupedOrderItems).map((orderId) => (
                      <div
                        key={orderId}
                        className={`order_group order_${orderId}`}
                      >
                        {groupedOrderItems[orderId].map((order_item) => (
                          <div
                            key={order_item.productId}
                            className="order_item"
                          >
                            <img
                              className="order_img"
                              src={order_item.productFileUrl}
                              alt="상품 이미지"
                            ></img>{" "}
                            <div className="order_infomation">
                              <p id="order_date">
                                결제 : {order_item.orderDate}
                              </p>
                              <p>주문 상태 : {order_item.payState}</p>
                              <p>주문 번호 : {order_item.orderNumber}</p>
                              <p>상품명 : {order_item.productName}</p>
                              <p>상품 가격 : {order_item.productPrice}원</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))
                  ) : (
                    <p id="buy_null">구매 내역이 없습니다.</p>
                  )}
                </div>
              </div>
            )}
            {view === "cancel" && (
              <div className="side_info_box">
                <div className="side_header">
                  <div className="side_header_1">주문 취소 내역</div>
                </div>
                <div className="ordered_list">
                  {Object.keys(
                    groupByOrderId(filterOrderItemsByState("주문취소"))
                  ).length > 0 ? (
                    Object.keys(
                      groupByOrderId(filterOrderItemsByState("주문취소"))
                    ).map((orderId) => (
                      <div
                        key={orderId}
                        className={`order_group order_${orderId}`}
                      >
                        {groupByOrderId(filterOrderItemsByState("주문취소"))[
                          orderId
                        ].map((order_item) => (
                          <div
                            key={order_item.productId}
                            className="order_item"
                          >
                            <img
                              className="order_img"
                              src={order_item.productFileUrl}
                              alt=""
                            ></img>{" "}
                            <div className="order_infomation">
                              <p id="order_date">
                                결제 : {order_item.orderDate}
                              </p>
                              <p>주문 상태 : {order_item.payState}</p>
                              <p>주문 번호 : {order_item.orderNumber}</p>
                              <p>상품명 : {order_item.productName}</p>
                              <p>상품 가격 : {order_item.productPrice}원</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))
                  ) : (
                    <p id="product_cancel">주문 취소 내역이 없습니다.</p>
                  )}
                </div>
              </div>
            )}
            {view === "exchange" && (
              <div className="side_info_box">
                <div className="side_header">
                  <div className="side_header_1">교환 · 반품 내역</div>
                </div>
                <div className="ordered_list">
                  {Object.keys(
                    groupByOrderId(
                      filterOrderItemsByState("교환완료").concat(
                        filterOrderItemsByState("반품완료")
                      )
                    )
                  ).length > 0 ? (
                    Object.keys(
                      groupByOrderId(
                        filterOrderItemsByState("교환완료").concat(
                          filterOrderItemsByState("반품완료")
                        )
                      )
                    ).map((orderId) => (
                      <div
                        key={orderId}
                        className={`order_group order_${orderId}`}
                      >
                        {groupByOrderId(
                          filterOrderItemsByState("교환완료").concat(
                            filterOrderItemsByState("반품완료")
                          )
                        )[orderId].map((order_item) => (
                          <div
                            key={order_item.productId}
                            className="order_item"
                          >
                            <img
                              className="order_img"
                              src={order_item.productFileUrl}
                              alt=""
                            ></img>{" "}
                            <div className="order_infomation">
                              <p id="order_date">
                                결제 : {order_item.orderDate}
                              </p>
                              <p>주문 상태 : {order_item.payState}</p>
                              <p>주문 번호 : {order_item.orderNumber}</p>
                              <p>상품명 : {order_item.productName}</p>
                              <p>상품 가격 : {order_item.productPrice}원</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))
                  ) : (
                    <p id="return_cancel">교환 및 반품 내역이 없습니다.</p>
                  )}
                </div>
              </div>
            )}
            {view === "memberInfo" && user && (
              <div className="side_info_box">
                <div className="myinfo-img-register">
                  <img
                    className="myinfo-img"
                    src={`http://localhost:8081${user.profilePictureUrl}`}
                    alt="프로필을 추가 하세요"
                  />
                  <label htmlFor="file">
                    <div className="info-upload">파일 업로드</div>
                  </label>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={handleImageUpload}
                  />
                </div>
                <div className="side_info_box_line"> </div>
                <form onSubmit={handleUpdateShip}>
                  <div className="edit_info_header">
                    <div>[ 나의 정보 ]</div>
                  </div>
                  <div className="myInfo">
                    <div className="myInfo-detail">
                      <div className="edit_id">
                        <div>
                          <label>아이디(이메일)</label>
                          <input type="text" value={user.email} readOnly />
                        </div>
                        <div>
                          <label>이름</label>
                          <input type="text" value={user.name} readOnly />
                        </div>
                      </div>
                      <div className="phone_number">
                        <label>핸드폰 번호</label>
                        <div className="number_input">
                          <input type="text" value={user.phoneNum} readOnly />
                        </div>
                      </div>
                      <div className="side_info_box_line"> </div>
                      <div>
                        <div className="edit_info_delivery">
                          <div>[ 배송 정보 ]</div>
                        </div>
                        <div className="address_button"></div>
                      </div>
                      <div className="delivery_info">
                        <div className="delivery_name">
                          <label>수령인 이름</label>
                          <input
                            type="text"
                            value={updateName}
                            onChange={(e) => setUpdateName(e.target.value)}
                          />
                        </div>
                        <div className="delivery_number_info">
                          <div className="delivery_number_text">
                            <label>수령인 전화번호</label>
                          </div>
                          <div className="delivery_number">
                            <input
                              type="text"
                              value={updatePhone}
                              onChange={(e) => setUpdatePhone(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="input_address">
                        <label>기본 주소</label>
                        <div className="detail_address">
                          <input
                            type="text"
                            value={updateAddress}
                            onChange={(e) => setUpdateAddress(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="delivery_request">
                        <label>배송 시 요청사항</label>
                        <input
                          type="text"
                          value={shippingInfo}
                          onChange={(e) => setShippingInfo(e.target.value)}
                          placeholder="배송 시 요청사항을 입력해주세요."
                        />
                      </div>
                    </div>
                  </div>
                  <div className="edit_complete">
                    <button type="submit">등록하기</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyPage;
