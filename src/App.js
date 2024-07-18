import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccessoryProductForm from "./product/AccessoryProductForm";
import AccessoryProductDetail from "./product/AccessoryProductDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductForm />} />
        <Route path="/womandetailone" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
