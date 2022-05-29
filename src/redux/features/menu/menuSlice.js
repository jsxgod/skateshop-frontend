import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  opened: false,
  productsMenuOpened: false,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    openMenu: (state, action) => {
      state.opened = true;
    },
    closeMenu: (state, action) => {
      state.opened = false;
      state.productsMenuOpened = false;
    },
    toggleMenu: (state, action) => {
      state.opened = !state.opened;
      state.productsMenuOpened = false;
    },
    openProductsMenu: (state, action) => {
      state.productsMenuOpened = true;
    },
    closeProductsMenu: (state, action) => {
      state.productsMenuOpened = false;
    },
    toggleProductsMenu: (state, action) => {
      state.productsMenuOpened = !state.productsMenuOpened;
    },
  },
});

export const {
  toggleMenu,
  openMenu,
  closeMenu,
  openProductsMenu,
  closeProductsMenu,
  toggleProductsMenu,
} = menuSlice.actions;

export default menuSlice.reducer;
