import { createAsyncThunk } from "@reduxjs/toolkit";
import { addNewSletterAPI } from "../apis/newSletterAPI";
import { openSnackbar } from "../redux/snackBarSlice";

export const addNewSletterData = createAsyncThunk(
  "newSletter/addNewSletter",
  async (email, { dispatch }) => {
    try {
        console.log(email)
      const response = await addNewSletterAPI(email);
      dispatch(
        openSnackbar({
          massage: "NewSletter Added SuccessFully",
          severity: "success",
        })
      );
      return response;
    } catch (error) {
      return error.response?.data || "Failed to Add NewSletter";
    }
  }
);
