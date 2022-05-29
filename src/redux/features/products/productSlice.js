import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: {},
  selectedSize: "",
  status: null,
};

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (id = null) => {
    const response = await axios.get(
      `https://skateshop-backend.herokuapp.com/api/products/${id}`
    );
    return response?.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    selectSize: (state, action) => {
      state.selectedSize = action.payload;
    },
  },
  extraReducers: {
    [fetchProduct.pending]: (state, action) => {
      state.status = "pending";
    },
    [fetchProduct.fulfilled]: (state, action) => {
      state.status = "success";
      state.data = action.payload;
      state.selectedSize =
        action.payload.available_sizes.length === 0
          ? ""
          : action.payload.available_sizes[0];
    },
    [fetchProduct.rejected]: (state, action) => {
      state.status = "rejected";
      state.data = {};
      state.selectedSize = "";
    },
  },
});

export const { selectSize } = productSlice.actions;

export default productSlice.reducer;
