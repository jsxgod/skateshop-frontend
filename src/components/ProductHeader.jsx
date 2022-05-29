import React from "react";
import { useNavigate } from "react-router-dom";
import { animateScroll } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice";
import { TiInfoLargeOutline } from "react-icons/ti";
import { FaArrowLeft } from "react-icons/fa";
import { selectSize } from "../redux/features/products/productSlice";

const ProductHeader = () => {
  const navigate = useNavigate();
  // REDUX
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.data);
  const selectedSize = useSelector((state) => state.product.selectedSize);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...productData, selected_size: selectedSize }));
    const localCartItems =
      JSON.parse(window.localStorage.getItem("cart-items")) || [];
    localCartItems.push({ ...productData, selected_size: selectedSize });
    window.localStorage.setItem("cart-items", JSON.stringify(localCartItems));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddToCart();
  };

  const handleSelectSizeOption = (event) => {
    const newSize = productData.available_sizes.find(
      (size) => size.value === event.target.value
    );
    dispatch(selectSize(newSize));
  };

  return (
    <div className="product-header">
      <div className="product-info-wrapper">
        <div className="product-info-content">
          <div className="content-header-wrapper">
            <h4
              onClick={() =>
                navigate(`/products?product_type=${productData.product_type}`)
              }
            >
              {productData.product_type}
            </h4>
            <FaArrowLeft
              className="back-arrow-icon"
              onClick={() => navigate(-1)}
            />
          </div>
          <h1 onClick={() => navigate(`/products?brand=${productData.brand}`)}>
            {productData.brand}
          </h1>
          <h2>{productData.name}</h2>
          <p>{productData.description}</p>
          <form className="add-to-cart-form" onSubmit={handleSubmit}>
            <div className="buttons-container">
              <button>{"Buy Now $" + productData.price}</button>
              <TiInfoLargeOutline
                onClick={() =>
                  animateScroll.scrollToBottom({
                    smooth: "easeInOutQuad",
                    duration: 1000,
                  })
                }
              />
            </div>
            {productData.available_sizes.length !== 0 && (
              <>
                <h5>Pick size</h5>
                <div className="size-options-container">
                  {productData.available_sizes.map((size) => (
                    <div className="size-option-wrapper">
                      <label>
                        <input
                          type="radio"
                          value={size.value}
                          checked={selectedSize.value === size.value}
                          onChange={handleSelectSizeOption}
                        />
                        {size.value}
                      </label>
                    </div>
                  ))}
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
