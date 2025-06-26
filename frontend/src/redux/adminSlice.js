import { createSlice } from "@reduxjs/toolkit";
import { getAllOrderAdminData, updateOrderAdminData, getAllUsersData, blockUserData, updateUserByAdminData, getAllCountByAdminData } from "../Thunk/adminThunk";





const initialState = {
    users: [],
    allOrders: [],
    usersCount: null,
    orderCount: null,
    productCount: null,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            /*********get Users***********/
            .addCase(getAllUsersData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsersData.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users
            })
            .addCase(getAllUsersData.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })



            /*********block Users***********/
            .addCase(blockUserData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(blockUserData.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(blockUserData.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })



            /*********block Users***********/
            .addCase(updateUserByAdminData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserByAdminData.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(updateUserByAdminData.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })



            /********getAllCount***********/
            .addCase(getAllCountByAdminData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCountByAdminData.fulfilled, (state, action) => {
                state.loading = false;
                state.usersCount = action.payload.users
                state.orderCount = action.payload.orders
                state.productCount = action.payload.product
            })
            .addCase(getAllCountByAdminData.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })



            /*************************************getAllOrderAdminData**************************/

            .addCase(getAllOrderAdminData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllOrderAdminData.fulfilled, (state, action) => {
                state.loading = false;
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
                state.allOrders = state.allOrders.filter((o) => o._id !== action.payload._id)
            })
            .addCase(updateOrderAdminData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching Products";
            })


    }
})

export default adminSlice.reducer;