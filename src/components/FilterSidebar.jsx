import React, { useRef } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FilterSidebar = ({ closeSidebarHandler }) => {
  const filterState = useSelector((state) => state.filter);
  const filterParams = useRef(new URLSearchParams());
  const navigate = useNavigate();

  const handleFilterProducts = () => {
    try {
      navigate("/products?" + filterParams.current.toString());
      closeSidebarHandler(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToFilterList = (label, item) => {
    let backendLabel = "";
    switch (label) {
      case "Products":
        backendLabel = "product_type";
        break;
      case "Brands":
        backendLabel = "brand";
        break;
      default:
        backendLabel = "";
        break;
    }
    if (filterParams.current.has(backendLabel)) {
      // Remove key=item from params
      if (filterParams.current.getAll(backendLabel).includes(item)) {
        // Make a copy of all the values
        const temp = filterParams.current.getAll(backendLabel);
        // Remove all values for the key
        filterParams.current.delete(backendLabel);
        temp.forEach((x) => {
          if (x !== item) {
            filterParams.current.append(backendLabel, x);
          }
        });
      } else {
        filterParams.current.append(backendLabel, item);
      }
    } else {
      filterParams.current.append(backendLabel, item);
    }
  };

  return (
    <motion.div
      className="filter-sidebar"
      initial={{ x: "-100%" }}
      animate={{
        x: 0,
        transition: { duration: 0.4, ease: [0.6, 0.05, -0.01, 0.99] },
      }}
      exit={{
        x: "-100%",
        transition: { duration: 0.2, ease: [0.6, 0.05, -0.01, 0.99] },
      }}
    >
      <div className="filter-sidebar-header-wrapper">
        <h2>Filter products</h2>
        <div className="close-button-wrapper">
          <FaCheck className="confirm" onClick={() => handleFilterProducts()} />
          <FaTimes
            className="close"
            onClick={() => closeSidebarHandler(false)}
          />
        </div>
      </div>
      <div className="filter-sidebar-sections-container">
        {filterState.status === "success" &&
          Object.values(filterState.sections).map((section) => (
            <div key={section.label} className="section-wrapper">
              <h3>{section.label}</h3>
              <div className="section-options-container">
                {section.data.length !== 0 &&
                  section.data.map((item) => (
                    <div key={item} className="option-wrapper">
                      <h4>{item}</h4>
                      <div className="checkbox-wrapper">
                        <input
                          type="checkbox"
                          onChange={() =>
                            handleAddToFilterList(section.label, item)
                          }
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </motion.div>
  );
};

export default FilterSidebar;
