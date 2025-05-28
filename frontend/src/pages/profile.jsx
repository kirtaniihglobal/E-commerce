import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Snackbar,
  LinearProgress,
  Box,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import api from "../services/api";
import Header from "../components/header/header";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [progress, setProgress] = useState(0);
  const [massage, setMassage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/profile")
      .then((res) => setUser(res.data))
      .catch(() => {
        setMassage("Failed to load profile");
        setOpenSnackbar(true);
      });
  }, []);

  useEffect(() => {
    if (openSnackbar) {
      let timer;
      let progressValue = 0;

      const interval = setInterval(() => {
        progressValue += 1;
        setProgress(progressValue);
        if (progressValue >= 100) {
          clearInterval(interval);
          timer = setTimeout(() => {
            setOpenSnackbar(false);
          }, 500);
        }
      }, 20);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [openSnackbar]);

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      setMassage("Logout successfully!");
      setUser(null);
      setOpenSnackbar(true);
      setTimeout(() => navigate("/logout"), 2000);
    } catch (error) {
      setMassage("Logout failed");
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 10 }}>
        <Snackbar
          open={openSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{ width: "500px", height: "200px" }}
        >
          <MuiAlert
            elevation={6}
            variant="standard"
            severity="success"
            sx={{
              width: "100%",
              color: "#000",
              backgroundColor: "#f0f0f0",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {massage}
            <LinearProgress
              variant="determinate"
              value={progress}
              color="success"
              sx={{
                width: "500px",
                mt: 1,
                height: 10,
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1,
              }}
            />
          </MuiAlert>
        </Snackbar>

        {user && (
          <Card sx={{ p: 4, textAlign: "center", boxShadow: 3 }}>
            <Avatar
              alt="Profile"
              src={`http://192.168.2.222:5000/uploads/${user.profileImage}`}
              sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
            />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {user.fullName}
              </Typography>
              <Typography variant="body1">{user.number}</Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
              <Box mt={3}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>
    </>
  );
}
