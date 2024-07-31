import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
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

const NavBar = () => {
  const { user } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // 검색 입력 값을 저장하는 상태
  const searchBarRef = useRef(null); 
  const navigate = useNavigate();
  

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  const handleLogoClick = () => {
    setIsSearchOpen(false);
  };

  // 추가된 부분: 검색 핸들러 함수(검색 API를 호출하여 결과를 가져오는 함수)
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      navigate(`/viewform?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(""); 
      setIsSearchOpen(false); 
    } catch (error) {
      console.error("검색 중 오류가 발생했습니다!", error);
      alert("검색 중 오류가 발생했습니다.");
    }
  };
  // 추가된 부분: 엔터 키를 눌렀을 때 검색을 실행하는 함수
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
  }, [])

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
          <Link to="/viewform?gender=male">남성</Link>
          <Link to="/viewform?gender=female">여성</Link>
          <Link to="/viewform?gender=accessory">악세서리</Link>
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
          <button className="search_btn" onClick={handleSearchClick}>
            <img className="search_logo" src={search} alt="Search" />
          </button>
          <button className="radio_btn">
            <img className="radio_logo" src={radio} alt="Radio" />
          </button>
          <button className="bell_btn">
            <img className="bell_logo" src={bell} alt="Bell" />
          </button>
          {user ? (
            <Link to={`/mypage/${user.id}`}>
              <button className="human_btn">
                <img className="human_logo" src={human} alt="Profile" />
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="human_btn">
                <img className="human_logo" src={human} alt="Login" />
              </button>
            </Link>
          )}
          <button className="interesting_btn">
            <img
              className="interesting_logo"
              src={interesting}
              alt="Interesting"
            />
          </button>
          <Link to="/cart">
            <button className="bag_btn">
              <img className="bag_logo" src={bag} alt="Cart" />
            </button>
          </Link>
        </div>
      </div>
      {isSearchOpen && (
        <div className={`search_bar ${isSearchOpen ? "open" : ""}`} ref={searchBarRef}>
          <div onClick={handleLogoClick}>
            <Link to="/">
              <img src={blackLogo} className="home_logo_search" />
            </Link>
          </div>
          <div className="search_input_wrapper">
            <img src={blackSearch} className="search_icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
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
