import { Grid, Box, Typography } from "@mui/material";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/snackBarSlice";
import Header from "../components/header/header";

function UserProfileLayout() {
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
      <Header />
      <Grid container sx={{ width: "100%" }}>
        <Grid
          sx={{
            width: "20%",
            height: "100%",
            position: "fixed",
            left: 0,
          }}
        >
          <Box
            sx={{
              backgroundColor: "#000",
              height: "100%",
              padding: 2,
              display: "flex",
              flexDirection: "column",
              gap: 5,
              color: "#fff",
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{ color: "#fff", fontWeight: "bold" }}
              >
                My Profile
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
                to="/profile/myProfile"
                style={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
              >
                DashBoard
              </NavLink>
              <NavLink
                to="/profile/myAddress"
                style={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
              >
                My Address
              </NavLink>
              <NavLink
                to="/profile/myOrders"
                style={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
              >
                My Orders
              </NavLink>
              <NavLink
                to="/profile/myPayments"
                style={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
              >
                My Payments
              </NavLink>
              <NavLink
                to="/profile/myWallet"
                style={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
              >
                My Wallet
              </NavLink>

              <Typography
                onClick={() => {
                  dispatch(
                    openSnackbar({
                      massage: "Logout SuccessFully",
                      severity: "success",
                    })
                  );
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
                sx={{
                  color: "#fff",
                  fontSize: 20,
                  cursor: "pointer",
                }}
              >
                Logout
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid sx={{ width: "80%", right: 0 }}>
          <Box
            sx={{
              ml: 35,
              width: "100%",
              height: "100%",
            }}
          >
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default UserProfileLayout;
