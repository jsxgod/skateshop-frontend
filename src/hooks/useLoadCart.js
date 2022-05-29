import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice";

const useLoadCart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cartItems = window.localStorage.getItem("cart-items");
    if (cartItems !== null) {
      for (const item of JSON.parse(cartItems)) {
        dispatch(addToCart(item));
      }
    }
  }, [dispatch]);
};

export default useLoadCart;
