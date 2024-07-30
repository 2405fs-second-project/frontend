import React from "react";
import "./Footer.css";
import instagram from "../../assets/Instagram.png";
import facebook from "../../assets/Facebook.png";
import youTube from "../../assets/YouTube.png";
import pinterest from "../../assets/Pinterest.png";
import soundCloud from "../../assets/SoundCloud.png";
import axios from "axios";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_content">
        <div className="footer_left">
          <div className="footer_support">
            <div className="footer_section">
              <h4>고객 지원</h4>
              <ul>
                <li>문의하기</li>
                <li>배송 안내</li>
                <li>반품 안내</li>
                <li>나의 계정</li>
                <li>자주하는 질문</li>
              </ul>
            </div>
            <div className="footer_section">
              <h4>기업정보</h4>
              <ul>
                <li>칼하트윕에 대하여</li>
                <li>칼하트윕의 라디오</li>
                <li>기업의 사회적 책임</li>
                <li>채용 안내</li>
                <li>이용약관</li>
              </ul>
            </div>
          </div>
          <div className="footer_bottom_left">
            <p>© 칼하트윕 코리아 2024</p>
            <p>이용약관</p>
            <p>개인정보취급 방침</p>
            <p>구매안전 (에스크로) 서비스 가입사실 확인</p>
          </div>
        </div>
        <div className="footer_right">
          <div className="footer_section">
            <h4>주식회사 왁스아웃</h4>
            <ul>
              <li>사업자등록번호: 2024-05-0715 | 대표: 2차-프로젝트-fs</li>
              <li>
                전자우편주소: customer@fullstack-wip.co.kr | 대표전화:
                02-0715-0802
              </li>
              <li>주소: 다같이 열심히 한마음길 2405</li>
              <li>사업자등록번호: 0715-01-7942</li>
              <li>통신판매업신고: 0715-부터-0802</li>
              <li>호스팅 사업자: 2차프로젝트구성원</li>
            </ul>
          </div>
          <div className="footer_icons">
            <img className="instagram_logo" src={instagram} />
            <img className="facebook_logo" src={facebook} />
            <img className="youTube_logo" src={youTube} />
            <img className="pinterest_logo" src={pinterest} />
            <img className="soundCloud_logo" src={soundCloud} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
