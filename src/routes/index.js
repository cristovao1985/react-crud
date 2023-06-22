import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Product } from "../pages/Product";
import { Products } from "../pages/Products";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Products} />
        <Route path="/product/:id?" Component={Product} />
      </Routes>
    </Router>
  );
};
