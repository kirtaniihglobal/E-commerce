import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import ProductDetail from "../pages/productDetail";
import CategoryPage from "../pages/categoryPage";
import Cart from "../pages/cart";
import LoginPage from "../pages/login";
import ProfilePage from "../pages/profile";
import RegisterPage from "../pages/register";
import { AuthProvider } from "../context/authContext";
import PrivateRoute from "./privateRoute";
import Logout from "../pages/logout";

const RoutesComponent = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="productDetail" element={<ProductDetail />} />
        <Route path="categoryPage" element={<CategoryPage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="logout"
          element={
            <PrivateRoute>
              <Logout />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};
export default RoutesComponent;
