import { createSlice } from "@reduxjs/toolkit";
import { addRatingData, getOneProductRatingData, getUserRatingData, updateUserRatingData } from "../Thunk/ratingThunk";



const initialState = {
    UserProductRatingData: {},
    OneProductRatingData: [],
};

const ratingSlice = createSlice({
    name: 'rating',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            /*************************************addRatingData**************************/
            .addCase(addRatingData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addRatingData.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addRatingData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching Products";
            })
            /*************************************getUserRatingData**************************/
            .addCase(getUserRatingData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserRatingData.fulfilled, (state, action) => {
                state.loading = false;
                state.UserProductRatingData = action.payload.findRate
            })
            .addCase(getUserRatingData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching Products";
            })


            /*************************************getOneProductRatingData**************************/
            .addCase(getOneProductRatingData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOneProductRatingData.fulfilled, (state, action) => {
                state.loading = false;
                state.OneProductRatingData = action.payload.findProductRate
            })
            .addCase(getOneProductRatingData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching Products";
            })


            /*************************************updateUserRatingData**************************/
            .addCase(updateUserRatingData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserRatingData.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateUserRatingData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching Products";
            })




    }
})


export default ratingSlice.reducer;