import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  Typography,
  Stack,
  IconButton,
  Drawer,
  Grid,
  Link,
  InputBase,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router";
import logo from "../../assets/react.svg";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
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
          p: 2,
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
              <Typography variant="h2">SHOP.CO</Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button variant="text">
                  shop
                  <KeyboardArrowDownIcon />
                </Button>
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
                navigate("/SignUp");
              }}
            >
              <ShoppingCartIcon />
            </Button>
            <Button
              onClick={() => {
                navigate("/Login");
              }}
            >
              <AccountCircleIcon />
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
