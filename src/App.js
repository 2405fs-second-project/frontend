import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductForm from "./menproduct/MenForm";
import ProductDetail from "./menproduct/MenDetail";

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
