import { createAsyncThunk } from "@reduxjs/toolkit";
import { addProductAPI, getAllproductsAPI, updateProductAPI, deleteProductAPI, getOneproductAPI } from "../apis/productsAPI";
import { openSnackbar } from "../redux/snackBarSlice";


export const getAllproductsData = createAsyncThunk(
    "products/getAllProducts",
    async () => {
        try {
            const response = await getAllproductsAPI();
            return response;

        } catch (error) {
            return error.response?.data || "Failed to fetch Products";
        }
    }
);
export const getOneproductData = createAsyncThunk(
    "products/getOneproduct",
    async (id) => {
        try {
            // console.log(id)
            const response = await getOneproductAPI(id);
            // console.log(response)
            return response.data;

        } catch (error) {
            return error.response?.data || "Failed to fetch Products";
        }
    }
);
export const addProductData = createAsyncThunk(
    "products/addProduct",
    async (values, { dispatch, rejectWithValue }) => {
        try {
            const response = await addProductAPI(values);
            dispatch(openSnackbar({ massage: "Product Add Successfully", severity: "success" }));
            return response;

        } catch (error) {
            console.log(error);
            dispatch(openSnackbar({ massage: error.response.data.msg || "Failed to Add", severity: "error" }));
            return rejectWithValue(error.response?.data.msg);
        }
    }
);
export const updateProductData = createAsyncThunk(
    "products/updateProduct",
    async ({ id, values }, { dispatch, rejectWithValue }) => {
        try {
            // console.log(values)
            const response = await updateProductAPI(id, values);
            dispatch(openSnackbar({ massage: "Product Update Successfully", severity: "success" }));
            return response;

        } catch (error) {
            dispatch(openSnackbar({ massage: "Failed to Update Product", severity: "error" }));
            return rejectWithValue(error.response?.data.msg || "Failed to fetch Products");
        }
    }
);
export const deleteProductData = createAsyncThunk(
    "products/deleteProduct",
    async (id, { dispatch, rejectWithValue }) => {
        try {
            // console.log(id)
            const response = await deleteProductAPI(id);
            dispatch(openSnackbar({ massage: "Product Delete Successfully", severity: "success" }));
            return response;

        } catch (error) {
            return rejectWithValue(error.response?.data.msg || "Failed to fetch Products");
        }
    }
);