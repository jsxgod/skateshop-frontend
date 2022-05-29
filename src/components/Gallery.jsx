import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const Gallery = ({ style, productType, images }) => {
  const hasSizes = useSelector(
    (state) => state.product.data.available_sizes.length !== 0
  );
  const selectedSize = useSelector((state) => state.product.selectedSize);
  return (
    <div className="gallery">
      {hasSizes ? (
        ["wheels", "hardware"].includes(productType.toLowerCase()) ? (
          <motion.div style={style} className="gallery-wrapper single">
            <div className="image-wrapper main">
              <img src={selectedSize.main_image} alt={"main"} />
            </div>
          </motion.div>
        ) : (
          <motion.div style={style} className="gallery-wrapper single truck">
            <div className="image-wrapper main">
              <img src={selectedSize.main_image} alt={"main"} />
            </div>
          </motion.div>
        )
      ) : (
        images && (
          <>
            {productType.toLowerCase() === "skateboard" ? (
              <motion.div style={style} className="gallery-wrapper skateboard">
                <div className="image-wrapper main">
                  <img src={images.main} alt={"main"} />
                </div>
                <div className="image-wrapper wheel">
                  <img src={images.wheel} alt={"wheel"} />
                </div>
                <div className="image-wrapper side">
                  <img src={images.side} alt={"side"} />
                </div>
                <div className="image-wrapper close-up">
                  <img src={images.closeUp} alt={"close-up"} />
                </div>
              </motion.div>
            ) : productType.toLowerCase() === "deck" ? (
              <motion.div style={style} className="gallery-wrapper deck">
                <div className="image-wrapper main">
                  <img src={images.main} alt={"main"} />
                </div>
                <div className="image-wrapper">
                  <img src={images.front} alt={"front"} />
                </div>
                <div className="image-wrapper">
                  <img src={images.side} alt={"side"} />
                </div>
              </motion.div>
            ) : ["wheels", "hardware"].includes(productType.toLowerCase()) ? (
              <motion.div style={style} className="gallery-wrapper single">
                <div className="image-wrapper main">
                  <img src={images.main} alt={"main"} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                style={style}
                className="gallery-wrapper single truck"
              >
                <div className="image-wrapper main">
                  <img src={images.main} alt={"main"} />
                </div>
              </motion.div>
            )}
          </>
        )
      )}
    </div>
  );
};

export default Gallery;
