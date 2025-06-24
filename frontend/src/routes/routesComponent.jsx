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
import Layout from "../layout/layout";
import ManageProducts from "../admin/manageProducts";
import PublicRoute from "./publicRoute";
import OrderDetailPage from "../pages/orderDetailPage";
import UserProfileLayout from "../layout/userSideBarLayout";
import MyAddress from "../components/profile/myAddress";
import MyOrders from "../components/profile/myOrders";

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
          <Route path="/productDetail/:id" element={<ProductDetail />} />
          <Route path="/categoryPage" element={<CategoryPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkOut" element={<CheckOut />} />
          <Route element={<Layout />}>
            <Route path="/admin/adminDashboard" element={<AdminDashboard />} />
            <Route path="/admin/manageProducts" element={<ManageProducts />} />
          </Route>
          <Route element={<UserProfileLayout />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/myAddress" element={<MyAddress />} />
            <Route path="/profile/myOrders" element={<MyOrders />} />
            <Route
              path="/profile/orderDetailPage"
              element={<OrderDetailPage />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default RoutesComponent;
