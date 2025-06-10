import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { theme } from "./theme/theme.js";
import SnackBar from "./comon/snackBar.jsx";
import App from "./App.jsx";
import "./App.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <SnackBar />
      <App />
    </ThemeProvider>
  </Provider>
);
