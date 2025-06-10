import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/authSlice";
import productReducer from "../redux/productSlice";
import snackBarReducer from "../redux/snackBarSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    products: productReducer,
    snackBar: snackBarReducer,
  },
});
