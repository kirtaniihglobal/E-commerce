import { Grid, Box, Typography, Button } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/snackBarSlice";

function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <Grid
        container
        wrap="nowrap"
        sx={{
          width: "100%",
          height: "1200px",
        }}
      >
        <Grid>
          <Box
            sx={{
              backgroundColor: "black",
              height: "100%",
              padding: 2,
              display: "flex",
              flexDirection: "column",
              gap: 6,
              color: "#fff",
            }}
          >
            <Box>
              <Typography
                variant=""
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
                gap: 4,
              }}
            >
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: 20,
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/adminDashboard");
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
                  navigate("/manageProducts");
                }}
              >
                Products
              </Typography>
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
                      massage: "Logout SuccessFully",
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
        </Grid>
        <Grid>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              // p: 2,
            }}
          >
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Layout;
