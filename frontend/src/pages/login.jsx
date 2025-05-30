import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
import { useFormik } from "formik";
import * as yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import api from "../services/api";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [massage, setMassage] = useState("");
  const [successMassage, setsuccessMassage] = useState("");

  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await api.post("/login", values);
        const { user } = response.data;
        if (user.role === "admin") {
          setsuccessMassage("Admin Login Successfull");
          login(user);
          setTimeout(() => {
            navigate("/adminDashboard");
          }, 2000);
        } else {
          setsuccessMassage("User Login Successfull");
          login(user);
          setTimeout(() => navigate("/"), 2000);
        }
      } catch (error) {
        setMassage("Invalid email or password");
        setTimeout(() => setMassage(""), 2000);
      }
    },
  });
  return (
    <>
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
                  <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          width: "100%",
                        }}
                      >
                        <Grid
                          sx={{
                            mb: 2,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {massage ? (
                            <Typography
                              variant=""
                              sx={{
                                fontSize: "23px",
                                fontWeight: "bold",
                              }}
                              color="error"
                            >
                              {massage}
                            </Typography>
                          ) : (
                            <Typography
                              variant=""
                              sx={{
                                fontSize: "23px",
                                fontWeight: "bold",
                              }}
                              color="success"
                            >
                              {successMassage}
                            </Typography>
                          )}
                        </Grid>
                        <TextField
                          name="email"
                          type="email"
                          fullWidth
                          label="Email Address"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.email && formik.errors.email}
                          helperText={
                            formik.touched.email && formik.errors.email
                          }
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
                          fullWidth
                          label="Password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.password && formik.errors.password
                          }
                          helperText={
                            formik.touched.password && formik.errors.password
                          }
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
                      <Button
                        className="black"
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, py: 1.5 }}
                      >
                        Login
                      </Button>
                    </Grid>
                  </form>
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
                {/* </Box> */}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
