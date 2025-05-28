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
  Avatar,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import api from "../services/api";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [progress, setProgress] = useState(0);

  const [showPassword, setShowPassword] = useState(false);
  const [massage, setMassage] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
    imagePreview: "",
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
        imagePreview: imageUrl,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formSubmitData = new FormData();
    formSubmitData.append("fullName", formData.fullName);
    formSubmitData.append("number", formData.number);
    formSubmitData.append("email", formData.email);
    formSubmitData.append("password", formData.password);
    formSubmitData.append("confirmPassword", formData.confirmPassword);
    formSubmitData.append("profileImage", formData.profileImage);

    try {
      const response = await api.post("/register", formSubmitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMassage(response.data.msg || "Registered successfully!");
      setOpenSnackbar(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMassage(error.response?.data?.msg || "Registration failed");
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xl">
        <CssBaseline />

        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
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
                "Join us today — it’s quick and easy!"
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
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
                    Register
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid
                        item
                        xs={12}
                        sx={{ width: "100%", textAlign: "center" }}
                      >
                        <input
                          accept="image/*"
                          style={{ display: "none" }}
                          id="profile-image-upload"
                          type="file"
                          onChange={handleImageUpload}
                        />
                        <label htmlFor="profile-image-upload">
                          <IconButton component="span">
                            <Avatar
                              src={formData.imagePreview || ""}
                              sx={{ width: 80, height: 80 }}
                            />
                          </IconButton>
                        </label>
                        {formData.profileImage && (
                          <Typography variant="caption" display="block">
                            {formData.profileImage.name}
                          </Typography>
                        )}

                        <Typography variant="caption" display="block">
                          Upload Profile Image
                        </Typography>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        sx={{
                          width: "100%",
                        }}
                      >
                        <TextField
                          name="fullName"
                          required
                          fullWidth
                          label="Full Name"
                          value={formData.fullName}
                          onChange={handleChange}
                          autoFocus
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
                          name="number"
                          type="number"
                          required
                          fullWidth
                          label="Mobile Number"
                          value={formData.number}
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
                      <Grid
                        item
                        xs={12}
                        sx={{
                          width: "100%",
                        }}
                      >
                        <TextField
                          name="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          required
                          fullWidth
                          label="Confirm Password"
                          value={formData.confirmPassword}
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
                      Register
                    </Button>
                    <Grid>
                      <Typography textAlign="center" variant="body1">
                        Already have an account?{" "}
                        <Link
                          href="Login"
                          underline="hover"
                          fontWeight="bold"
                          sx={{}}
                        >
                          Login
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
       <Snackbar
              open={openSnackbar}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              sx={{ width: "500px", height: "200px", }}
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
    </>
  );
}
