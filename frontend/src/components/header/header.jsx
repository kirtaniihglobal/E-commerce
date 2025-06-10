import { useState } from "react";
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
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import SnackBar from "../../comon/snackBar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../redux/snackBarSlice";

export default function Header() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);
  const handleSnackClose = () => {
    console.log("snack close");
    setSnackOpen(false);
  };

  const open = Boolean(anchorEl);
  const submenuOpen = Boolean(submenuAnchorEl);

  const handleMainOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMainClose = () => {
    setAnchorEl(null);
    setSubmenuAnchorEl(null);
  };

  const handleSubmenuOpen = (event) => {
    setSubmenuAnchorEl(event.currentTarget);
  };

  const handleSubmenuClose = () => {
    setSubmenuAnchorEl(null);
  };
  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        {/* <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "white",
            textAlign: "center",
            borderRadius: "5px",
            p: 1,
            fontWeight: "500",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" sx={{ mr: 1 }}>
            Sign up and get 20% off to your first order.
            <Link
              onClick={() => navigate("/register")}
              sx={{
                color: theme.palette.white.main,
              }}
            >
              Sign Up Now
            </Link>
          </Typography>
          <ArrowForwardIcon fontSize="small" />
        </Box> */}

        <AppBar
          position="static"
          sx={{
            backgroundColor: theme.palette.background.default,
            boxShadow: "none",
            p: 1,
          }}
        >
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
                    onMouseOver={handleMainOpen}
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    Shop
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMainClose}
                    MenuListProps={{ onMouseLeave: handleMainClose }}
                  >
                    <MenuItem onMouseOver={handleSubmenuOpen}>
                      Men
                      <KeyboardArrowDownIcon fontSize="small" />
                    </MenuItem>

                    <Menu
                      anchorEl={submenuAnchorEl}
                      open={submenuOpen}
                      onClose={handleSubmenuClose}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      MenuListProps={{
                        onMouseLeave: handleSubmenuClose,
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          navigate("/productDetail");
                          onClick = { handleMainClose };
                        }}
                      >
                        T-Shirts
                      </MenuItem>
                      <MenuItem>Shoes</MenuItem>
                    </Menu>

                    <MenuItem onClick={handleMainClose}>Women</MenuItem>
                    <MenuItem onClick={handleMainClose}>Kids</MenuItem>
                  </Menu>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="text">On Sale</Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="text">New Arrivals</Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="text">Brands</Button>
                </Grid>
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
                <ShoppingCartIcon />
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
        </AppBar>
      </Box>
    </>
  );
}
