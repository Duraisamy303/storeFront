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
import Link from "next/link";
import { useRouter } from "next/router";
import { objIsEmpty } from "../../utils/functions";

const ShopArea = ({
  all_products,
  products,
  otherProps,
  updateData,
  subtitle,
  updateRange,
  maxPrice,
  productLoading,
  totalCount,
  page,
  clearFilter,
  parentSlug,
}) => {

  const { priceFilterValues, selectHandleFilter, currPage, setCurrPage } =
    otherProps;

  const filter = useSelector((state) => state.shopFilter.filterData);

  const dispatch = useDispatch();

  const router = useRouter();

  const [pageStart, setPageStart] = useState(0);
  const [countOfPage, setCountOfPage] = useState(12);

  const removeFilter = (slugOrType, value, filterType) => {
    // Remove price filter
    let range = [];
    if (filterType === "price") {
      const updatedPriceFilter = { ...filter.price }; // Copy the price filter
      if (slugOrType === "gte") {
        delete updatedPriceFilter.min;
        range = [0, filter?.price?.max ? filter?.price?.max : maxPrice];

        // Remove the min price
      } else if (slugOrType === "lte") {
        delete updatedPriceFilter.max; // Remove the max price
        range = [filter?.price?.min ? filter?.price?.min : 0, maxPrice];
      }
      updateRange(range);

      // Update the filter state
      const updatedFilter = { ...filter, price: updatedPriceFilter };
      dispatch(filterData(updatedFilter));
    }
    // Remove attribute filter
    else if (filterType === "attribute") {
      const updatedAttributes = filter.attributes
        .map((attr) => {
          if (attr.slug === slugOrType) {
            // Filter out the specific value
            return {
              ...attr,
              values: attr.values.filter((v) => v !== value),
            };
          }
          return attr; // Return other attributes unchanged
        })
        .filter((attr) => attr.values.length > 0); // Remove empty attributes

      // Update the filter state
      const updatedFilter = { ...filter, attributes: updatedAttributes };
      dispatch(filterData(updatedFilter));
    }
  };

  const removeIncompletePriceObjects = (array) => {
    return array.filter((item) => {
      if (item.type === "price") {
        return item.hasOwnProperty("min") || item.hasOwnProperty("max");
      }
      return true; // keep the item if it's not a price type
    });
  };

  function CommonLoader({ loading }) {
    return (
      <div
        style={{
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src="/assets/img/Prade-Logo-Giff.gif" alt="Loading..." />
      </div>
    );
  }

  const categories = subtitle.split(" / ");
  const [categoryId, setCategoryId] = useState("earrings");

  // Initialize ParentCategoryId
  useEffect(() => {
    let ParentCategoryId = "";

    // Set ParentCategoryId based on categories[1]
    if (categories[1] === "Earrings") {
      ParentCategoryId = "earrings";
    } else if (categories[1] === "Necklaces") {
      ParentCategoryId = "necklaces";
    } else if (categories[1] === "Bangles & Bracelets") {
      ParentCategoryId = "bangles__bracelets";
    } else if (categories[1] === "Finger Rings") {
      ParentCategoryId = "finger_rings";
    } else if (categories[1] === "Anklets data") {
      ParentCategoryId = "anklets";
    } else if (categories[1] === "Other Accessories") {
      ParentCategoryId = "other_accessories";
    } else {
      ParentCategoryId = parentSlug;
    }
    setCategoryId(ParentCategoryId);
  }, [categories[1]]);

  let content = null;

  if (productLoading === true) {
    content = <CommonLoader loading={productLoading} />;
  } else if (all_products?.length > 0) {
    // Render product items...
    content = (
      <>
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
                <div className="row gx-1 gx-lg-3">
                  {products?.map((item) => (
                    <div
                      key={item._id}
                      className="col-xl-4 col-md-6 col-sm-6 col-6 mb-20 mb-lg-50"
                    >
                      <ProductItem products={item} updateData={updateData} />
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
        {/* {products?.length > 0 && (
          <div className="tp-shop-pagination mt-20 mb-20">
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
        )} */}
      </>
    );
  } else {
    content = (
      <div className="text-center mt-50 mb-50 mt-lg-40 mb-lg-40">
        <img src="assets/img/product/cartmini/empty-cart.png" />{" "}
        <p
          className="mt-20"
          style={{ fontSize: "20px", color: "rgb(194, 136, 43)" }}
        >
          No Product Found
        </p>
      </div>
    );
  }

  return (
    <>
      <section className="tp-shop-area  mt-50">
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
                <Link href="/">Home</Link>
              </span>{" "}
              /{" "}
              <span style={{ color: "black", fontWeight: "600" }}>
                {/* <Link href="/shop">{categories[0]}</Link>{" "} */}
                <span
                  onClick={() => {
                    if (categories[0] == "Shop") {
                      router.push({
                        pathname: "/shop",
                      });
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {categories[0]}
                </span>
                {categories[1] && (
                  <span
                    onClick={() => {
                      if (parentSlug) {
                        router.push({
                          pathname: "/shop",
                          query: { category: categoryId }, // Your parameters
                        });
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    / {categories[1]}
                  </span>
                )}
                {categories[2] && (
                  <span style={{ cursor: "pointer" }}>/ {categories[2]}</span>
                )}
              </span>
            </div>
          </div>

          <div className="row">
            {/*  */}
            <div className="col-xl-12 col-lg-12">
              <div className="tp-shop-main-wrapper">
                <div className="tp-shop-top mb-45">
                  <div className="row">
                    <div className="col-md-6">
                      <ShopTopLeft showing={page} total={totalCount} />
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
                    <div className="col-md-6">
                      <ShopTopRight selectHandleFilter={selectHandleFilter} />
                    </div>
                  </div>
                </div>
                {filter && (
                  <div
                    className="d-flex cursor"
                    style={{ gap: 20, cursor: "pointer" }}
                  >
                    {(!objIsEmpty(filter?.price) ||
                      filter?.attributes?.length > 0) && (
                      <>
                        <div className="cartmini__close">
                          <button
                            type="button"
                            className="cartmini__close-btn cartmini-close-btn"
                          >
                            <i className="fal fa-times"></i>
                          </button>
                        </div>
                        <div onClick={() => clearFilter()}>
                          <i className="fa-regular fa-xmark " />
                          <span style={{ paddingLeft: "5px" }}>
                            Clear filter
                          </span>
                        </div>
                      </>
                    )}
                    <div
                      className="pb-20"
                      style={{ display: "flex", gap: 10, cursor: "pointer" }}
                    >
                      {/* Price Filter */}
                      {filter.price && (
                        <>
                          {filter.price.min !== undefined && (
                            <div
                              style={{
                                display: "flex",
                                gap: 5,
                                cursor: "pointer",
                                alignItems: "center",
                              }}
                              onClick={() => removeFilter("gte", null, "price")}
                            >
                              <i className="fa-regular fa-xmark " />
                              <span>Min {filter.price.min}</span>
                            </div>
                          )}
                          {filter.price.max !== undefined && (
                            <div
                              style={{
                                display: "flex",
                                gap: 5,
                                cursor: "pointer",
                                alignItems: "center",
                              }}
                              onClick={() => removeFilter("lte", null, "price")}
                            >
                              <i className="fa-regular fa-xmark " />
                              <span>Max {filter.price.max}</span>
                            </div>
                          )}
                        </>
                      )}

                      {/* Attribute Filters */}
                      {filter?.attributes?.map((item) =>
                        item.values.map((value) => (
                          <div
                            key={`${item.slug}-${value}`} // Unique key for each choice
                            style={{
                              display: "flex",
                              gap: 5,
                              cursor: "pointer",
                              alignItems: "center",
                            }}
                            onClick={() =>
                              removeFilter(item.slug, value, "attribute")
                            }
                          >
                            <i className="fa-regular fa-xmark " />
                            <span style={{ paddingLeft: "5px" }}>{value}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {content}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopArea;
