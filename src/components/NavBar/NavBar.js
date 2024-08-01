// NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./NavBar.css";
import logo from "../../assets/WhiteLogo.png";
import korea from "../../assets/Korea.png";
import search from "../../assets/Search.png";
import radio from "../../assets/Radio.png";
import bell from "../../assets/Bell.png";
import human from "../../assets/Human.png";
import interesting from "../../assets/Interesting.png";
import bag from "../../assets/Bag.png";

const NavBar = () => {
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar_left">
        <Link to="/">
          <img src={logo} className="home_logo" alt="Home Logo" />
        </Link>
      </div>
      <div className="navbar_center">
        <ul className="nav_links">
          <a href="/" className="season_off">
            시즌오프
          </a>
          <Link to="/productform?gender=MALE">남성</Link>
          <Link to="/productform?gender=FEMALE">여성</Link>
          <Link to="/productform?gender=UNKNOWN">악세서리</Link>
          <Link to="/">룩북</Link>
          <Link to="/">기사</Link>
          <Link to="/">매장</Link>
          <Link to="/">브랜드</Link>
        </ul>
      </div>
      <div className="navbar_right">
        <div className="nav_icons">
          <button className="korea_btn">
            <img className="korea_logo" src={korea} alt="Korea" />
          </button>
          <button className="search_btn">
            <img className="search_logo" src={search} alt="Search" />
          </button>
          <button className="radio_btn">
            <img className="radio_logo" src={radio} alt="Radio" />
          </button>
          <button className="bell_btn">
            <img className="bell_logo" src={bell} alt="Bell" />
          </button>
          {user ? (
            user.id === 9 ? (
              <Link to="/seller">
                <button className="human_btn">
                  <img className="human_logo" src={human} alt="Seller Page" />
                </button>
              </Link>
            ) : (
              <Link to={`/mypage/${user.id}`}>
                <button className="human_btn">
                  <img className="human_logo" src={human} alt="Profile" />
                </button>
              </Link>
            )
          ) : (
            <Link to="/login">
              <button className="human_btn">
                <img className="human_logo" src={human} alt="Login" />
              </button>
            </Link>
          )}
          <button className="interesting_btn">
            <img className="interesting_logo" src={interesting} alt="Interesting" />
          </button>
          <Link to="/cart">
            <button className="bag_btn">
              <img className="bag_logo" src={bag} alt="Cart" />
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
