import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import logo from "../../assets/WhiteLogo.png";
import blackLogo from "../../assets/BlackLogo.png";
import blackSearch from "../../assets/BlackSearch.png";
import xLogo from "../../assets/Xlogo.svg";
import korea from "../../assets/Korea.png";
import search from "../../assets/Search.png";
import radio from "../../assets/Radio.png";
import bell from "../../assets/Bell.png";
import human from "../../assets/Human.png";
import interesting from "../../assets/Interesting.png";
import bag from "../../assets/Bag.png";

const NavBar = ({ cartItems }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar_left">
        <Link to="/">
          <img src={logo} className="home_logo" />
        </Link>
      </div>
      <div className="navbar_center">
        <ul className="nav_links">
          <a href="/" className="season_off">
            시즌오프
          </a>
          <Link to="/menform">남성</Link>
          <Link to="/womanform">여성</Link>
          <Link to="/accessoryform">악세서리</Link>
          <Link to="/">룩북</Link>
          <Link to="/">기사</Link>
          <Link to="/">매장</Link>
          <Link to="/">브랜드</Link>
        </ul>
      </div>
      <div className="navbar_right">
        <div className="nav_icons">
          <button className="korea_btn">
            <img className="korea_logo" src={korea} />
          </button>
          <button className="search_btn" onClick={handleSearchClick}>
            <img className="search_logo" src={search} />
          </button>
          <button className="radio_btn">
            <img className="radio_logo" src={radio} />
          </button>
          <button className="bell_btn">
            <img className="bell_logo" src={bell} />
          </button>
          <Link to="/login">
            <button className="human_btn">
              <img className="human_logo" src={human} />
            </button>
          </Link>
          <button className="interesting_btn">
            <img className="interesting_logo" src={interesting} />
          </button>
          <Link to="/cart">
            <button className="bag_btn">
              <img className="bag_logo" src={bag} />
            </button>
          </Link>
        </div>
      </div>
      {isSearchOpen && (
        <div className={`search_bar ${isSearchOpen ? "open" : ""}`}>
          <img src={blackLogo} className="home_logo_search" />
          <div className="search_input_wrapper">
            <img src={blackSearch} className="search_icon" />
            <input
              type="text"
              placeholder="검색하기"
              className="search_input"
            />
          </div>
          <button className="search_close_btn" onClick={handleSearchClose}>
            닫기
            <img src={xLogo} className="close_icon" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
