import { Grid, Box, Typography, Button } from "@mui/material";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/snackBarSlice";

function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activeStyle = {
    backgroundColor: "#333",
    color: "#fff",
    fontSize: "20px",
    padding: "8px 16px",
    textDecoration: "none",
    borderRadius: "5px",
  };

  const inactiveStyle = {
    color: "#fff",
    fontSize: "20px",
    cursor: "pointer",
    textDecoration: "none",
    padding: "8px 16px",
  };

  return (
    <>
      <Grid
        container
        sx={{
          width: "100%",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            width: "20%",
            height: "100%",
            position: "fixed",
            left: 0,
          }}
        >
          <Box
            sx={{
              backgroundColor: "black",
              height: "100%",
              padding: 2,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <Box>
              <Typography
                variant="h5"
                sx={{
                  color: "#fff",
                  fontSize: 33,
                  fontWeight: "bold",
                }}
              >
                Admin Dashboard
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <NavLink
                to="/admin/adminDashboard"
                style={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
              >
                <Typography variant="">DashBoard</Typography>
              </NavLink>

              <NavLink
                to="/admin/manageProducts"
                style={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
              >
                <Typography variant="">Products</Typography>
              </NavLink>

              <NavLink
                to="/admin/manageOrders"
                style={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
              >
                <Typography variant="">Orders</Typography>
              </NavLink>

              <NavLink
                to="/admin/manageUsers"
                style={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
              >
                <Typography variant="">Users</Typography>
              </NavLink>
            </Box>
            <Box
              sx={{
                position: "fixed",
                bottom: "10px",
              }}
            >
              <Button
                onClick={() => {
                  dispatch(
                    openSnackbar({
                      message: "Logout Successfully",
                      severity: "success",
                    })
                  );
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
                variant="contained"
                sx={{
                  borderRadius: 10,
                }}
                color="error"
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              height: "auto",
              width: "80%",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Grid>
    </>
  );
}

export default Layout;
