import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/authSlice";
import {
  Button,
  Box,
  Grid,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useTheme, useMediaQuery } from "@mui/material";
import { openSnackbar } from "../../redux/snackBarSlice";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTab = useMediaQuery(theme.breakpoints.down("md"));
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);

  const validationSchema = yup.object({
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
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { password, confirmPassword } = values;
      const match = password === confirmPassword;
      if (match) {
        try {
          console.log(password);
          await dispatch(resetPassword({ password, token })).unwrap();
          navigate("/login");
        } catch (error) {}
      } else {
        dispatch(
          openSnackbar({
            massage: "Passwords do not match",
            severity: "error",
          })
        );
      }
    },
  });

  return (
    <Box
      sx={{
        width: "100%",
        height: isMobile ? "400px" : "600px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: isMobile ? "80%" : isTab ? "50%" : "25%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            border: "2px solid black",
            borderRadius: 3,
            p: isMobile ? 2 : isTab ? 2 : 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant={isMobile ? "h5" : "h4"}>
              Password
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  <TextField
                    fullWidth
                    name="password"
                    type={showPassword ? "text" : "password"}
                    label="New Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && formik.errors.password}
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
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box
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
                </Box>

                <Button
                  className="black"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 1, py: 1.5 }}
                >
                  Reset
                </Button>
              </Grid>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ResetPassword;
