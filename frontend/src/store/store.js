import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/authSlice";
import productReducer from "../redux/productSlice";
import snackBarReducer from "../redux/snackBarSlice";
import cartReducer from "../redux/cartSlice";
import orderReducer from "../redux/orderSlice";
import ratingReducer from "../redux/ratingSlice";
import adminReducer from "../redux/adminSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    products: productReducer,
    snackBar: snackBarReducer,
    cart: cartReducer,
    order: orderReducer,
    admin: adminReducer,
    rating: ratingReducer
  },
});
