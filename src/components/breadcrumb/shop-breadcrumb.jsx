import React, { useEffect, useState } from "react";
import { capitalizeFLetter } from "../../utils/functions";
import { useRouter } from "next/router";
import Link from "next/link";
import { useGetCategoryNameMutation } from "@/redux/features/productApi";
import { DownOutlined } from "@ant-design/icons";

const ShopBreadcrumb = ({
  title,
  subtitle,
  bgImage,
  catList,
  product,
  parentSlug,
}) => {
  const router = useRouter();
  const categories = title.split(" / ");

  const [categoryId, setCategoryId] = useState("earrings");
  const [categoryopen, setCategoryOpen] = useState(false);

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

    if (ParentCategoryId) {
      filterByCategoryName();
    }
  }, [categories[1]]);

  const [getCategoryName] = useGetCategoryNameMutation();
  const [catName, setCatName] = useState([]);

  const filterByCategoryName = async () => {
    const categoryId = product?.category?.slug;
    try {
      const res = await getCategoryName({
        slug: categoryId,
      });

      const list = res?.data?.data?.category?.name;
      setCatName(list);
    } catch (err) {
      console.log(err);
    }
  };

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
                  <>
                    <ul className="container shop-banner-categoryList d-none d-sm-flex">
                      {catList?.length > 0 &&
                        catList?.map((item, index) => (
                          <li key={index}>
                            <h5
                              className="shop-banner-categoryList-title cursor-pointer"
                              onClick={() => {
                                router.push({
                                  pathname: "/shop",
                                  query: { category: item?.node?.slug }, // Your parameters
                                });
                              }}
                            >
                              {item?.node?.name?.toUpperCase()}
                            </h5>
                            <p className="shop-banner-categoryList-count">
                              {
                                item?.node?.productsWithoutHiddenCategory
                                  ?.totalCount
                              }{" "}
                              Products
                            </p>
                          </li>
                        ))}
                    </ul>
                    <div className=" d-sm-none">
                      <p
                        className="text-white text-center"
                        style={{
                          fontWeight: "500",
                          fontSize: "18px",
                          cursor: "pointer",
                          marginBottom: "0px",
                        }}
                        onClick={() => setCategoryOpen(!categoryopen)}
                      >
                        Categories <DownOutlined style={{ fontSize: "14px" }} />
                      </p>

                      {categoryopen && (
                        <div
                          style={{
                            backgroundColor: "rgb(0 0 0 / 40%)",
                            padding: "20px 0px",
                          }}
                        >
                          <ul className="container shop-banner-categoryList ">
                            {catList?.length > 0 &&
                              catList?.map((item, index) => (
                                <li key={index}>
                                  <h5
                                    className="shop-banner-categoryList-title cursor-pointer"
                                    onClick={() => {
                                      router.push({
                                        pathname: "/shop",
                                        query: { category: item?.node?.slug }, // Your parameters
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
                          </ul>
                        </div>
                      )}
                    </div>
                  </>
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
