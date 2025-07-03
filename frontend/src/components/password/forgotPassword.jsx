import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/authSlice";
import { TextField, Box, Typography, Grid, Button } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTab = useMediaQuery(theme.breakpoints.down("md"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };

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
              Email
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Box
                  sx={{
                    width: "100%",
                    mt: 3,
                  }}
                >
                  <TextField
                    name="email"
                    type="email"
                    fullWidth
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Box>

                <Button
                  className="black"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 1, py: 1.5 }}
                >
                  Send
                </Button>
              </Grid>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ForgotPassword;
