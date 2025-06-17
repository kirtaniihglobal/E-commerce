import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  useTheme,
  Menu,
  MenuItem,
  Typography,
  Stack,
  Grid,
  InputBase,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import SnackBar from "../../comon/snackBar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../../redux/snackBarSlice";
import { getAllCartData } from "../../Thunk/cartThunk";

export default function Header() {
  const theme = useTheme();
  const { cartData } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const navBarHalf =
    location.pathname.startsWith("/productDetail") ||
    location.pathname.startsWith("/categoryPage");

  useEffect(() => {
    dispatch(getAllCartData());
  }, [dispatch]);

  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <AppBar
          position="static"
          sx={{
            backgroundColor: theme.palette.background.default,
            boxShadow: "none",
            p: 1,
          }}
        >
          {!navBarHalf ? (
            <Toolbar
              sx={{
                height: "50px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                sx={{ width: "50%" }}
                gap={{ md: 3, lg: 4, xl: 2 }}
              >
                <Box>
                  <Typography
                    variant="h3"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    SHOP.CO
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="text"
                      onClick={() => {
                        navigate("/categoryPage");
                      }}
                      endIcon={<KeyboardArrowDownIcon />}
                    >
                      Shop
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <Button
                      variant="text"
                      onClick={() => {
                        navigate("/checkOut");
                      }}
                    >
                      On Sale
                    </Button> */}
                  </Grid>
                  {/* <Grid item xs={12} sm={6}>
                    <Button variant="text">New Arrivals</Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button variant="text">Brands</Button>
                  </Grid> */}
                </Grid>
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                sx={{
                  width: "50%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
                gap={{}}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#f1f1f1",
                    borderRadius: "50px",
                    padding: "6px 16px",
                    maxWidth: 500,
                    width: "100%",
                  }}
                >
                  <SearchIcon sx={{ color: "#888", mr: 1 }} />
                  <InputBase
                    placeholder="Search for products..."
                    fullWidth
                    sx={{
                      color: "#333",
                      "& .MuiInputBase-input": {
                        padding: 0,
                      },
                    }}
                  />
                </Box>
                <Button
                  onClick={() => {
                    navigate("/Cart");
                  }}
                >
                  <Badge badgeContent={cartData.length} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </Button>
                {token
                  ? [
                      <Button
                        onClick={() => {
                          navigate("/profile");
                        }}
                      >
                        <AccountCircleIcon />
                      </Button>,
                      <Button
                        variant="outlined"
                        className="white"
                        sx={{
                          borderRadius: "50px",
                          p: "5px  40px",
                        }}
                        onClick={() => {
                          dispatch(
                            openSnackbar({
                              massage: "Logout Successfully",
                              severity: "success",
                            })
                          );
                          localStorage.removeItem("token");
                          navigate("/login");
                        }}
                      >
                        Logout
                      </Button>,
                    ]
                  : [
                      <>
                        <Grid
                          sx={{
                            display: "flex",
                            gap: 2,
                          }}
                        >
                          <Button
                            variant="outlined"
                            className="white"
                            sx={{
                              borderRadius: "50px",
                              p: "5px  50px",
                            }}
                            onClick={() => {
                              navigate("/register");
                            }}
                          >
                            Register
                          </Button>
                          <Button
                            variant="outlined"
                            className="white"
                            sx={{
                              borderRadius: "50px",
                              p: "5px 40px",
                            }}
                            onClick={() => {
                              navigate("/login");
                            }}
                          >
                            {" "}
                            Login
                          </Button>
                        </Grid>
                      </>,
                    ]}
              </Stack>
            </Toolbar>
          ) : (
            <Toolbar
              sx={{
                height: "50px",
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                gap={{ md: 3, lg: 4, xl: 2 }}
              >
                <Box>
                  <Typography
                    variant="h3"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    SHOP.CO
                  </Typography>
                </Box>
                <Box>
                  <Button
                    onClick={() => {
                      navigate("/Cart");
                    }}
                  >
                    <Badge badgeContent={cartData.length} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  </Button>
                  {token
                    ? [
                        <Button
                          onClick={() => {
                            navigate("/profile");
                          }}
                        >
                          <AccountCircleIcon />
                        </Button>,
                        <Button
                          variant="outlined"
                          className="white"
                          sx={{
                            borderRadius: "50px",
                            p: "5px  30px",
                          }}
                          onClick={() => {
                            dispatch(
                              openSnackbar({
                                massage: "Logout Successfully",
                                severity: "success",
                              })
                            );
                            localStorage.removeItem("token");
                            navigate("/login");
                          }}
                        >
                          Logout
                        </Button>,
                      ]
                    : [
                        <>
                          <Grid
                            sx={{
                              display: "flex",
                              gap: 2,
                            }}
                          >
                            <Button
                              variant="outlined"
                              className="white"
                              sx={{
                                borderRadius: "50px",
                                p: "5px  50px",
                              }}
                              onClick={() => {
                                navigate("/register");
                              }}
                            >
                              Register
                            </Button>
                            <Button
                              variant="outlined"
                              className="white"
                              sx={{
                                borderRadius: "50px",
                                p: "5px 40px",
                              }}
                              onClick={() => {
                                navigate("/login");
                              }}
                            >
                              {" "}
                              Login
                            </Button>
                          </Grid>
                        </>,
                      ]}
                </Box>
              </Stack>
            </Toolbar>
          )}
        </AppBar>
      </Box>
    </>
  );
}
