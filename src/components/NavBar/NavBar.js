import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import logo from "../../assets/WhiteLogo.png";
import korea from "../../assets/Korea.png";
import search from "../../assets/Search.png";
import radio from "../../assets/Radio.png";
import bell from "../../assets/Bell.png";
import human from "../../assets/Human.png";
import interesting from "../../assets/Interesting.png";
import bag from "../../assets/Bag.png";

const NavBar = ({ cartItems }) => {
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
          <button className="search_btn">
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
    </nav>
  );
};

export default NavBar;
