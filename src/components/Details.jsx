import React from "react";

const Details = ({ productData }) => {
  return (
    <div className="details">
      <div className="details-wrapper">
        <div className="details-header">
          <h5>Features and specifications</h5>
        </div>
        <ul className="details-container">
          {productData.details?.map((detail, i) => (
            <li key={productData._id + "detail-" + i}>
              <div className="details-label">{detail.label}</div>
              <div className="details-content">{detail.value}</div>
            </li>
          ))}
        </ul>
        {productData.product_type === "Truck" && (
          <>
            <div className="details-header">
              <h5>Sizing guide</h5>
            </div>
            <ul className="details-container">
              {Object.entries(productData?.truck_sizing)?.map(
                ([key, value], i) => (
                  <li key={productData._id + "sizing-" + i}>
                    <div className="details-label">{key}</div>
                    <div className="details-content">{value}</div>
                  </li>
                )
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Details;
