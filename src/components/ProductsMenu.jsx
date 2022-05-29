import React from "react";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { closeMenu, closeProductsMenu } from "../redux/features/menu/menuSlice";
import { ease } from "../utils";
import { useNavigate } from "react-router-dom";

const parentVariants = {
  hide: {
    x: "-100%",
    transition: {
      ease: ease,
      duration: 0.3,
    },
  },
  show: {
    x: 0,
    transition: {
      duration: 0.5,
      delayChildren: 0.1,
      ease: ease,
    },
  },
};

const childrenVariants = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

const ProductsMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuOptions = [
    { label: "All", route: "/products" },
    { label: "Skate Boards", route: "/products?product_type=SkateBoard" },
    { label: "Decks", route: "/products?product_type=Deck" },
    { label: "Wheels", route: "/products?product_type=Wheels" },
    { label: "Trucks", route: "/products?product_type=Truck" },
    { label: "Hardware", route: "/products?product_type=Hardware" },
  ];

  const handleClose = () => {
    dispatch(closeProductsMenu());
  };

  const handleNavigate = (route) => {
    dispatch(closeMenu());
    navigate(route);
    document.body.classList.remove("no-scroll");
  };

  return (
    <motion.div
      variants={parentVariants}
      initial="hide"
      animate="show"
      exit="hide"
      className="products-menu"
    >
      <div className="products-menu-header-wrapper">
        <h1>Products</h1>
        <FaArrowLeft className="back-arrow-icon" onClick={handleClose} />
      </div>
      <motion.div className="product-options-container">
        {menuOptions.map((option) => (
          <motion.h2
            key={option.label}
            onClick={() => handleNavigate(option.route)}
            variants={childrenVariants}
            className="product-option"
          >
            {option.label}
          </motion.h2>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ProductsMenu;
