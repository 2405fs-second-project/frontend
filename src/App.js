import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, Form } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import MyPage from "./components/MyPage/MyPage";
import Signup1 from "./components/SignUp/SignUp1";
import Signup2 from "./components/SignUp/SignUp2";
import Signup3 from "./components/SignUp/SignUp3";
import Login from "./components/Login/Login";
import Footer from "./components/NavBar/Footer";
import AccessoryProductForm from "./product/AccessoryProductForm";
import AccessoryProductDetail from "./product/AccessoryProductDetail";
import MenDetail from "./menproduct/MenDetail";
import MenForm from "./menproduct/MenForm";
import WomanForm from "./womanproduct/WomanForm";
import WomanDetail from "./womanproduct/WomanDetail";

import { Cart, Product, Order } from "./pages";
const App = () => {
  const location = useLocation();
  const hideFooterPaths = ["/login", "/signup1", "/signup2", "/signup3"];

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<MenForm />} />
        <Route path="/menproduct" element={<MenDetail />} />
        <Route path="/womanform" element={<WomanForm />} />
        <Route path="/womandetail" element={<WomanDetail />} />
        <Route path="/accessoryform" element={<AccessoryProductForm />} />
        <Route path="/accessorydetail" element={<AccessoryProductDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/signup1" element={<Signup1 />} />
        <Route path="/signup2" element={<Signup2 />} />
        <Route path="/signup3" element={<Signup3 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product" element={<Product />} />
        <Route path="/order" element={<Order />} />
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
