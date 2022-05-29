import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  totalQuantity: 0,
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const indexes = state.cartItems
        .map((item, i) => (item._id === action.payload._id ? i : -1))
        .filter((index) => index !== -1);
      if (indexes.length === 0) {
        // Item is being added to the cart for the first time
        state.cartItems.push({ ...action.payload, quantity: 1 });
      } else {
        /* 
        Items with given id already exist in the cart
        Find the one matching the size
        */
        if (action.payload.selected_size === "") {
          // No size selection => only one item with such id can exist at a time
          state.cartItems[indexes[0]].quantity += 1;
        } else {
          const idx = indexes.find(
            (index) =>
              state.cartItems[index].selected_size.value ===
              action.payload.selected_size.value
          );
          if (idx === undefined) {
            // Item with given size is being added to the cart for the first time
            state.cartItems.push({ ...action.payload, quantity: 1 });
          } else {
            state.cartItems[idx].quantity += 1;
          }
        }
      }
      state.totalPrice += action.payload.price;
      state.totalQuantity += 1;
    },
    safeRemoveFromCart: (state, action) => {
      const idx = action.payload.selected_size.hasOwnProperty("value")
        ? state.cartItems.findIndex(
            (item) =>
              item._id === action.payload._id &&
              item.selected_size.value === action.payload.selected_size.value
          )
        : state.cartItems.findIndex((item) => item._id === action.payload._id);
      if (idx !== -1) {
        const qty = state.cartItems[idx].quantity;
        if (qty > 1) {
          state.cartItems[idx].quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter((item, i) => i !== idx);
        }
        state.totalQuantity -= 1;
        state.totalPrice -= action.payload.price;
      }
    },
    removeFromCart: (state, action) => {
      const idx = action.payload.selected_size.hasOwnProperty("value")
        ? state.cartItems.findIndex(
            (item) =>
              item._id === action.payload._id &&
              item.selected_size.value === action.payload.selected_size.value
          )
        : state.cartItems.findIndex((item) => item._id === action.payload._id);
      if (idx !== -1) {
        const qty = state.cartItems[idx].quantity;
        state.cartItems = state.cartItems.filter((item, i) => i !== idx);
        state.totalQuantity -= qty;
        state.totalPrice -= qty * action.payload.price;
      }
    },
    clearCart: (state, action) => {
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
});

export const { addToCart, safeRemoveFromCart, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
