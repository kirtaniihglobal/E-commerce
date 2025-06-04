import { Navigate, Outlet } from "react-router-dom";
import { fetchUser } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const PublicRoute = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(fetchUser());
    } else {
    }
  }, [dispatch]);

  if (token && user?.role === "admin") {
    return <Navigate to="/adminDashboard" />;
  } else if (token && user?.role === "user") {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};

export default PublicRoute;
