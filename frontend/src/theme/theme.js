import { createTheme } from "@mui/material/styles";
import { MuiButton } from "./ThemeComponent";
import { MuiTypography } from "./ThemeComponent";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
      light: "#333",
    },
    white: {
      main: "#ffff",
    },
  },
  components: {
    MuiButton,
    MuiTypography,
  },

  breakpoints: {
    xs: 375,
    ssm: 541,
    sm: 769,
    md: 931,
    lg: 1240,
    xl: 1440,
    xxl: 1536,
  },
});

export default theme;
