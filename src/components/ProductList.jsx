import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchProducts } from "../redux/features/products/productsSlice";
import { AnimatePresence, motion } from "framer-motion";
import { LoadingAnimation } from ".";

const ProductList = () => {
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.products);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchProducts(new URL(document.location).searchParams || {}));
  }, [dispatch, location]);

  const handleNavigate = (route) => {
    navigate(route);
  };
  return (
    <div className="product-list">
      <AnimatePresence>
        {productsState.status === "success" ? (
          productsState.products?.length !== 0 ? (
            productsState.products?.map((product) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.4 } }}
                key={product._id}
                className="product-list-item-wrapper"
              >
                <div
                  className={`product-list-item-image-wrapper ${
                    ["Wheels", "Truck", "Hardware"].includes(
                      product.product_type
                    )
                      ? "horizontal"
                      : ""
                  }`}
                >
                  <img
                    src={product.images.thumbnail}
                    alt={"main"}
                    onClick={() => handleNavigate(`/products/${product._id}`)}
                  />
                </div>
                <div className="product-list-item-description-wrapper">
                  <div className="brand-wrapper">{product.brand}</div>
                  <div className="name-wrapper">{product.name}</div>
                  <div className="price-wrapper">{"$" + product.price}</div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="error-message-wrapper">
              <p>Sorry, we could not find products with given criteria.</p>
            </div>
          )
        ) : (
          <LoadingAnimation />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductList;
