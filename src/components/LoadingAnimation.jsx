import React from "react";
import { motion } from "framer-motion";

import { ReactComponent as SkateboardSvg } from "../assets/svg/Skateboard.svg";

const LoadingAnimation = () => {
  return (
    <div className="loading-animation-wrapper">
      <motion.div
        className="svg-wrapper"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: 1.2,
          opacity: 1,
          transition: {
            duration: 0.45,
            repeat: Infinity,
            repeatDelay: 0.2,
            ease: [0.6, 0.05, -0.01, 0.99],
          },
        }}
        exit={{
          scale: 1.2,
          opacity: 1,
          transition: {
            duration: 0.4,
            repeatDelay: 0.2,
            ease: [0.6, 0.05, -0.01, 0.99],
          },
        }}
      >
        <SkateboardSvg className="skateboard-svg" />
      </motion.div>
    </div>
  );
};

export default LoadingAnimation;
