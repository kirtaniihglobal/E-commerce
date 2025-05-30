import { useState } from "react";
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

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const [massage, setMassage] = useState("");
  const [successMassage, setsuccessMassage] = useState("");

  const validationSchema = yup.object({
    fullName: yup
      .string()
      .required("Full name is required")
      .min(3, "Full name must be at least 3 characters")
      .max(50, "Full name must not exceed 50 characters"),
    number: yup
      .string()
      .required("Number is required")
      .matches("^.{10,}$", "Phone number must be not less than 10 numbers"),

    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required")
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/, "Invalid email address"),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),

    confirmPassword: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      fullName: "",
      number: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const match = values.password === values.confirmPassword;
      if (match) {
        try {
          const response = await api.post("/register", values);
          setsuccessMassage("Registration successful");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } catch (error) {
          setMassage("Registration failed");
          setTimeout(() => {
            setMassage("");
          }, 2000);
        }
      } else {
        setMassage("Passwords do not match");
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
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Grid
            Container
            sx={{
              width: "30%",
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
              <Paper elevation={5} sx={{ mt: 3, p: 4, borderRadius: 3 }}>
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
                                fontSize: "20px",
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
                                fontSize: "20px",
                                fontWeight: "bold",
                              }}
                              color="success"
                            >
                              {successMassage}
                            </Typography>
                          )}
                        </Grid>
                        <TextField
                          fullWidth
                          name="fullName"
                          label="Full Name"
                          value={formik.values.fullName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.fullName && formik.errors.fullName
                          }
                          helperText={
                            formik.touched.fullName && formik.errors.fullName
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
                          fullWidth
                          name="number"
                          type="number"
                          label="Mobile Number"
                          value={formik.values.number}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.number && formik.errors.number}
                          helperText={
                            formik.touched.number && formik.errors.number
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
                          fullWidth
                          name="email"
                          label="Email Address"
                          type="email"
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
                          fullWidth
                          name="password"
                          type={showPassword ? "text" : "password"}
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
                      <Grid
                        item
                        xs={12}
                        sx={{
                          width: "100%",
                        }}
                      >
                        <TextField
                          name="confirmPassword"
                          type={showconfirmPassword ? "text" : "password"}
                          fullWidth
                          label="Confirm Password"
                          value={formik.values.confirmPassword}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.confirmPassword &&
                            formik.errors.confirmPassword
                          }
                          helperText={
                            formik.touched.confirmPassword &&
                            formik.errors.confirmPassword
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    setShowconfirmPassword(!showconfirmPassword)
                                  }
                                  edge="end"
                                >
                                  {showconfirmPassword ? (
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
                        // onSubmit={formik.handleSubmit}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, py: 1.5 }}
                      >
                        Register
                      </Button>
                    </Grid>
                  </form>

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
                {/* </Box> */}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
