import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isOpen: false,
    massage: "",
    severity: ""

}


const snackBarSlice = createSlice({
    name: "snackBar",
    initialState,
    reducers: {
        openSnackbar(state, action) {
            state.isOpen = true;
            state.massage = action.payload.massage;
            state.severity = action.payload.severity

        },
        closeSnackbar(state, action) {
            state.isOpen = false;
            state.massage = "";
            state.severity = "";
        }
    }
})

export const { openSnackbar, closeSnackbar } = snackBarSlice.actions;
export default snackBarSlice.reducer;