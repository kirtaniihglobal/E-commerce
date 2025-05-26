import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import ProductDetail from "../pages/productDetail";
import CategoryPage from "../pages/categoryPage";
import Cart from "../pages/cart";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="productDetail" element={<ProductDetail />} />
      <Route path="categoryPage" element={<CategoryPage />} />
      <Route path="cart" element={<Cart />} />
    </Routes>
  );
};
export default RoutesComponent;
