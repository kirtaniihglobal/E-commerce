import { createSlice } from "@reduxjs/toolkit";
import { sendPaymentData } from "../Thunk/paymentThunk";

const initialState = {};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(sendPaymentData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendPaymentData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendPaymentData.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default paymentSlice.reducer;
