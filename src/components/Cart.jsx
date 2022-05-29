import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

import {
  addToCart,
  safeRemoveFromCart,
  removeFromCart,
  clearCart,
} from "../redux/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

const Cart = () => {
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
    window.localStorage.setItem("cart-items", JSON.stringify([]));
  };

  const handleLocalCart = (item, actionType) => {
    let localCartItems =
      JSON.parse(window.localStorage.getItem("cart-items")) || [];
    switch (actionType) {
      case "add":
        localCartItems.push(item);
        break;
      case "remove":
        const idxs = localCartItems.map((localItem) => localItem._id);
        const idx = idxs.indexOf(item._id);
        if (idx >= 0) {
          localCartItems.splice(idx, 1);
        }
        break;
      case "removeCompletely":
        localCartItems = localCartItems.filter(
          (localItem) => localItem._id !== item._id
        );
        break;
      default:
    }

    window.localStorage.setItem("cart-items", JSON.stringify(localCartItems));
  };

  const handleRemoveItemCompletely = (item) => {
    dispatch(removeFromCart(item));
    handleLocalCart(item, "removeCompletely");
  };

  const handleIncreaseAmount = (item) => {
    dispatch(addToCart(item));
    handleLocalCart(item, "add");
  };

  const handleDecreaseAmount = (item) => {
    dispatch(safeRemoveFromCart(item));
    handleLocalCart(item, "remove");
  };

  const handleNavigate = (route) => {
    navigate(route);
  };

  const parentSlideVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const slideVariants = {
    initial: {
      y: -32,
    },
    animate: {
      y: 0,
    },
  };

  return (
    <div className="cart">
      <div className="cart-header">
        <button className="clear-cart-button" onClick={handleClearCart}>
          Clear cart
        </button>
      </div>
      <AnimatePresence>
        <div className="cart-items-wrapper">
          <motion.div
            className="cart-items-container"
            variants={parentSlideVariants}
            initial="initial"
            animate="animate"
          >
            {cartItems?.map((item) => (
              <motion.div
                key={item._id}
                className="cart-item-wrapper"
                variants={slideVariants}
                layout
              >
                <button
                  className="delete-cart-item-button"
                  onClick={() => handleRemoveItemCompletely(item)}
                >
                  <span></span>
                  <span></span>
                </button>
                <div
                  className={`cart-item-image-wrapper ${
                    ["Wheels", "Truck", "Hardware"].includes(item.product_type)
                      ? "horizontal"
                      : ""
                  }`}
                  onClick={() => handleNavigate(`/products/${item._id}`)}
                >
                  <img
                    src={
                      item?.selected_size.hasOwnProperty("value")
                        ? item.selected_size.thumbnail
                        : item?.images?.thumbnail
                    }
                    alt="img"
                  />
                </div>
                <div className="cart-item-description-wrapper">
                  <div
                    className="cart-item-name"
                    onClick={() => handleNavigate(`/products/${item._id}`)}
                  >
                    {item?.name +
                      " " +
                      (item?.selected_size.hasOwnProperty("value")
                        ? item.selected_size.value
                        : "")}
                  </div>
                  <div className="cart-item-brand">{item?.brand}</div>
                </div>
                <div className="cart-item-quantity-controls-wrapper">
                  <FaMinusCircle
                    className="minus-icon"
                    onClick={() => handleDecreaseAmount(item)}
                  />
                  <div className="quantity-wrapper">{item.quantity}</div>
                  <FaPlusCircle
                    className="plus-icon"
                    onClick={() => handleIncreaseAmount(item)}
                  />
                </div>
                <div className="cart-item-price-wrapper">
                  {"$" + item.quantity * item.price}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatePresence>
      <motion.div
        className="cart-info-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
      >
        <div className="cart-total-price-wrapper">
          <p>Total Price: {"$" + Math.abs(totalPrice.toFixed(2))}</p>
        </div>
        <div className="buy-button-wrapper">
          <button className="buy-button">BUY</button>
        </div>
      </motion.div>
    </div>
  );
};

export default Cart;
