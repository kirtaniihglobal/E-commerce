import { getAllproductsData, updateProductData, deleteProductData, getOneproductData, getNewArrivalsProductData, getTopSellingProductData } from "../Thunk/productThunk";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    newArrival: [],
    topSelling: [],
    loading: false,
    error: null,
    total: null,
    selectedProduct: null,

};
const productSlice = createSlice({

    name: 'products',
    initialState,
    reducers: {
        ratingUpdate: (state, action) => {
            // console.log(action.payload.updateRate)
            const updatedProduct = action.payload.updateRate;
            const index = state.products.findIndex(p => p._id === updatedProduct._id);

            if (index !== -1) {
                state.products[index] = updatedProduct;
            }
        }

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
                console.log(action.payload.products)
                state.products = [...state.products, ...action.payload.products];
                state.total = action.payload.total;
                state.loading = false;
            })
            .addCase(getAllproductsData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching Products";
            })


            /*******************************getNewArrivalProductData*****************************/
            .addCase(getNewArrivalsProductData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getNewArrivalsProductData.fulfilled, (state, action) => {
                state.loading = false;
                state.newArrival = action.payload.products;
            })
            .addCase(getNewArrivalsProductData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching Products";
            })



            /*******************************getTopSellingProductData*****************************/
            .addCase(getTopSellingProductData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTopSellingProductData.fulfilled, (state, action) => {
                state.loading = false;
                state.topSelling = action.payload.products;
            })
            .addCase(getTopSellingProductData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching Products";
            })


            /***********************************updateProductData***************************/
            .addCase(updateProductData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProductData.fulfilled, (state) => {
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
            .addCase(deleteProductData.fulfilled, (state) => {
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
                state.selectedProduct = action.payload.product;


            })
            .addCase(getOneproductData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching Products";
            })


    }
});
export const { ratingUpdate } =
    productSlice.actions;
export default productSlice.reducer;
