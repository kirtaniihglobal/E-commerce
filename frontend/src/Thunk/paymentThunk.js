import { createAsyncThunk } from "@reduxjs/toolkit";
import { paymentAPI } from "../apis/paymentAPI";

export const sendPaymentData = createAsyncThunk(
  "payment/sendPayment",
  async ({ orderId }) => {
    console.log(orderId);
    const response = await paymentAPI({orderId});
    console.log(response.data);
    return response.data;
  }
);
