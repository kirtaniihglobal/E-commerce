import { Grid, Box, Typography, Button } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/snackBarSlice";
import Header from "../components/header/header";

function UserProfileLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <Grid
        container
        // wrap="nowrap"
        sx={{
          width: "100%",
          // height: "100%",
        }}
      >
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
              backgroundColor: "#303030",
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
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                }}
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
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: 20,
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/profile");
                }}
              >
                DashBoard
              </Typography>
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: 20,
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/profile/myAddress");
                }}
              >
                My Address
              </Typography>
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: 20,
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/profile/myOrders");
                }}
              >
                My Orders
              </Typography>
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: 20,
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/profile/myPayments");
                }}
              >
                My Payments
              </Typography>
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: 20,
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/profile/myWallet");
                }}
              >
                My Wallet
              </Typography>
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
