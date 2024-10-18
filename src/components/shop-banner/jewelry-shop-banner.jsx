import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useGetCategoryListQuery } from "@/redux/features/productApi";
// internal
import { ArrowRightLong } from "@/svg";
import banner_bg_1 from "@assets/img/category-1.jpg";
import banner_bg_2 from "@assets/img/category-2.png";
import banner_bg_3 from "@assets/img/category-3.png";
import banner_bg_4 from "@assets/img/category-4.jpg";
import banner_bg_5 from "@assets/img/category-5.png";
import banner_bg_6 from "@assets/img/category-6.png";
import { useRouter } from "next/router";

// BannerItem
function BannerItem({ cls, bg_clr, bg, content, title, isBtn = false }) {
  const { data: categoryData } = useGetCategoryListQuery();
  const router = useRouter();
  const [necklaces, setNecklaces] = useState({});

  useEffect(() => {
    if (
      categoryData &&
      categoryData?.data &&
      categoryData?.data?.categories &&
      categoryData?.data?.categories?.edges
    ) {
      const catList = categoryData?.data?.categories?.edges;
      const filteredItems = catList.filter(
        (item) =>
          item.node.name === "Necklaces" ||
          item.node.name === "Finger Rings" ||
          item.node.name === "Bangles & Bracelets" ||
          item.node.name === "Earrings" ||
          item.node.name === "Other Accessories"
      );

      const filteredNecklaces = catList.find(
        (item) => item.node.name === "Necklaces"
      );

      setNecklaces(filteredNecklaces);

      // setCategoryList(filteredItems?.map((item) => item.node));
    }
  }, [categoryData]);

  return (
    <div
      className={` tp-banner-height-4 fix p-relative z-index-1 ${cls}`}
      data-bg-color={`#${bg_clr}`}
    >
      <div
        className="tp-banner-thumb-4 include-bg black-bg "
        style={{ backgroundImage: `url(${bg?.src})` }}
      ></div>
      <div
        className="first-card"
        // style={{ textAlign: "center", width: "350px", fontSize: "14px" }}
      >
        <h3 className="tp-banner-title-4">
          <Link href="/shop">{title}</Link>
        </h3>
        <span>{content}</span>
        {title == "NECKLACES" ? (
          <>
            {isBtn && (
              <div className="tp-banner-btn-4">
                <button
                  onClick={() => {
                    router.push({
                      pathname: "/shop",
                      query: { category: "necklaces" }, // Your parameters
                    });
                  }}
                  style={{ textDecoration: "underline", color: "white" }}
                >
                  VIEW PRODUCTS
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            {isBtn && (
              <div className="tp-banner-btn-4">
                <button
                  onClick={() => {
                    router.push({
                      pathname: "/shop",
                      query: { category: "other_accessories" }, // Your parameters
                    });
                  }}
                  style={{ textDecoration: "underline", color: "white" }}
                >
                  VIEW PRODUCTS
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// BannerItem 2
function BannerItem2({ cls, bg_clr, content, title, img, isBtn = false }) {
  const router = useRouter();

  return (
    <>
      {title === "ANKLETS" ? (
        <div
          className={`tp-banner-item-4 tp-banner-height fix p-relative z-index-1 ${cls}`}
          data-bg-color={`${bg_clr}`}
        >
          <div
            className="tp-banner-thumb-4 include-bg black-bg transition-3"
            style={{ backgroundColor: `#${bg_clr}` }}
          ></div>
          <div className="tp-banner-content-4 last-card">
            <div className="last-card-body">
              <h3 className="tp-banner-title-4">
                <Link href="/shop">{title}</Link>
              </h3>
              <span className="category-content">{content}</span>

              {isBtn && (
                <div className="tp-banner-btn-4">
                  <button
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { category: "anklets" }, // Your parameters
                      });
                    }}
                    style={{ textDecoration: "underline" }}
                  >
                    VIEW PRODUCTS
                  </button>
                </div>
              )}
            </div>
            <div>
              <img
                src={img?.src}
                alt="category-product"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`tp-banner-item-4 tp-banner-height fix p-relative z-index-1 ${cls}`}
          data-bg-color={`${bg_clr}`}
        >
          <div
            className="tp-banner-thumb-4 include-bg black-bg transition-3"
            style={{ backgroundColor: `#${bg_clr}` }}
          ></div>
          <div className="tp-banner-content-4 last-card">
            <div>
              <img
                src={img?.src}
                alt="category-product"
                style={{ width: "100%", paddingBottom: "10px" }}
              />
            </div>
            <div className="last-card-body">
              <h3 className="tp-banner-title-4">
                <Link href="/shop">{title}</Link>
              </h3>
              <span className="category-content">{content}</span>

              {isBtn && (
                <div className="tp-banner-btn-4">
                  <button
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { category: "earrings" }, // Your parameters
                      });
                    }}
                    style={{ textDecoration: "underline" }}
                  >
                    VIEW PRODUCTS
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// BannerItem 3
function BannerItem3({ cls, bg_clr, content, title, img, isBtn = false }) {
  const router = useRouter();

  return (
    <div
      className={`tp-banner-item-4 tp-banner-height-4 fix p-relative z-index-1 ${cls}`}
      data-bg-color={`${bg_clr}`}
    >
      <div
        className="tp-banner-thumb-4 include-bg black-bg transition-3"
        style={{ backgroundColor: `#${bg_clr}` }}
      ></div>
      <div className="tp-banner-content-4" style={{ textAlign: "center" }}>
        <img
          src={img?.src}
          alt="category-product home-category3-image"
          style={{ width: "100%" }}
        />
        <h3 className="tp-banner-title-4">
          <Link href="/shop">{title}</Link>
        </h3>
        <span>{content}</span>
        {title == "RINGS" ? (
          <>
            {isBtn && (
              <div className="tp-banner-btn-4">
                <button
                  onClick={() => {
                    router.push({
                      pathname: "/shop",
                      query: { category: "finger_rings" }, // Your parameters
                    });
                  }}
                  style={{ textDecoration: "underline" }}
                >
                  VIEW PRODUCTS
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            {isBtn && (
              <div className="tp-banner-btn-4">
                <button
                  onClick={() => {
                    router.push({
                      pathname: "/shop",
                      query: { category: "bangles__bracelets" }, // Your parameters
                    });
                  }}
                  style={{ textDecoration: "underline" }}
                >
                  VIEW PRODUCTS
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const JewelryShopBanner = () => {
  const router = useRouter();

  return (
    <>
      <section className="tp-banner-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-6 col-lg-7 gx-0 gy-0">
              <div className="row">
                <div className="col-xl-12 gx-0 gy-0">
                  <BannerItem
                    bg_clr="F3F7FF"
                    bg={banner_bg_1}
                    title="NECKLACES"
                    content={
                      <p style={{ fontSize: "14px" }}>
                        Make a statement with our exquisite collection of <br />
                        handcrafted necklaces
                      </p>
                    }
                    isBtn={true}
                  />
                </div>

                <div className="col-md-6 col-sm-6 col-6 gx-0 gy-0">
                  <BannerItem3
                    cls="has-green sm-banner"
                    bg_clr="131418"
                    content={
                      <p style={{ fontSize: "14px" }}>
                        Bold and delicate rings that reflect your unique style
                      </p>
                    }
                    img={banner_bg_2}
                    title="RINGS"
                    isBtn={true}
                  />
                </div>

                <div className="col-md-6 col-sm-6 col-6 gx-0 gy-0">
                  <BannerItem3
                    cls="has-brown sm-banner"
                    bg_clr="090a0f"
                    img={banner_bg_3}
                    title="BRACELETS"
                    content={
                      <p style={{ fontSize: "14px" }}>
                        Dazzling designs that add a touch of grace to your wrist
                      </p>
                    }
                    isBtn={true}
                  />
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-lg-5 gx-0 gy-0">
              <div className="row">
                <div className="col-xl-12 gx-0 gy-0">
                  <BannerItem
                    bg_clr="F3F7FF"
                    bg={banner_bg_4}
                    title="Other Accessories"
                    content={
                      <p style={{ fontSize: "14px" }}>
                        To enhance your outfit and complement your look
                      </p>
                    }
                    isBtn={true}
                  />
                </div>

                <div className="col-xl-12 col-md-12 col-6 gx-0 gy-0">
                  <BannerItem2
                    className="category-left-two"
                    bg_clr="0e0f14"
                    img={banner_bg_5}
                    title="EARRINGS"
                    isBtn={true}
                    content={
                      <p style={{ fontSize: "14px" }}>
                        Discover the perfect pair to complement your look and
                        personality
                      </p>
                    }
                  />
                </div>

                <div className="col-xl-12 col-md-12 col-6  gx-0 gy-0">
                  <BannerItem2
                    className="category-left-two"
                    bg_clr="1b1b1d"
                    img={banner_bg_6}
                    title="ANKLETS"
                    isBtn={true}
                    content={
                      <p style={{ fontSize: "14px" }}>
                        Graceful designs that complement every step
                      </p>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JewelryShopBanner;
