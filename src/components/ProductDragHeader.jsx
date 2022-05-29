import React from "react";
import { motion } from "framer-motion";
import { ReactComponent as Close } from "../assets/close.svg";

const ProductDragHeader = ({ title, closeButtonHandler }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ ease: [0.6, 0.05, -0.01, 0.99] }}
      className="product-drag-header"
    >
      <div className="company-name">{title}</div>
      <div
        onClick={() => closeButtonHandler()}
        className="close-button-wrapper"
      >
        <Close />
      </div>
    </motion.div>
  );
};

export default ProductDragHeader;
