import { getAllproductsData, addProductData, updateProductData, deleteProductData, getOneproductData } from "../Thunk/productThunk";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    loading: false,
    error: null,
    selectedProduct: null,

};
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            /*******************************getAllProductData*****************************/
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


            /*********************************addProductData******************************/

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


            /***********************************updateProductData***************************/
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

            /*************************************deleteProductData*************************/

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
            })

            /*************************************getOneProductData**************************/


            .addCase(getOneproductData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOneproductData.fulfilled, (state, action) => {
                state.loading = false;
                // console.log(action)
                state.selectedProduct = action.payload.product;
                // console.log(state.selectedProduct);

            })
            .addCase(getOneproductData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching Products";
            });
    }
});
export default productSlice.reducer;
