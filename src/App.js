import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccessoryProductForm from "./product/AccessoryProductForm";
import AccessoryProductDetail from "./product/AccessoryProductDetail";
import MenDetail from "./menproduct/MenDetail";
import MenForm from "./menproduct/MenForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MenForm />} />
        <Route path="/menproduct" element={<MenDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
