import {
  Grid,
  Box,
  Typography,
  Button,
  // useMediaQuery,
  // useTheme,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Inventory2 as ProductsIcon,
  ShoppingCart as OrdersIcon,
  People as UsersIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/snackBarSlice";
import { useState } from "react";

function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    {
      label: "Dashboard",
      path: "/admin/adminDashboard",
      icon: <DashboardIcon />,
    },
    {
      label: "Products",
      path: "/admin/manageProducts",
      icon: <ProductsIcon />,
    },
    { label: "Orders", path: "/admin/manageOrders", icon: <OrdersIcon /> },
    { label: "Users", path: "/admin/manageUsers", icon: <UsersIcon /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(
      openSnackbar({ massage: "Logout Successfully", severity: "success" })
    );
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <Grid container sx={{ width: "100%", height: "100vh" }}>
        <Box
          onMouseEnter={() => setSidebarOpen(true)}
          onMouseLeave={() => setSidebarOpen(false)}
          sx={{
            width: sidebarOpen ? 220 : 50,
            backgroundColor: "#000",
            color: "#fff",
            height: "95%",
            position: "fixed",
            left: 0,
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            transition: "width 0.3s",
            zIndex: 1200,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#fff",
              textAlign: "center",
            }}
          >
            {sidebarOpen ? "Admin" : "AD"}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 2,
              mt: 2,
            }}
          >
            {navItems.map(({ label, path, icon }) => {
              return (
                <Button
                  key={label}
                  onClick={() => navigate(path)}
                  sx={{
                    backgroundColor:
                      sidebarOpen && isActive(path) ? "#333" : "transparent",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: sidebarOpen ? "flex-start" : "center",
                    borderRadius: sidebarOpen ? 1 : 10,
                    textTransform: "none",
                    minWidth: 0,
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor:
                        !sidebarOpen && isActive(path) ? "#333" : "transparent",
                      borderRadius: "50%",
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {icon}
                  </Box>
                  {sidebarOpen && (
                    <Typography variant="" sx={{ ml: 1, fontSize: 16 }}>
                      {label}
                    </Typography>
                  )}
                </Button>
              );
            })}
          </Box>

          <Box sx={{ mt: "auto" }}>
            <Button
              onClick={handleLogout}
              variant="contained"
              color="error"
              fullWidth
              sx={{
                borderRadius: 10,
                justifyContent: sidebarOpen ? "flex-start" : "center",
                px: sidebarOpen ? 2 : 0,
                minWidth: 0,
                display: "flex",
                alignItems: "center",
                gap: sidebarOpen ? 1 : 0,
              }}
            >
              <LogoutIcon />
              {sidebarOpen && "Logout"}
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            ml: sidebarOpen ? "240px" : "70px",
            transition: "margin 0.3s",
          }}
        >
          <Box sx={{ width: "100%", p: 2 }}>
            <Outlet />
          </Box>
        </Box>
      </Grid>
    </>
  );
}

export default Layout;
