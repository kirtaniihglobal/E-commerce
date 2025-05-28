import { useState, useEffect } from "react";
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
  Link,
  InputBase,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

import { useNavigate } from "react-router";

export default function Header() {
  const theme = useTheme();
  const { token } = useContext(AuthContext);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [progress, setProgress] = useState(0);
  const [massage, setMassage] = useState("");
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null); // Main menu
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null); // Submenu for "Men"

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
  const handelLogout = () => {
    // navigate("/logout");
    try {
      localStorage.removeItem("token");
      // setUser(null);
      setMassage("Logout successfully!");
      setOpenSnackbar(true);

      setTimeout(() => navigate("/logout"), 2000);
    } catch (error) {
      setMassage("Logout failed");
      setOpenSnackbar(true);
    }
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
        <Box
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
        </Box>

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
                    window.location.href = "/";
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

                  {/* Main Menu */}
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMainClose}
                    MenuListProps={{ onMouseLeave: handleMainClose }}
                  >
                    {/* Nested Item: Men */}
                    <MenuItem
                      onMouseOver={handleSubmenuOpen}
                      // onMouseLeave={handleSubmenuClose}
                    >
                      Men
                      <KeyboardArrowDownIcon fontSize="small" />
                    </MenuItem>

                    {/* Submenu for "Men" */}
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
                  // navigate("/register");
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
                    <Button variant="outlined"
                    className="white"
                     sx={{
                          borderRadius: "50px",
                          p: "5px  40px",
                        }}
                      onClick={() => {
                        handelLogout();
                      }}
                    >
                      Logout
                    </Button>,
                  ]
                : [
                    <>
                      <Button
                        variant="outlined"
                        className="white"
                        sx={{
                          borderRadius: "50px",
                          p: "5px  40px",
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
                    </>,
                  ]}
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ width: "500px", height: "200px" }}
      >
        <MuiAlert
          elevation={6}
          variant="standard"
          severity="error"
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
            color="error"
            sx={{
              width: "500px",
              mt: 1,
              height: 10,
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
            }}
          />
        </MuiAlert>
      </Snackbar>
    </>
  );
}
