import { createSlice } from "@reduxjs/toolkit";
import { addRatingData, getUserRatingData, updateUserRatingData } from "../Thunk/ratingThunk";



const initialState = {
    UserProductRatingData: {},
    // orderData: [],
    // total: null,
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
                // state.total = action.payload.newOrder.total
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
                console.log(action.payload.findRate)
                state.UserProductRatingData = action.payload.findRate
            })
            .addCase(getUserRatingData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching Products";
            })


            /*************************************updateUserRatingData**************************/
            .addCase(updateUserRatingData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserRatingData.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload)
                // state.UserProductRatingData = action.payload.findRate
            })
            .addCase(updateUserRatingData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching Products";
            })




    }
})


export default ratingSlice.reducer;