import { createAsyncThunk } from "@reduxjs/toolkit";
import { addOrderAPI, cancelOrderAPI, getAllOrderAPI, getAllOrderAdminAPI, updateOrderAdminAPI } from "../apis/orderAPI";
import { openSnackbar } from "../redux/snackBarSlice";
import { clearCart } from "../redux/cartSlice";
import { deleteOrder } from "../redux/orderSlice";




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
export const getAllOrderAdminData = createAsyncThunk(
    "order/getAllOrderAdmin",
    async (status, { dispatch, rejectWithValue }) => {
        try {
            console.log(status)
            const response = await getAllOrderAdminAPI(status);
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
export const updateOrderAdminData = createAsyncThunk(
    "order/updateOrderAdmin",
    async (id, { dispatch, rejectWithValue }) => {
        try {
            console.log(id)
            const response = await updateOrderAdminAPI(id);
            dispatch(openSnackbar({ massage: `Order Update Successfully`, severity: "success" }));
            console.log(response.updateOrder);
            return response.updateOrder;

        } catch (error) {
            // console.log(error);
            dispatch(openSnackbar({ massage: error.response.data.msg || "Failed to Add", severity: "error" }));
            return rejectWithValue(error.response?.data.msg);
        }
    }
);
export const cancelOrderData = createAsyncThunk(
    "order/cancelOrder",
    async (id, { dispatch, rejectWithValue }) => {
        try {
            // console.log(id)
            const response = await cancelOrderAPI(id);
            dispatch(openSnackbar({ massage: `Order Canceled Successfully`, severity: "success" }));
            console.log(response.updateOrder)
            return response.updateOrder;

        } catch (error) {
            // console.log(error);
            dispatch(openSnackbar({ massage: error.response.data.msg || "Failed to Cancel", severity: "error" }));
            return rejectWithValue(error.response?.data.msg);
        }
    }
);