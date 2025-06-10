import { Snackbar, Alert } from "@mui/material";
import { closeSnackbar } from "../redux/snackBarSlice";
import { useSelector, useDispatch } from "react-redux";

const SnackBar = () => {
  const dispatch = useDispatch();
  const hideSnackbar = () => {
    dispatch(closeSnackbar());
  };
  const { isOpen, massage, severity } = useSelector((state) => state.snackBar);
  // console.log(isOpen);
  // console.log(massage);
  // console.log(severity);
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={2000}
      onClose={hideSnackbar}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={hideSnackbar} severity={severity} sx={{ width: "100%" }}>
        {massage}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
