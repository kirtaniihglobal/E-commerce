import { createAsyncThunk } from "@reduxjs/toolkit";
import { addOrderAPI, cancelOrderAPI, getAllOrderAPI } from "../apis/orderAPI";
import { openSnackbar } from "../redux/snackBarSlice";
import { clearCart } from "../redux/cartSlice";




export const addOrderData = createAsyncThunk(
    "order/addOrder",
    async (values, { dispatch, rejectWithValue }) => {
        try {
            const response = await addOrderAPI(values);
            dispatch(clearCart())
            dispatch(openSnackbar({ massage: `Order Place Successfully`, severity: "success" }));
            return response;

        } catch (error) {
            dispatch(openSnackbar({ massage: error.response.data.msg || "Failed to Add", severity: "error" }));
            return rejectWithValue(error.response?.data.msg);
        }
    }
);
export const getAllOrderData = createAsyncThunk(
    "order/getAllOrder",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await getAllOrderAPI();
            console.log(response)
            return response;


        } catch (error) {
            dispatch(openSnackbar({ massage: error.response.data.msg || "Failed to Add", severity: "error" }));
            return rejectWithValue(error.response?.data.msg);
        }
    }
);

export const cancelOrderData = createAsyncThunk(
    "order/cancelOrder",
    async (id, { dispatch, rejectWithValue }) => {
        try {
            console.log(id)
            const response = await cancelOrderAPI(id);
            dispatch(openSnackbar({ massage: `Order Canceled Successfully`, severity: "success" }));
            return response.updateOrder;

        } catch (error) {
            dispatch(openSnackbar({ massage: error.response.data.msg || "Failed to Cancel", severity: "error" }));
            return rejectWithValue(error.response?.data.msg);
        }
    }
);