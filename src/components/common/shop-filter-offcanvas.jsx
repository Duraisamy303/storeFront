import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryFilter from "../shop/shop-filter/category-filter";
import ColorFilter from "../shop/shop-filter/color-filter";
import PriceFilter from "../shop/shop-filter/price-filter";
import ProductBrand from "../shop/shop-filter/product-brand";
import TopRatedProducts from "../shop/shop-filter/top-rated-products";
import {
  handleFilterSidebarClose,
  handleFilterSidebarOpen,
} from "@/redux/features/shop-filter-slice";
import ResetButton from "../shop/shop-filter/reset-button";
import FinishFilter from "../shop/shop-filter/status-filter";
import StyleFilter from "../shop/shop-filter/style-filter";
import DesignFilter from "../shop/shop-filter/design-filter";
import StoneFilter from "../shop/shop-filter/stone-filter";
import InputRange from "@/ui/input-range";
import { checkChannel } from "@/utils/functions";

const ShopFilterOffCanvas = ({
  all_products,
  otherProps,
  right_side = false,
  filterByPrice,
}) => {
  const filter = useSelector((state) => state.shopFilter.filterData);

  const { priceFilterValues, setCurrPage } = otherProps;

  const { priceValue, handleChanges } = priceFilterValues;

  const { filterSidebar } = useSelector((state) => state.shopFilter);
  const dispatch = useDispatch();

  const maxPrice = all_products?.reduce((max, item) => {
    const price = item?.node?.pricing?.priceRange?.start?.gross?.amount || 0;
    return price > max ? price : max;
  }, 0);

  return (
    <>
      <div
        className={`tp-filter-offcanvas-area ${
          filterSidebar ? "offcanvas-opened" : ""
        }`}
      >
        <div className="tp-filter-offcanvas-wrapper">
          <div className="tp-filter-offcanvas-close">
            <button
              type="button"
              onClick={() => dispatch(handleFilterSidebarClose())}
              className="tp-filter-offcanvas-close-btn filter-close-btn"
            >
              <i className="fa-solid fa-xmark"></i> Close
            </button>
          </div>
          <div className="tp-shop-sidebar">
            {/* filter */}
            {/* <PriceFilter
              priceFilterValues={priceFilterValues}
              maxPrice={maxPrice}
              filterByPrice={filterByPrice}
            /> */}
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
                      handleChanges={handleChanges}
                    />
                  </div>
                  <div className="tp-shop-widget-filter-info d-flex align-items-center justify-content-between">
                    <span className="input-range">
                      {checkChannel() == "india-channel" ? "₹" : "$"}
                      {priceValue[0] ? priceValue[0] : 0} -{" "}
                      {checkChannel() == "india-channel" ? "₹" : "$"}
                      {priceValue[1] ? priceValue[1] : maxPrice}
                    </span>
                    <button
                      className="tp-shop-widget-filter-btn"
                      type="button"
                      onClick={() => filterByPrice(priceValue)}
                    >
                      Filter
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Finish */}
            <FinishFilter setCurrPage={setCurrPage} shop_right={right_side} />

            {/* style */}
            {/* <StyleFilter
              setCurrPage={setCurrPage}
              shop_right={right_side}
              finishFilterData={finishFilterData}
            /> */}

            {/* design */}
            {/* <DesignFilter
              setCurrPage={setCurrPage}
              shop_right={right_side}
              finishFilterData={finishFilterData}
            /> */}

            {/* stone */}
            {/* <StoneFilter
              setCurrPage={setCurrPage}
              shop_right={right_side}
              finishFilterData={finishFilterData}
            /> */}

            {/* <CategoryFilter setCurrPage={setCurrPage} shop_right={right_side} />
            <ColorFilter setCurrPage={setCurrPage} shop_right={right_side} />
            <TopRatedProducts />
            <ProductBrand setCurrPage={setCurrPage} shop_right={right_side} /> */}
            {/* reset filter */}
            <ResetButton shop_right={right_side} />
          </div>
        </div>
      </div>

      {/* overlay start */}
      <div
        onClick={() => dispatch(handleFilterSidebarClose())}
        className={`body-overlay ${filterSidebar ? "opened" : ""}`}
      ></div>
      {/* overlay end */}
    </>
  );
};

export default ShopFilterOffCanvas;
