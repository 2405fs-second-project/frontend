import React, { useState } from "react";
import "./Order.css";

function Order() {
  const [activeButton, setActiveButton] = useState(null);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
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
  return (
    <div>
      <div className="order_page">
        <p>주문 결제</p>
      </div>
      <div className="order_form">
        <div className="order_info">
          <h6 className="info_title">주문자 정보</h6>
          <div className="info_group">
            <div className="person_name">
              <div class="label_field">
                <label for="name">이름</label>
              </div>
              <div className="person_name_box">
                <input type="text" id="name" class="input_field" placeholder="이름을 입력해주세요." />
              </div>
            </div>
            <div className="person_phone">
              <div class="label_field">
                <label for="phone_num">핸드폰번호</label>
              </div>
              <div className="phone_box">
                <div className="phone_boxes">
                  <input
                    id="phone_num"
                    type="tel"
                    class="input_field"
                    pattern="[0-9]{3}"
                    maxlength="3"
                    placeholder="000"
                    value=""
                  />
                </div>
                <div className="phone_boxes">
                  <input
                    id="phone_num2"
                    type="tel"
                    class="input_field"
                    pattern="[0-9]{4}"
                    maxlength="4"
                    placeholder="0000"
                    value=""
                  />
                </div>
                <div className="phone_boxes">
                  <input
                    id="phone_num3"
                    type="tel"
                    class="input_field"
                    pattern="[0-9]{4}"
                    maxlength="4"
                    placeholder="0000"
                    value=""
                  />
                </div>
              </div>
            </div>
          </div>
          <h6 className="info_title">배송정보</h6>
          <div className="info_group">
            <div className="person_name">
              <div class="label_field">
                <label for="name">수령인 이름*</label>
              </div>
              <div className="person_name_box">
                <input type="text" id="name" class="input_field" placeholder="수령인 이름을 적어주세요." />
              </div>
            </div>
            <div className="person_phone">
              <div class="label_field">
                <label for="phone_num">수취인 전화번호*</label>
              </div>
              <div className="phone_box">
                <div className="phone_boxes">
                  <input
                    id="phone_num"
                    type="tel"
                    class="input_field"
                    pattern="[0-9]{3}"
                    maxlength="3"
                    placeholder="000"
                    value=""
                  />
                </div>
                <div className="phone_boxes">
                  <input
                    id="phone_num2"
                    type="tel"
                    class="input_field"
                    pattern="[0-9]{4}"
                    maxlength="4"
                    placeholder="0000"
                    value=""
                  />
                </div>
                <div className="phone_boxes">
                  <input
                    id="phone_num3"
                    type="tel"
                    class="input_field"
                    pattern="[0-9]{4}"
                    maxlength="4"
                    placeholder="0000"
                    value=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="adress_info">
            <div>
              <div class="label_field">
                <label for="adress">주소*</label>
              </div>

              <div className="info_group">
                <input type="text" id="adress" class="input_field" disabled value="" />
                <button className="adress_search">검색</button>
              </div>
              <div className="info_group">
                <input type="text" id="adress" class="input_field" placeholder="상세 주소 입력" />
              </div>
            </div>
          </div>
          <div className="request_info">
            <div>
              <div class="label_field">
                <label for="adress">배송시 요청사항</label>
              </div>
              <div class="select_field">
                <select id="request">
                  <option>배송전 미리 연락 바랍니다.</option>
                  <option>부재시 경비실에 맡겨 주세요.</option>
                  <option>부재시 전화 주시거나 문자 남겨주세요.</option>
                  <option>직접입력</option>
                </select>
              </div>
            </div>
          </div>
          <h6 className="info_title">결제수단 선택</h6>
          <div className="payments_info">
            <button onClick={() => handleClick(1)} className={activeButton === 1 ? "buttonActive" : "button"}>
              신용카드
            </button>
            <button onClick={() => handleClick(2)} className={activeButton === 2 ? "buttonActive" : "button"}>
              에스크로 계좌이체
            </button>
            <button onClick={() => handleClick(3)} className={activeButton === 3 ? "buttonActive" : "button"}>
              카카오페이
            </button>
            <button onClick={() => handleClick(4)} className={activeButton === 4 ? "buttonActive" : "button"}>
              네이버페이
            </button>
          </div>
        </div>
        <div className="product_info_order">
          <div className="product_section_top">
            <h6 className="info_title_order">주문상품</h6>
            <div className="order_num"> "/제품갯수/"</div>
          </div>
          <div className="product_section">
            <div className="order_summary">
              <div className="order_image">사진</div>
              <div className="order_info_total">
                <div className="order_info_name">"/제품명/"</div>
                <div className="order_info_sub">"/제품색상/"</div>
                <div className="order_info_sub">사이즈 "/제품사이즈/"</div>
                <div className="order_info_sub">수량 "/제품수량/"개</div>
              </div>
              <div className="order_price">"/제품금액/"원</div>
            </div>
          </div>
          <div className="product_section">
            <div>
              <div className="price_detail">
                <div>총 상품금액</div>
                <sdiv>133,800원</sdiv>
              </div>
              <div className="price_detail">
                <div>배송비</div>
                <sdiv>0원</sdiv>
              </div>
              <div className="price_detail">
                <divn>총 쿠폰 할인금액</divn>
                <div>-0원</div>
              </div>
              <div className="price_detail">
                <div>총 적립금 할인금액</div>
                <div>-0원</div>
              </div>
              <div className="price_detail_title">
                <div>총 결제금액</div>
                <div>133,800원</div>
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

            <button className={`goto_order ${isButtonActive ? "active" : ""}`} disabled={!isButtonActive}>
              주문하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
