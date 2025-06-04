import { Grid, Drawer, Box, Typography, Button } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SnackBar from "../comon/snackBar";
import { useState } from "react";

function Layout() {
  const navigate = useNavigate();
  const [snackMessage, setSnackMessage] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState("success");

  const handleSnackClose = () => {
    console.log("snack close");
    setSnackOpen(false);
  };
  return (
    <>
      <Grid
        container
        sx={{
          width: "100%",
          height: "800px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            // width: "25%",
            backgroundColor: "black",
            height: "100%",
            boxSizing: "border-box",
            backgroundColor: "#000",
            padding: 2,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            color: "#fff",
            position: "fixed",
            left: 0,
            top: 0,
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
              position: "absolute",
              bottom: "10px",
            }}
          >
            <Button
              onClick={() => {
                setSnackMessage("Logout SuccessFully");
                setSnackSeverity("error");
                setSnackOpen(true);
                localStorage.removeItem("token");
                setTimeout(() => {
                  navigate("/login");
                }, 500);
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
        <Box
          sx={{
            ml: 40,
            width: "75%",
          }}
        >
          <Outlet />
        </Box>
      </Grid>
      <SnackBar
        open={snackOpen}
        message={snackMessage}
        severity={snackSeverity}
        handleClose={handleSnackClose}
      />
    </>
  );
}

export default Layout;
