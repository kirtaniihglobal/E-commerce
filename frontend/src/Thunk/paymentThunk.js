import { createAsyncThunk } from "@reduxjs/toolkit";
import { paymentAPI } from "../apis/paymentAPI";

export const sendPaymentData = createAsyncThunk(
  "payment/sendPayment",
  async ({ orderId }) => {
    const response = await paymentAPI({ orderId });
    return response.data;
  }
);
