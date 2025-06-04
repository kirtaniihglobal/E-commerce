import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";



export const fetchProduct = createAsyncThunk('product/fetchProduct', async () => {
    const products = await api.get('products/',);
    return products.data;
});

const initialState = {
    products: [],
    loading: false,
    error: null
};
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    }
});
export default productSlice.reducer;
