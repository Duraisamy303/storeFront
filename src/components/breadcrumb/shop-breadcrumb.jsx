import React, { useEffect, useState } from "react";
import { capitalizeFLetter } from "../../utils/functions";
import { useRouter } from "next/router";
import Link from "next/link";
import { useGetCategoryNameMutation } from "@/redux/features/productApi";

const ShopBreadcrumb = ({ title, subtitle, bgImage, catList, product }) => {
  console.log("✌️title --->", title);
  const router = useRouter();
  const categories = title.split(" / ");

  const [categoryId, setCategoryId] = useState("Q2F0ZWdvcnk6NQ==");

  // Initialize ParentCategoryId
  useEffect(() => {
    let ParentCategoryId = "";

    // Set ParentCategoryId based on categories[1]
    if (categories[1] === "Earrings") {
      ParentCategoryId = "Q2F0ZWdvcnk6NQ==";
    }
    if (categories[1] === "Necklaces") {
      ParentCategoryId = "Q2F0ZWdvcnk6NzA=";
    }
    if (categories[1] === "Bangles & Bracelets") {
      ParentCategoryId = "Q2F0ZWdvcnk6Njc=";
    }
    if (categories[1] === "Finger Rings") {
      ParentCategoryId = "Q2F0ZWdvcnk6MTIwNw==";
    }
    if (categories[1] === "Anklets data") {
      ParentCategoryId = "Q2F0ZWdvcnk6NzM1";
    }
    if (categories[1] === " Other Accessories") {
      ParentCategoryId = "Q2F0ZWdvcnk6Mzk0Nw==";
    }
    setCategoryId(ParentCategoryId);

    if (ParentCategoryId) {
      filterByCategoryName();
    }
  }, [categories[1]]);

  const [getCategoryName] = useGetCategoryNameMutation();
  const [catName, setCatName] = useState([]);

  const filterByCategoryName = async () => {
    const categoryId = product?.category?.id;
    try {
      const res = await getCategoryName({
        categoryid: categoryId,
      });
      console.log("✌️res --->", res);

      const list = res?.data?.data?.category?.name;
      setCatName(list);
    } catch (err) {
      console.log(err);
    }
  };
  console.log("categoryId: ", categoryId);
  return (
    <>
      <section
        className="breadcrumb__area include-bg pt-50 pb-50 "
        style={{ backgroundImage: `url(${bgImage?.src})` }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-xxl-12">
              <div className="breadcrumb__content p-relative z-index-1">
                <h3
                  className={`breadcrumb__title ${
                    title == "Shop" ? "shop-banner-title" : "other-banner-title"
                  }`}
                >
                  <Link href="/shop">{categories[0]}</Link>{" "}
                  {categories[1] && (
                    <span
                      onClick={() => {
                        router.push({
                          pathname: "/shop",
                          query: { categoryId: categoryId }, // Your parameters
                        });
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      / {categories[1]}
                    </span>
                  )}
                  {categories[2] && (
                    <span style={{ cursor: "pointer" }}>/ {categories[2]}</span>
                  )}
                </h3>
                {title !== "Shop" && (
                  <div style={{ color: "white", textAlign: "center" }}>
                    <span>
                      <a href="/">HOME</a>
                    </span>{" "}
                    / <span>{subtitle}</span>
                  </div>
                )}

                {/* <div className="breadcrumb__list">
                  <span><a href="#">Home</a></span>
                  <span>{subtitle}</span>
                </div> */}
                {title == "Shop" && (
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
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopBreadcrumb;
