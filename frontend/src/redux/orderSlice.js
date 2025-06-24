import { createSlice } from "@reduxjs/toolkit";
import { addOrderData, getAllOrderData } from "../Thunk/orderThunk";





const initialState = {
    orderData: [],
    total: null
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(addOrderData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addOrderData.fulfilled, (state, action) => {
                state.loading = false;
                // console.log(action.payload.newOrder.total)
                state.total = action.payload.newOrder.total
            })
            .addCase(addOrderData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching Products";
            })

            .addCase(getAllOrderData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllOrderData.fulfilled, (state, action) => {
                state.loading = false;
                // console.log(action.payload.data);
                state.orderData = action.payload.data
                state.total = action.payload.data.total
            })
            .addCase(getAllOrderData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching Products";
            })
    }
})


export default orderSlice.reducer;