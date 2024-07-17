import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WomanForm from "./womanproduct/WomanForm";
import WomanDetail from "./womanproduct/WomanDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WomanForm />} />
        <Route path="/womandetailone" element={<WomanDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
