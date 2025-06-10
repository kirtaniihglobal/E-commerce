import { getAllproductsData, addProductData, updateProductData, deleteProductData } from "../Thunk/productThunk";
import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    products: [],
    loading: false,
    error: null,

};
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllproductsData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllproductsData.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
            })
            .addCase(getAllproductsData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching Products";
            })





            .addCase(addProductData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProductData.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(addProductData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching Products";
            })



            .addCase(updateProductData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProductData.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(updateProductData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching Products";
            })



            .addCase(deleteProductData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProductData.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(deleteProductData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching Products";
            });
    }
});
export default productSlice.reducer;
