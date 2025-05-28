// RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/header";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Paper,
  Link,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect } from "react";
import api from "../services/api";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [massage, setMassage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
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
          }, 500); // Optional delay after bar completes
        }
      }, 20); // 20ms * 100 = 2000ms = 2 seconds

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [openSnackbar]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", formData, {
        mathod: "POST",
        headers: {
          "Content-Type": " application/json",
        },
        data: formData,
      });
      setMassage(response.data.msg || "Login successfully!");
      login(response.data.token);
      setOpenSnackbar(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setMassage(error.response?.data?.msg || "Login failed");
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Header />
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

      <Container component="main" maxWidth="xl">
        <CssBaseline />

        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "590px",
          }}
        >
          <Grid
            Container
            sx={{
              width: "35%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end",
              gap: "20px",
            }}
          >
            <Grid item xs={12}>
              <Typography variant="h2">SHOP.CO</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">
                "Welcome back! Please log in to continue."
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{
              width: "50%",
              height: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                width: "60%",
              }}
            >
              <Paper elevation={3} sx={{ mt: 1, p: 3, borderRadius: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography component="h1" variant="h4">
                    Login
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          width: "100%",
                        }}
                      >
                        <TextField
                          name="email"
                          type="email"
                          required
                          fullWidth
                          label="Email Address"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          width: "100%",
                        }}
                      >
                        <TextField
                          name="password"
                          type={showPassword ? "text" : "password"}
                          required
                          fullWidth
                          label="Password"
                          value={formData.password}
                          onChange={handleChange}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowPassword(!showPassword)}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid>
                        <Link href="#" underline="hover" sx={{}}>
                          Forgot Password?
                        </Link>
                      </Grid>
                    </Grid>
                    <Button
                      className="black"
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, py: 1.5 }}
                    >
                      Login
                    </Button>
                    <Grid>
                      <Typography textAlign="center" variant="body1">
                        Don’t have an account?{" "}
                        <Link
                          href="register"
                          underline="hover"
                          fontWeight="bold"
                          sx={{}}
                        >
                          Register Now
                        </Link>
                      </Typography>
                    </Grid>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
