import React, { useState } from "react";
import "./MyPage.css";

const MyPage = () => {
  const [view, setView] = useState(null);
  const [activeButton, setActiveButton] = useState(null);

  const handleViewClick = (viewName) => {
    setView(viewName);
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="my_page">
      <header className="header">
        <p>마이페이지</p>
      </header>
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
              결제 취소 내역
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
            <a
              className={view === "points" ? "active" : ""}
              onClick={() => handleViewClick("points")}
            >
              적립금 & 쿠폰
            </a>
          </div>
          <div className="faq">
            <a
              className={view === "faq" ? "active" : ""}
              onClick={() => handleViewClick("faq")}
            >
              자주 하는 질문
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
        {view === "order" && (
          <div className="side_info_box">
            <div className="side_header">
              <div className="side_header_1">전체 주문 내역</div>
              <div className="side_header_2">전체보기</div>
            </div>
            <div className="ordered_list">주문 내역이 없습니다.</div>
          </div>
        )}
        {view === "memberInfo" && (
          <div className="side_info_box">
            <div className="side_header">
              <div className="side_header_1">내 정보 수정</div>
            </div>
            <div className="side_info_box_line"> </div>
            <form>
              <div className="edit_info_header">
                <div>나의 정보</div>
                <button className="edit_pw">
                  <span>비밀번호 변경</span>
                </button>
              </div>
              <div className="edit_id">
                <div>
                  <label>아이디(이메일)</label>
                  <input type="email" />
                </div>
                <div>
                  <label>이름</label>
                  <input type="text" />
                </div>
              </div>
              <div className="phone_number">
                <label>핸드폰 번호</label>
                <div className="number_input">
                  <input type="text" />
                  <input type="text" />
                  <input type="text" />
                </div>
              </div>
              <div className="side_info_box_line"> </div>
              <div className="re_authenticate">
                <button type="button">재인증하기</button>
                <p>본인인증 완료</p>
              </div>
              <div className="side_info_box_line"> </div>
              <div>
                <div className="edit_info_delivery">
                  <div>배송 정보</div>
                  <button className="edit_pw">
                    <span>배송지 목록</span>
                  </button>
                </div>
                <div className="address_button">
                  <button
                    className={`existing_address ${
                      activeButton === "existing" ? "active" : ""
                    }`}
                    type="button"
                    onClick={() => handleButtonClick("existing")}
                  >
                    기존 배송지
                  </button>
                  <button
                    className={`new_address ${
                      activeButton === "new" ? "active" : ""
                    }`}
                    type="button"
                    onClick={() => handleButtonClick("new")}
                  >
                    신규 입력
                  </button>
                </div>
              </div>
              <div className="delivery_info">
                <div>
                  <label>배송지명 *</label>
                  <input type="text" placeholder="배송지명을 입력해주세요." />
                </div>
                <div className="delivery_name">
                  <label>수령인 이름 *</label>
                  <input type="text" placeholder="수령인 이름을 적어주세요." />
                </div>
              </div>
              <div className="delivery_number_info">
                <div className="delivery_number_text">
                  <label>수령인 전화번호 *</label>
                </div>
                <div className="delivery_number">
                  <input type="tel" maxLength={3} placeholder="000" />
                  <input type="tel" maxLength={4} placeholder="0000" />
                  <input type="tel" maxLength={4} placeholder="0000" />
                </div>
              </div>
              <div className="input_address">
                <label>기본 주소 *</label>
                <div className="address_input">
                  <input type="text" readOnly />
                  <button type="button">검색</button>
                </div>
                <div className="detail_address">
                  <input type="text" placeholder="상세 주소 입력" />
                </div>
              </div>
              <div className="delivery_request">
                <label>배송 시 요청사항</label>
                <input
                  type="text"
                  placeholder="배송 시 요청사항을 입력해주세요."
                />
              </div>
              <div className="register_address">
                <label>
                  <input type="checkbox" /> 기본 배송지로 등록
                </label>
              </div>
              <div className="edit_complete">
                <button type="button">수정하기</button>
              </div>
              <div className="side_info_box_line"> </div>
              <div className="marketing_consent">
                <label>
                  <input type="checkbox" /> 마케팅 정보 수신 동의
                </label>
              </div>
              <div className="side_info_box_line"> </div>
              <div className="cancel_account">
                <button type="button">회원탈퇴</button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyPage;
