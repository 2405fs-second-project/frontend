import React, { useContext } from "react";
import "./Order.css";
import { CartInContext } from "../../service/CartService";

function Order() {
  const { cartItems } = useContext(CartInContext);
  return (
    <div>
      <div className="order_page">
        <p>주문 결제</p>
      </div>
      <div className="order_form">
        <div className="order_info">
          <h6 className="info_title">주문자 정보</h6>
          <div className="person_info">
            <div className="person_name">
              <label class="label_field" for="name">
                이름
              </label>
              <input type="text" id="name" class="input_field" placeholder="이름을 입력해주세요." />
            </div>
            <div className="person_phone">
              <label class="label_field" for="phone_num">
                핸드폰번호
              </label>
              <div className="phone_boxes">
                <div className="phone_boxes_num">
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
                <div className="phone_boxes_num">
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
                <div className="phone_boxes_num">
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
          <div className="person_info">
            <div className="person_name">
              <label class="label_field" for="name">
                수령인 이름*
              </label>
              <input type="text" id="name" class="input_field" placeholder="이름을 입력해주세요." />
            </div>
            <div className="person_phone">
              <label class="label_field" for="phone_num">
                수취인 전화번호*
              </label>
              <div className="phone_boxes">
                <div className="phone_boxes_num">
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
                <div className="phone_boxes_num">
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
                <div className="phone_boxes_num">
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
              <div>
                <input type="text" id="adress" class="input_field" disabled value="" />
                <button className="adress_search">검색</button>
              </div>
              <div>
                <input type="text" id="adress" class="input_field" placeholder="상세 주소 입력" />
              </div>
            </div>
            <div></div>
          </div>
          <div className="request_info">
            <div>
              <div class="label_field">
                <label for="adress">배송시 요청사항</label>
              </div>
              <div>
                <select id="request" class="input_field">
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
            <button>신용카드</button>
            <button>에스크로 계좌이체</button>
            <button>카카오페이</button>
            <button>네이버페이</button>
          </div>
        </div>
        <div className="product_info">
          <div className="product_section">
            <h6 className="info_title">주문상품</h6>
            <div className="order_num"> {cartItems.length}</div>
          </div>
          <div className="product_section">
            <div className="order_summary">
              <div className="order_image">사진</div>
              <div className="order_info">사진</div>
            </div>
            <div className="order_price"></div>
          </div>
          <div className="product_section">
            <div>
              <span>총 상품금액</span>
              <span>133,800원</span>
            </div>
            <div>
              <span>배송비</span>
              <span>0원</span>
            </div>
            <div>
              <span>총 쿠폰 할인금액</span>
              <span>-0원</span>
            </div>
            <div>
              <span>총 적립금 할인금액</span>
              <span>-0원</span>
            </div>
            <div>
              <span>총 결제금액</span>
              <span>133,800원</span>
            </div>
            <div>
              <span>적립금 적립 금액</span>
              <span>0원</span>
            </div>
          </div>
          <div className="product_order">
            <div>
              <input type="checkbox" id="check_order1"></input>
              <label for="check_order1">주문정보 동의</label>
            </div>
            <div>
              <input type="checkbox" id="check_order2"></input>
              <label for="check_order2">제3자 제공동의</label>
            </div>
            <button className="goto_order">주문하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
