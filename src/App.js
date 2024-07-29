import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import axios from "axios";
import NavBar from "./components/NavBar/NavBar";
import MyPage from "./components/MyPage/MyPage";
import Signup1 from "./components/SignUp/SignUp1";
import Signup2 from "./components/SignUp/SignUp2";
import Signup3 from "./components/SignUp/SignUp3";
import Login from "./components/Login/Login";
import Footer from "./components/NavBar/Footer";
import ViewDetail from "./components/View/ViewDetail";
import ViewForm from "./components/View/ViewForm";
import MainForm from "./components/Main/MainForm";
import Cart from "./components/Cart/Cart";
import Product from "./components/Product/Product";
import Order from "./components/Order/Order";
import OrderComplete from "./components/Order/OrderComplete";

const App = () => {
  const location = useLocation();
  const hideFooterPaths = ["/login", "/signup1", "/signup2", "/signup3"];

  const api = axios.create({});

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainForm />} />
        <Route path="/viewform" element={<ViewForm />} />
        <Route path="/viewdetail/:id" element={<ViewDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/signup1" element={<Signup1 />} />
        <Route path="/signup2" element={<Signup2 />} />
        <Route path="/signup3" element={<Signup3 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product" element={<Product />} />
        <Route path="/order" element={<Order />} />
        <Route path="/ordercomplete" element={<OrderComplete />} />
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
