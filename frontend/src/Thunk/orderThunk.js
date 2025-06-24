import { createAsyncThunk } from "@reduxjs/toolkit";
import { addOrderAPI, getAllOrderAPI } from "../apis/orderAPI";
import { openSnackbar } from "../redux/snackBarSlice";
import { clearCart } from "../redux/cartSlice";




export const addOrderData = createAsyncThunk(
    "order/addOrder",
    async (values, { dispatch, rejectWithValue }) => {
        try {
            const response = await addOrderAPI(values);
            dispatch(clearCart())
            dispatch(openSnackbar({ massage: `Order Place Successfully`, severity: "success" }));
            // console.log(response.newOrder._id);
            return response;

        } catch (error) {
            // console.log(error);
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
            // dispatch(openSnackbar({ massage: `Order Place Successfully`, severity: "success" }));
            console.log(response);
            return response;

        } catch (error) {
            // console.log(error);
            dispatch(openSnackbar({ massage: error.response.data.msg || "Failed to Add", severity: "error" }));
            return rejectWithValue(error.response?.data.msg);
        }
    }
);