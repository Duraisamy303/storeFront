import React from "react";
import { capitalizeFLetter } from "../../utils/functions";
import { useRouter } from "next/router";

const ShopBreadcrumb = ({ title, subtitle, bgImage, catList }) => {
  console.log("✌️catList --->", catList);
  const router = useRouter();

  return (
    <>
      <section
        className="breadcrumb__area include-bg pt-50 pb-50 shop-bg"
        style={{ backgroundImage: `url(${bgImage?.src})` }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-xxl-12">
              <div className="breadcrumb__content p-relative z-index-1">
                <h3 className="breadcrumb__title shop-banner-title">{title}</h3>
                {/* <div className="breadcrumb__list">
                  <span><a href="#">Home</a></span>
                  <span>{subtitle}</span>
                </div> */}
                <ul className="container shop-banner-categoryList">
                  {catList?.length > 0 &&
                    catList?.map((item, index) => (
                      <li key={index}>
                        <h5
                          className="shop-banner-categoryList-title cursor-pointer"
                          onClick={() => {
                            router.push({
                              pathname: "/shop",
                              query: { categoryId: item?.node?.id }, // Your parameters
                            });
                          }}
                        >
                          {item?.node?.name?.toUpperCase()}
                        </h5>
                        <p className="shop-banner-categoryList-count">
                          {item?.node?.products?.totalCount} Products
                        </p>
                      </li>
                    ))}
                  {/* <li>
                    <h5 className="shop-banner-categoryList-title">
                      ANKLETS
                    </h5>
                    <p className="shop-banner-categoryList-count">3 Products</p>
                  </li>
                  <li>
                  <h5 className="shop-banner-categoryList-title">
                      BANGLES & BRACELETS
                    </h5>
                    <p className="shop-banner-categoryList-count">121 Products</p>
                  </li>
                  <li>
                  <h5 className="shop-banner-categoryList-title">
                      EARRINGS
                    </h5>
                    <p className="shop-banner-categoryList-count">383 Products</p>
                  </li>
                  <li>
                  <h5 className="shop-banner-categoryList-title">
                      FINGER RINGS
                    </h5>
                    <p className="shop-banner-categoryList-count">95 Products</p>
                  </li>
                  <li>
                  <h5 className="shop-banner-categoryList-title">
                  GIFT CARD
                    </h5>
                    <p className="shop-banner-categoryList-count">1 Product</p>
                  </li>
                  <li>
                  <h5 className="shop-banner-categoryList-title">
                  NECKLACES
                    </h5>
                    <p className="shop-banner-categoryList-count">860 Products</p>
                  </li>
                  <li>
                  <h5 className="shop-banner-categoryList-title">
                  NEW ARRIVALS
                    </h5>
                    <p className="shop-banner-categoryList-count">1,360 Products</p>
                  </li>
                  <li>
                  <h5 className="shop-banner-categoryList-title">
                  PENDANTS
                    </h5>
                    <p className="shop-banner-categoryList-count">21 Products</p>
                  </li>
                  <li>
                  <h5 className="shop-banner-categoryList-title">
                  PRE-ORDERS
                    </h5>
                    <p className="shop-banner-categoryList-count">33 Products</p>
                  </li>
                  <li>
                  <h5 className="shop-banner-categoryList-title">
                  SALE
                    </h5>
                    <p className="shop-banner-categoryList-count">41 Products</p>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopBreadcrumb;
