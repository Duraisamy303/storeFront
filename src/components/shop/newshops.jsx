import React from "react";
import ProductItem from "../products/fashion/product-item";
import Link from "next/link";

export default function Newshops(props) {
  const {
    all_products,
    products,
    otherProps,
    updateData,
    subtitle,
    updateRange,
    data
  } = props;


  function CommonLoader({ loading, spinner }) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src="/assets/img/Prade-Logo-Giff.gif" alt="Loading..." />
      </div>
    );
  }
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
                <Link href="/">Home</Link>
              </span>{" "}
              /{" "}
              <span style={{ color: "black", fontWeight: "600" }}>
                {"subtitle"}
              </span>
            </div>
          </div>

          <div className="row">
            {/*  */}
            <div className="col-xl-12 col-lg-12">
              <div className="tp-shop-main-wrapper">
                {products?.length === 0 && <CommonLoader loading={loading} />}
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
                          <div
                            key={item._id}
                            className="col-xl-4 col-md-6 col-sm-6 col-6"
                            style={{ marginBottom: "50px" }}
                          >
                            <ProductItem
                              products={item}
                              updateData={updateData}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="list-tab-pane"
                        role="tabpanel"
                        aria-labelledby="list-tab"
                        tabIndex="0"
                      ></div>
                    </div>
                  </div>
                )}
                {/* {products?.length > 0 && (
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
                )} */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
