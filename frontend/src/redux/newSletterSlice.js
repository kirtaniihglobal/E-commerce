import { createSlice } from "@reduxjs/toolkit";
import { addNewSletterData } from "../Thunk/newSletterThunk";

const initialState = {};

const newSletterSlice = createSlice({
  name: "newSletter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /*************************************addNewSletterData**************************/
      .addCase(addNewSletterData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewSletterData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addNewSletterData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      });
  },
});

export default newSletterSlice.reducer;
