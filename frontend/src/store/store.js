import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/authSlice";
import productReducer from "../redux/productSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    product: productReducer,
  },
});
