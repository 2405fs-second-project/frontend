import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccessoryProductForm from "./product/AccessoryProductForm";
import AccessoryProductDetail from "./product/AccessoryProductDetail";
import MenDetail from "./menproduct/MenDetail";
import MenForm from "./menproduct/MenForm";
import WomanForm from "./womanproduct/WomanForm";
import WomanDetail from "./womanproduct/WomanDetail";

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
