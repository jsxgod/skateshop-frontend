import React from "react";
import Logo from "../assets/infinity-logo.png";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Menu } from ".";
import { motion } from "framer-motion";
import { closeMenu, toggleMenu } from "../redux/features/menu/menuSlice";

const Header = () => {
  const cartCounter = useSelector((state) => state.cart.totalQuantity);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuOpened = useSelector((state) => state.menu.opened);

  const handleNavigate = (route) => {
    dispatch(closeMenu());
    navigate(route);
    document.body.classList.remove("no-scroll");
  };

  const handleToggleMenu = () => {
    dispatch(toggleMenu());

    document.body.classList.toggle("no-scroll");
  };

  return (
    <>
      <div className="header">
        <div className="header-wrapper">
          <div className="header-content">
            <div className="logo-wrapper">
              <img src={Logo} alt="Logo" onClick={() => handleNavigate("/")} />
            </div>
            <div className="header-buttons-container">
              <div
                className="cart-button-wrapper"
                onClick={() => handleNavigate("/cart")}
              >
                <span className="cart-counter">{cartCounter}</span>
                <FaShoppingCart className="cart-icon" />
              </div>
              <button
                className="hamburger-menu-button"
                onClick={handleToggleMenu}
              >
                <motion.span
                  animate={menuOpened ? { opacity: 0 } : { opacity: 1 }}
                ></motion.span>
                <motion.span
                  className="middle-bar"
                  animate={
                    menuOpened
                      ? {
                          transform: "rotate(45deg)",
                          transition: { delay: 0.2 },
                        }
                      : {}
                  }
                ></motion.span>
                <motion.span
                  className="middle-bar"
                  animate={menuOpened ? { transform: "rotate(-45deg)" } : {}}
                ></motion.span>
                <motion.span
                  animate={menuOpened ? { opacity: 0 } : { opacity: 1 }}
                ></motion.span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Menu opened={menuOpened} />
    </>
  );
};

export default Header;
