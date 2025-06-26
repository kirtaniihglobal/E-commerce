import { createSlice } from "@reduxjs/toolkit";
import { addOrderData, getAllOrderData, getAllOrderAdminData, updateOrderAdminData, cancelOrderData } from "../Thunk/orderThunk";





const initialState = {
    orderData: [],
    total: null,
    allOrders: [],
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            /*************************************addOrderData**************************/
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


            /*************************************getAllOrderData**************************/

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

            /*************************************getAllOrderAdminData**************************/

            .addCase(getAllOrderAdminData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllOrderAdminData.fulfilled, (state, action) => {
                state.loading = false;
                // console.log(action.payload);
                state.allOrders = action.payload.orders
            })
            .addCase(getAllOrderAdminData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching Products";
            })


            /*************************************updateOrderAdminData**************************/


            .addCase(updateOrderAdminData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrderAdminData.fulfilled, (state, action) => {
                state.loading = false;
                // console.log(action.payload.updateAddrss);
                state.allOrders = state.allOrders.filter((o) => o._id !== action.payload._id)
            })
            .addCase(updateOrderAdminData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching Products";
            })


            /*************************************cancelOrderData**************************/

            .addCase(cancelOrderData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(cancelOrderData.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload.status)
                const updateData = state.orderData.find(action.payload._id)
                console.log(updateData)
                // state.orderData = updateData.state = action.payload.status
            })
            .addCase(cancelOrderData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching Products";
            })
    }
})

export const { deleteOrder } =
    orderSlice.actions;
export default orderSlice.reducer;