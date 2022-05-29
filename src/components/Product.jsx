import { Gallery, ProductDrag } from ".";
import { useMotionValue, useTransform } from "framer-motion";

const Product = ({ productData }) => {
  let x = useMotionValue(0, { ease: [0.6, 0.05, -0.01, 0.99] });
  const enlargedBreakpoint = -200;
  const moveUp = useTransform(x, [enlargedBreakpoint, 0], [-160, 0]);

  return (
    <div className="product">
      <Gallery
        style={{ translateY: moveUp }}
        productType={productData.product_type}
        images={productData.images}
      />
      {(productData.product_type === "Deck" ||
        productData.product_type === "SkateBoard") && (
        <ProductDrag
          productData={productData}
          x={x}
          enlargedBreakpoint={enlargedBreakpoint}
        />
      )}
    </div>
  );
};

export default Product;
