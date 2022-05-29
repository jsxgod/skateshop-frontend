import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import productsReducer from "./features/products/productsSlice";
import productReducer from "./features/products/productSlice";
import menuReducer from "./features/menu/menuSlice";
import filterReducer from "./features/filter/filterSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    product: productReducer,
    menu: menuReducer,
    filter: filterReducer,
  },
});
