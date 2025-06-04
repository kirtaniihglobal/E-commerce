import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/authSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
  },
});
