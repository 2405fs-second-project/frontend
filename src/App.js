import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Cart, Product, Login, Order, Home } from "./pages";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
