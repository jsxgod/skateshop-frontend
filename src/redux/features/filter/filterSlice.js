import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  active: false,
  status: null,
  sections: {
    product_types: { label: "Products", data: [] },
    brands: { label: "Brands", data: [] },
    colors: { label: "Colors", data: [] },
  },
};

export const fetchFilterData = createAsyncThunk(
  "filter/fetchFilterData",
  async () => {
    try {
      const response = await axios.get(
        "https://skateshop-backend.herokuapp.com/api/products"
      );
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    activateFilter: (state, action) => {
      state.active = true;
    },
    deactivateFilter: (state, action) => {
      state.active = false;
    },
  },
  extraReducers: {
    [fetchFilterData.pending]: (state, action) => {
      state.status = "pending";
    },
    [fetchFilterData.fulfilled]: (state, action) => {
      state.status = "success";
      if (action.payload !== undefined) {
        state.sections.brands.data = [
          ...new Set(action.payload.map((item) => item.brand)),
        ];
        state.sections.product_types.data = [
          ...new Set(action.payload.map((item) => item.product_type)),
        ];
      }
    },
    [fetchFilterData.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export const { activateFilter, deactivateFilter } = filterSlice.actions;

export default filterSlice.reducer;
