import React, { useState } from "react";
import InputRange from "@/ui/input-range";

const App = () => {
  const [priceValue, setPriceValue] = useState([0, 200000]);
  console.log("priceValue: ", priceValue);

  const handlePriceChange = (values) => {
    setPriceValue(values);
  };

  const filterByPrice = () => {
    // Implement filter functionality
  };

  return (
    <div>
      <PriceFilter
        priceFilterValues={{ priceValue, handleChanges: handlePriceChange }}
        maxPrice={200000}
        filterByPrice={filterByPrice}
      />
    </div>
  );
};



const PriceFilter = ({ priceFilterValues, maxPrice, filterByPrice }) => {
  const { priceValue, handleChanges } = priceFilterValues;
  const [minValueReset, setMinValueReset] = useState(false);
  const [maxValueReset, setMaxValueReset] = useState(false);

  const handleMinValueReset = () => {
    const newMinValue = 0; // Reset min value to 0
    setMinValueReset(true);
    handleChanges([newMinValue, priceValue[1]]);
  };

  const handleMaxValueReset = () => {
    const newMaxValue = maxPrice; // Reset max value to maxPrice
    setMaxValueReset(true);
    handleChanges([priceValue[0], newMaxValue]);
  };

  return (
    <>
      <div className="tp-shop-widget mb-35">
        <h3 className="tp-shop-widget-title no-border">Price Filter</h3>

        <div className="tp-shop-widget-content">
          <div className="tp-shop-widget-filter">
            <div id="slider-range" className="mb-10">
              <InputRange
                STEP={1}
                MIN={0}
                MAX={maxPrice}
                values={priceValue}
                handleChanges={(values) => {
                  handleChanges(values);
                  setMinValueReset(false);
                  setMaxValueReset(false);
                }}
              />
            </div>
            <div className="tp-shop-widget-filter-info d-flex align-items-center justify-content-between">
              <span className="input-range">
                ${priceValue[0]} - ${priceValue[1]}
              </span>
              <button
                className="tp-shop-widget-filter-btn"
                type="button"
                onClick={() => filterByPrice()}
              >
                Filter
              </button>
              {minValueReset && (
                <span
                  className="close-icon"
                  onClick={handleMinValueReset}
                >
                  &#x2715; Reset Min
                </span>
              )}
              {maxValueReset && (
                <span
                  className="close-icon"
                  onClick={handleMaxValueReset}
                >
                  &#x2715; Reset Max
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};





export default App;
