import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import ProductDetail from "../pages/productDetail";
import CategoryPage from "../pages/categoryPage";
import Cart from "../pages/cart";
import CheckOut from "../pages/checkOut";
import LoginPage from "../pages/login";
import ProfilePage from "../pages/profile";
import RegisterPage from "../pages/register";
import PrivateRoute from "./privateRoute";
import AdminDashboard from "../admin/adminDashboard";
import Layout from "./layout";
import ManageProducts from "../admin/manageProducts";
import PublicRoute from "./publicRoute";

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          {/* <Route path="/productDetail" element={<ProductDetail />} /> */}
          <Route path="/productDetail/:id" element={<ProductDetail />} />
          <Route path="/categoryPage" element={<CategoryPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkOut" element={<CheckOut />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route element={<Layout />}>
            <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path="/manageProducts" element={<ManageProducts />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default RoutesComponent;
