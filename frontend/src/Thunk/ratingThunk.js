import { createAsyncThunk } from "@reduxjs/toolkit";
// import { openSnackbar } from "../redux/snackBarSlice";
import { addRatingAPI, getUserRatingAPI, updateUserRatingAPI } from "../apis/ratingAPI";
import { openSnackbar } from "../redux/snackBarSlice";
import { ratingUpdate } from "../redux/productSlice";





export const addRatingData = createAsyncThunk(
    "rating/addrating",
    async (values, { dispatch }) => {
        try {
            console.log(values)
            // console.log(rating)
            const response = await addRatingAPI(values);
            dispatch(ratingUpdate(response))
            dispatch(openSnackbar({ massage: "Rating Submitted SuccessFully", severity: "success" }))

            console.log(response)
            return response;

        } catch (error) {
            console.log(error)
            return error.response?.data || "Failed to fetch Products";
        }
    }
);
export const getUserRatingData = createAsyncThunk(
    "rating/getUserrating",
    async (id) => {
        try {
            console.log(id)
            const response = await getUserRatingAPI(id);

            console.log(response)
            return response;

        } catch (error) {
            console.log(error)
            return error.response?.data || "Failed to fetch Products";
        }
    }
);
export const updateUserRatingData = createAsyncThunk(
    "rating/updateUserrating",
    async (values, { dispatch }) => {
        try {
            // console.log(id)
            console.log(values)
            const response = await updateUserRatingAPI(values);
            dispatch(ratingUpdate(response))
            dispatch(openSnackbar({ massage: "Rating Update SuccessFully", severity: "success" }))
            console.log(response)
            return response;

        } catch (error) {
            console.log(error)
            return error.response?.data || "Failed to fetch Products";
        }
    }
);