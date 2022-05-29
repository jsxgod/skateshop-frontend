import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FilterSidebar, ProductList } from "../components";
import { FaFilter, FaTimes } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { fetchFilterData } from "../redux/features/filter/filterSlice";

const ProductsPage = () => {
  const [filterSidebarOpened, setFilterSideBarOpened] = useState(false);
  const [selectedFilterOptions, setSelectedFilterOptions] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchFilterData());
    const filterParams = [];
    for (const [key, value] of new URL(
      document.location
    ).searchParams.entries()) {
      filterParams.push({ label: key, value });
    }
    setSelectedFilterOptions(filterParams);
  }, [dispatch, location]);

  const handleDeleteFilterOption = (label, value) => {
    const params = new URL(document.location).searchParams;
    if (params.has(label)) {
      // Remove label=value from params
      // Make a copy of all the values
      const temp = params.getAll(label);
      // Remove all values for the key
      params.delete(label);
      temp.forEach((x) => {
        if (x !== value) {
          params.append(label, x);
        }
      });
    }
    navigate("/products?" + params.toString());
  };

  return (
    <motion.div
      className="products-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      transition={{ duration: 0.2 }}
    >
      <div className="product-list-header">
        <div className="options-container">
          {selectedFilterOptions.map((option) => (
            <div
              key={option.label + "-" + option.value}
              className="option-wrapper"
            >
              <div className="option-name">{option.value}</div>
              <FaTimes
                className="delete-option-icon"
                onClick={() =>
                  handleDeleteFilterOption(option.label, option.value)
                }
              />
            </div>
          ))}
        </div>
        <div className="filter-icon-wrapper">
          <FaFilter
            onClick={() => setFilterSideBarOpened(!filterSidebarOpened)}
          />
        </div>
      </div>
      <AnimatePresence>
        {filterSidebarOpened && (
          <FilterSidebar closeSidebarHandler={setFilterSideBarOpened} />
        )}
      </AnimatePresence>
      <ProductList />
    </motion.div>
  );
};

export default ProductsPage;
