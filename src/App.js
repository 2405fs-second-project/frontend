import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import MyPage from "./components/MyPage/MyPage";
import Home from "./components/Home/Home";
import Signup1 from "./components/SignUp/SignUp1";
import Signup2 from "./components/SignUp/SignUp2";
import Signup3 from "./components/SignUp/SignUp3";
import Login from "./components/Login/Login";
import Footer from "./components/NavBar/Footer"; // 수정된 경로

const App = () => {
  const location = useLocation();
  const hideFooterPaths = ["/login", "/signup1", "/signup2", "/signup3"]; // 푸터를 숨기고 싶은 경로들

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup1" element={<Signup1 />} />
        <Route path="/signup2" element={<Signup2 />} />
        <Route path="/signup3" element={<Signup3 />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {!hideFooterPaths.includes(location.pathname) && <Footer />}
    </>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
