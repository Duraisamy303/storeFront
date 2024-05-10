import React, { useEffect, useState } from "react";
import Pagination from "@/ui/Pagination";
import ProductItem from "../products/fashion/product-item";
import CategoryFilter from "./shop-filter/category-filter";
import ColorFilter from "./shop-filter/color-filter";
import PriceFilter from "./shop-filter/price-filter";
import ProductBrand from "./shop-filter/product-brand";
import StatusFilter from "./shop-filter/status-filter";
import TopRatedProducts from "./shop-filter/top-rated-products";
import ShopListItem from "./shop-list-item";
import ShopTopLeft from "./shop-top-left";
import ShopTopRight from "./shop-top-right";
import ResetButton from "./shop-filter/reset-button";
import { useDispatch, useSelector } from "react-redux";
import { filterData } from "@/redux/features/shop-filter-slice";

const ShopArea = ({
  all_products,
  products,
  otherProps,
  updateData,
  subtitle,
  updateRange,
}) => {
  const { priceFilterValues, selectHandleFilter, currPage, setCurrPage } =
    otherProps;

  const { priceValue, handleChanges } = priceFilterValues;

  const filter = useSelector((state) => state.shopFilter.filterData);

  const dispatch = useDispatch();

  const [filteredRows, setFilteredRows] = useState([]);
  const [pageStart, setPageStart] = useState(0);
  const [countOfPage, setCountOfPage] = useState(12);

  const paginatedData = (items, startPage, pageCount) => {
    setFilteredRows(items);
    setPageStart(startPage);
    setCountOfPage(pageCount);
  };

  const removeFilter = (item, type, index, price) => {
    if (type === "price") {
      const removemin = filter.find((data) => data.type === type);

      let updatedFilter = [...filter]; // Create a copy of the original filter array

      if (removemin) {
        if ((price === "min" && item.max) || (price !== "min" && item.min)) {
          updatedFilter[index] = {
            type: "price",
            ...(price === "min"
              ? { max: removemin.max }
              : { min: removemin.min }),
          };
          const maxPrice = all_products?.reduce((max, item) => {
            const price =
              item?.node?.pricing?.priceRange?.start?.gross?.amount || 0;
            return price > max ? price : max;
          }, 0);
          let range = [];
          if (price === "min") {
            range[(0, removemin.max)];
          } else {
            range = [removemin.min, maxPrice];
          }
          updateRange(range);
          // updateRange([price === "min" && 0, price === "max" && maxPrice]);
        } else {
          updatedFilter[index] = { type: "price" };
        }
      } else {
        updatedFilter = filter.filter((data) => data.id !== item.id);
      }

      dispatch(filterData(updatedFilter));
    }
  };

  const clearFilter = () => {
    dispatch(filterData([]));
  };

  return (
    <>
      <section className="tp-shop-area pb-50 mt-50">
        <div className="container-fluid">
          <div
            style={{
              borderBottom: "1px solid #eee",
              paddingBottom: "10px",
              marginBottom: "20px",
            }}
          >
            <div>
              <span>
                <a href="#">Home</a>
              </span>{" "}
              /{" "}
              <span style={{ color: "black", fontWeight: "600" }}>
                {subtitle}
              </span>
            </div>
          </div>

          <div className="row">
            {/*  */}
            <div className="col-xl-12 col-lg-12">
              <div className="tp-shop-main-wrapper">
                <div className="tp-shop-top mb-45">
                  <div className="row">
                    <div className="col-xl-6">
                      <ShopTopLeft
                        showing={
                          products?.length === 0
                            ? 0
                            : filteredRows?.slice(
                                pageStart,
                                pageStart + countOfPage
                              ).length
                        }
                        total={all_products?.length}
                      />
                      {/* <ShopTopLeft
                        showing={
                          products?.length === 0
                            ? 0
                            : all_products?.slice(
                                pageStart,
                                pageStart + countOfPage
                              ).length
                        }
                        total={all_products?.length}
                      /> */}
                    </div>
                    <div className="col-xl-6">
                      <ShopTopRight selectHandleFilter={selectHandleFilter} />
                    </div>
                  </div>
                </div>
                {filter?.length > 0 && (
                  <div
                    className="d-flex cursor"
                    style={{ gap: 20, cursor: "pointer" }}
                  >
                    <div className="cartmini__close">
                      <button
                        // onClick={() => dispatch(closeCartMini())}
                        type="button"
                        className="cartmini__close-btn cartmini-close-btn"
                      >
                        <i className="fal fa-times"></i>
                      </button>
                    </div>
                    <div onClick={() => clearFilter()}>
                      <span>Clear filter</span>
                    </div>
                    <div
                      className="pb-20"
                      style={{ display: "flex", gap: 10, cursor: "pointer" }}
                    >
                      {filter?.map((item, index) =>
                        item?.type == "price" ? (
                          <>
                            {item?.min && (
                              <div
                                onClick={() =>
                                  removeFilter(item, "price", index, "min")
                                }
                              >
                                <span>Min {item.min}</span>
                              </div>
                            )}
                            {item?.max && (
                              <div
                                onClick={() =>
                                  removeFilter(item, "price", index, "max")
                                }
                              >
                                <span>Max {item.max}</span>
                              </div>
                            )}
                          </>
                        ) : (
                          <div key={index} onClick={() => removeFilter(item)}>
                            <span>{item.name}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
                {products?.length === 0 && <h2>No products found</h2>}
                {products?.length > 0 && (
                  <div className="tp-shop-items-wrapper tp-shop-item-primary">
                    <div className="tab-content" id="productTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="grid-tab-pane"
                        role="tabpanel"
                        aria-labelledby="grid-tab"
                        tabIndex="0"
                      >
                        <div className="row">
                          {filteredRows
                            ?.slice(pageStart, pageStart + countOfPage)
                            ?.map((item) => (
                              <div
                                key={item._id}
                                className="col-xl-4 col-md-6 col-sm-6"
                              >
                                <ProductItem
                                  products={item}
                                  updateData={updateData}
                                />
                              </div>
                            ))}
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="list-tab-pane"
                        role="tabpanel"
                        aria-labelledby="list-tab"
                        tabIndex="0"
                      >
                        <div className="tp-shop-list-wrapper tp-shop-item-primary mb-70">
                          <div className="row">
                            <div className="col-xl-12">
                              {all_products
                                ?.slice(pageStart, pageStart + countOfPage)
                                .map((item) => (
                                  <ShopListItem key={item._id} product={item} />
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {products?.length > 0 && (
                  <div className="tp-shop-pagination mt-20">
                    <div className="tp-pagination">
                      <Pagination
                        items={products}
                        countOfPage={12}
                        paginatedData={paginatedData}
                        currPage={currPage}
                        setCurrPage={setCurrPage}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopArea;
