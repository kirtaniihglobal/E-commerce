import { createSlice } from "@reduxjs/toolkit";




const initialState = {
    cartItems: [],
};


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const quntity = action.payload.quntity;
            // console.log(product)
            const existProduct = state.cartItems.find((item) => item._id === product._id);

            // console.log(state.cartItems)
            console.log(existProduct)
            if (existProduct) {

                existProduct.quntity += quntity;
            } else {
                state.cartItems.push({ ...product, quntity });
                // console.log(state.cartItems)
            }
        },
        removeCart: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
        },
        increment: (state, action) => {
            const item = state.cartItems.find((item) => item._id === action.payload);
            if (item) {
                item.quntity += 1;
            }

        },
        decrement: (state, action) => {
            const item = state.cartItems.find((item) => item._id === action.payload);
            if (item && item.quntity > 1) {
                item.quntity -= 1;
            }
        }
    },
    extraReducers: (builder) => {
        builder
    }
});

export const { addToCart, removeCart, increment, decrement } =
    cartSlice.actions;
export default cartSlice.reducer;

