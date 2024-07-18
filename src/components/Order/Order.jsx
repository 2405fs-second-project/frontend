import React from "react";
import "./Order.css";

function Order() {
  return (
    <div>
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
            <div>
              <label class="label_field" for="adress">
                주소*
              </label>
              <input type="text" id="adress" class="input_field" placeholder="주소" disabled value="" />
            </div>
            <button />
            검색
          </div>
          <div>
            <input />
          </div>
          <div className="request_info"></div>
          <h6 className="info_title">결제수단 선택</h6>
          <div className="payments_info"></div>
        </div>
        <div className="order_products"></div>
      </div>
    </div>
  );
}

export default Order;
