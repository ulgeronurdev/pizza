import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import OrderPage from "./pages/OrderPage.jsx";
import SuccessPage from "./pages/SuccessPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="siparis" element={<OrderPage />} />
        <Route path="tesekkurler" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
