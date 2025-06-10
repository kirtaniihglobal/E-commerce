import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { openSnackbar } from "./snackBarSlice";
import { loginUserAPI, userDetailAPI, registerUserAPI } from "../apis/authAPI";
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    const user = await userDetailAPI();

    return user;
});
export const loginUser = createAsyncThunk('user/login', async (values, { dispatch, rejectWithValue }) => {
    try {
        const response = await loginUserAPI(values);
        dispatch(
            openSnackbar({
                massage: "Login Successfully",
                severity: "success",
            })
        );
        return response;
    } catch (error) {
        dispatch(
            openSnackbar({
                massage: error?.response?.data?.msg || "Login failed",
                severity: "error",
            })
        );
        return rejectWithValue(response?.data.msg)
    }

});
export const registerUser = createAsyncThunk('user/register', async (values, { dispatch, rejectWithValue }) => {
    try {
        const response = await registerUserAPI(values);
        dispatch(
            openSnackbar({
                massage: "Registration Successfully",
                severity: "success",
            })
        );
        return response;
    } catch (error) {
        console.log(error)
        dispatch(
            openSnackbar({
                massage: error?.response?.data?.msg || "Register failed",
                severity: "error",
            })
        );
        return rejectWithValue(response?.data.msg)
    }

});



const initialState = {
    user: null,
    loading: false,
    error: null,
    token: null,
};


const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.token = action.payload;
                state.loading = false;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })



            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })




            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    }
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
