import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu, openProductsMenu } from "../redux/features/menu/menuSlice";
import { ProductsMenu } from ".";
import { ease } from "../utils";

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuState = useSelector((state) => state.menu);

  const handleNavigate = (route) => {
    dispatch(closeMenu());
    navigate(route);
    document.body.classList.remove("no-scroll");
  };

  const handleOpenProductsMenu = () => {
    dispatch(openProductsMenu());
  };

  return (
    <AnimatePresence>
      {menuState?.opened && (
        <motion.div
          initial={{ x: "-100vw" }}
          animate={{ x: 0, transition: { ease: ease, duration: 0.6 } }}
          exit={{ x: "-100vw", transition: { ease: ease, duration: 0.3 } }}
          className="menu"
        >
          <div className="menu-links-container">
            <motion.button
              className="menu-link-button"
              onClick={() => handleNavigate("/")}
            >
              Home
            </motion.button>
            <motion.button
              className="menu-link-button"
              onClick={handleOpenProductsMenu}
            >
              Products
            </motion.button>
            <motion.button
              className="menu-link-button"
              onClick={() => handleNavigate("/about-us")}
            >
              About us
            </motion.button>
          </div>
          <AnimatePresence>
            {menuState.productsMenuOpened && <ProductsMenu />}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Menu;
