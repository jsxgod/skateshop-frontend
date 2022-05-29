import React, { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useTransform,
} from "framer-motion";

import { scroller as scroll } from "react-scroll";
import { ReactComponent as Chevron } from "../assets/chevron.svg";
import { ProductDragHeader } from ".";
import { ease } from "../utils";

const ProductDrag = ({ productData, x, enlargedBreakpoint }) => {
  const leftDragConstraint = -1700;
  const width = useTransform(x, [leftDragConstraint, 0], ["100%", "0%"]);
  const scale = useTransform(x, [enlargedBreakpoint, -100], [1.25, 1]);
  const moveDown = useTransform(x, [enlargedBreakpoint, 0], [100, 0]);
  const fadeOut = useTransform(x, [-120, 0], [0, 1]);

  const animationControls = useAnimation();

  const [fullyEnlarged, setFullyEnlarged] = useState(false);

  useEffect(() => {
    if (fullyEnlarged === true) {
      document.querySelector("html").classList.add("no-scroll");
      document.body.addEventListener("touchstart", function (e) {
        e.preventDefault();
      });
      scroll.scrollTo("product-image", {
        offset: -50,
        duration: 800,
        delay: 1,
        smooth: "easeInOutQuart",
      });
    } else {
      document.querySelector("html").classList.remove("no-scroll");
    }
  }, [fullyEnlarged]);

  useEffect(() => {
    x.onChange(() => {
      if (x.get() <= -200) {
        setFullyEnlarged(true);
      } else {
        setFullyEnlarged(false);
      }
    });
  }, [x]);

  const handleClose = () => {
    animationControls.start({
      x: 0,
      transition: { ease: ease, duration: 0.7 },
    });
  };

  const handleUserStoppedDragging = () => {
    if (fullyEnlarged === true) {
      scroll.scrollTo("product-image", {
        offset: -50,
        duration: 800,
        delay: 1,
        smooth: "easeInOutQuart",
      });
    }
  };

  const handleDragTransitionEnd = () => {
    if (fullyEnlarged === false) {
      animationControls.start({
        x: 0,
        transition: { ease: ease, duration: 0.7 },
      });
    }
  };
  return (
    <div className="product-wrapper">
      <AnimatePresence>
        {fullyEnlarged && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="background"
          ></motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {fullyEnlarged && (
          <ProductDragHeader
            title={productData?.brand}
            closeButtonHandler={handleClose}
          />
        )}
      </AnimatePresence>

      <div className="product-image-wrapper">
        <motion.div
          style={{ x, scale }}
          drag={"x"}
          dragConstraints={{ left: leftDragConstraint, right: 0 }}
          dragElastic={0.1}
          onDragEnd={() => handleUserStoppedDragging()}
          onDragTransitionEnd={() => handleDragTransitionEnd()}
          className="product-image"
          animate={animationControls}
        >
          <img src={productData.images?.drag} alt="product" />
        </motion.div>
      </div>
      <motion.div
        style={{ paddingBottom: moveDown }}
        className="product-drag-info"
      >
        <div className="product-drag-info-wrapper">
          <div className="product-drag-info-label">
            <motion.h6 style={{ opacity: fadeOut, x }}>
              <Chevron />
              Drag To Enlarge
            </motion.h6>
          </div>
          <div className="product-drag-info-progress-background">
            <motion.div
              style={{ width }}
              className="product-drag-info-progress"
            ></motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDrag;
