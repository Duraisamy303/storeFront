import React, { useEffect, useState } from "react";
import menu_data from "@/data/menu-data";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { RightOutlined } from "@ant-design/icons";
import {
  useFeatureProductQuery,
  useGetProductTypeQuery,
  useGetSubCategoryListQuery,
  usePriceFilterMutation,
  useSubCatListMutation,
} from "@/redux/features/productApi";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import MenusProductSlider from "./menus-product-slider";
import { HomeTwoPopularPrdLoader } from "@/components/loader";
import CommonImage from "@assets/img/earring-menu-pic-1.png";

const slider_setting = {
  slidesPerView: 4,
  spaceBetween: 10,
  pagination: {
    el: ".tp-category-slider-dot-4",
    clickable: true,
  },
  breakpoints: {
    1400: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 2,
    },
    576: {
      slidesPerView: 2,
    },
    0: {
      slidesPerView: 1,
    },
  },
};

const CategoryContent = ({
  title,
  commonImage,
  children,
  lists,
  categoryName,
}) => {
  const router = useRouter();

  useEffect(() => {
    filterByCategory();
  }, [categoryName]);
  const [parentCategoryId, setParentCategoryId] = useState("");

  const filterByCategory = async () => {
    let categoryId = "";
    if (categoryName === "Earrings") {
      categoryId = "Q2F0ZWdvcnk6NQ==";
    } else if (categoryName === "Necklaces") {
      categoryId = "Q2F0ZWdvcnk6NzA=";
    } else if (categoryName === "Bangles") {
      categoryId = "Q2F0ZWdvcnk6Njc=";
    } else if (categoryName === "Rings") {
      categoryId = "Q2F0ZWdvcnk6MTIwNw==";
    } else if (categoryName === "Anklets") {
      categoryId = "Q2F0ZWdvcnk6NzM1";
    } else if (categoryName === "OtherAccessories") {
      categoryId = "Q2F0ZWdvcnk6Mzk0Nw==";
    }
    setParentCategoryId(categoryId);
  };

  return (
    <div className="row" style={{ paddingBottom: "30px" }}>
      <div className="col-3" style={{ paddingLeft: "30px" }}>
        <div style={{ paddingLeft: "25px" }}>
          <h6 style={{ paddingBottom: "15px", fontWeight: "500" }}>{title}</h6>
        </div>
        <div>
          <ul style={{ margin: "0px 25px 10px " }}>
            {lists?.slice(0, 12)?.map((item) => {
              return (
                <li
                  style={{
                    cursor: "pointer",
                    borderBottom: "1px solid #e8e3e3",
                    marginBottom: "10px",
                  }}
                  key={item?.node?.id}
                  onClick={() => {
                    router?.push({
                      pathname: "/shop",
                      query: { categoryId: item?.node?.id }, // Your parameters
                    });
                  }}
                >
                  <p
                    style={{
                      fontWeight: "500",
                      marginBottom: "0px",
                      color: "gray",
                    }}
                  >
                    {item?.node?.name}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
        {lists?.length > 3 ? (
          <></>
        ) : (
          <div>
            <div>
              <Image
                src={commonImage}
                alt="category image"
                style={{ width: "100%", height: "200px" }}
              />
            </div>
            <div style={{ textAlign: "center", padding: "20px 0px" }}>
              <h4 style={{ fontWeight: "400" }}>
                Excepteur sint occaecat
                <br /> cupidatat
              </h4>
              <button
                className="tp-btn tp-btn-border"
                onClick={() => {
                  router?.push({
                    pathname: "/shop",
                    query: { categoryId: parentCategoryId }, // Your parameters
                  });
                }}
              >
                Shop Now
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="col-9">
        <div className="row" style={{ padding: "20px" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

const CategoryComponent = ({
  commonImage,
  lastHoveredCategory,
  setLastHoveredCategory,
}) => {
  const router = useRouter();
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [priceFilter, {}] = usePriceFilterMutation();
  const [productList, setProductList] = useState([]);
  const [subCategoryLists, setSubCategoryLists] = useState([]);

  const [subCatList] = useSubCatListMutation();

  const handleCategoryHover = (category) => {
    setHoveredCategory(category);
    setLastHoveredCategory(category);
  };

  const handleCategoryLeave = () => {
    setLastHoveredCategory(hoveredCategory);
    setHoveredCategory(hoveredCategory);
  };

  useEffect(() => {
    filterByCategory();
  }, [hoveredCategory, lastHoveredCategory]);

  const filterByCategory = async () => {
    let categoryId = "";
    if (hoveredCategory === "Earrings" || lastHoveredCategory === "Earrings") {
      categoryId = "Q2F0ZWdvcnk6NQ==";
    } else if (
      hoveredCategory === "Necklaces" ||
      lastHoveredCategory === "Necklaces"
    ) {
      categoryId = "Q2F0ZWdvcnk6NzA=";
    } else if (
      hoveredCategory === "Bangles" ||
      lastHoveredCategory === "Bangles"
    ) {
      categoryId = "Q2F0ZWdvcnk6Njc=";
    } else if (hoveredCategory === "Rings" || lastHoveredCategory === "Rings") {
      categoryId = "Q2F0ZWdvcnk6MTIwNw==";
    } else if (
      hoveredCategory === "Anklets" ||
      lastHoveredCategory === "Anklets"
    ) {
      categoryId = "Q2F0ZWdvcnk6NzM1";
    } else if (
      hoveredCategory === "OtherAccessories" ||
      lastHoveredCategory === "OtherAccessories"
    ) {
      categoryId = "Q2F0ZWdvcnk6Mzk0Nw==";
      console.log("categoryId: ", categoryId);
      console.log("hoveredCategory: ", hoveredCategory);
    }

    const SubCategory = await subCatList({
      parentid: categoryId,
    });

    setSubCategoryLists(SubCategory?.data?.data?.category?.children?.edges);

    priceFilter({ filter: { categories: categoryId } }).then((res) => {
      const list = res?.data?.data?.products?.edges?.slice(0, 11);
      setProductList(list);
    });
  };
  const renderContent = () => {
    if (productList?.length == 0) return null;

    return (
      <Swiper
        {...slider_setting}
        modules={[Pagination]}
        className="tp-category-slider-active-4 swiper-container"
      >
        {productList?.map((item) => (
          <div
            className="col-lg-3 menus-product-list"
            style={{ padding: "0px 8px 0px 0px", width: "250px" }}
            key={item?.id}
          >
            <SwiperSlide>
              <MenusProductSlider product={item} />
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    );
  };

  const renderCategoryContent = () => {
    switch (hoveredCategory || lastHoveredCategory) {
      case "Earrings":
        return (
          <CategoryContent
            title="ALL EARRINGS"
            commonImage={CommonImage}
            lists={subCategoryLists}
            categoryName={lastHoveredCategory}
          >
            {renderContent()}
          </CategoryContent>
        );
      case "Necklaces":
        return (
          <CategoryContent
            title="ALL NECKLACES"
            commonImage={CommonImage}
            lists={subCategoryLists}
            categoryName={lastHoveredCategory}
          >
            {renderContent()}
          </CategoryContent>
        );
      case "Bangles":
        return (
          <CategoryContent
            title="ALL BANGLES & BRACELETS"
            commonImage={CommonImage}
            lists={subCategoryLists}
            categoryName={lastHoveredCategory}
          >
            {renderContent()}
          </CategoryContent>
        );
      case "Rings":
        return (
          <CategoryContent
            title="ALL RINGS"
            commonImage={CommonImage}
            lists={subCategoryLists}
            categoryName={lastHoveredCategory}
          >
            {renderContent()}
          </CategoryContent>
        );
      case "Anklets":
        return (
          <CategoryContent
            title="ALL ANKLETS"
            commonImage={CommonImage}
            lists={subCategoryLists}
            categoryName={lastHoveredCategory}
          >
            {renderContent()}
          </CategoryContent>
        );
      case "OtherAccessories":
        return (
          <CategoryContent
            title="ALL OTHER ACCESSORIES"
            commonImage={CommonImage}
            lists={subCategoryLists}
            categoryName={lastHoveredCategory}
          >
            {renderContent()}
          </CategoryContent>
        );
      default:
        return null;
    }
  };

  return <div>{renderCategoryContent()}</div>;
};

const Menus = () => {
  const router = useRouter();
  const [lastHoveredCategory, setLastHoveredCategory] = useState("Earrings");

  return (
    <ul style={{ display: "flex", justifyContent: "end" }}>
      <li>
        <Link href="/" style={{ fontWeight: "500" }}>
          HOME
        </Link>
      </li>

      <li className="has-dropdown has-mega-menu">
        <Link href="/shop" style={{ fontWeight: "500" }}>
          SHOP
        </Link>
        <div className="home-menu tp-submenu tp-mega-menu">
          <div className="row">
            <div
              className="col-lg-2"
              style={{ backgroundColor: "#c3935b", padding: "0px" }}
            >
              <ul>
                <li
                  className={`shop-submenu-catageroy-list ${
                    lastHoveredCategory === "Earrings" ? "active" : ""
                  }`}
                  onMouseEnter={() => setLastHoveredCategory("Earrings")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingRight: "10px",
                  }}
                  onClick={() => {
                    router.push({
                      pathname: "/shop",
                      query: { categoryId: "Q2F0ZWdvcnk6NQ==" }, // Your parameters
                    });
                  }}
                >
                  <p
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "Earrings" ? "active" : ""
                    }`}
                  >
                    Earrings
                  </p>
                  <RightOutlined
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "Earrings" ? "active" : ""
                    }`}
                  />
                </li>

                <li
                  className={`shop-submenu-catageroy-list ${
                    lastHoveredCategory === "Necklaces" ? "active" : ""
                  }`}
                  onMouseEnter={() => setLastHoveredCategory("Necklaces")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingRight: "10px",
                  }}
                  onClick={() => {
                    router.push({
                      pathname: "/shop",
                      query: { categoryId: "Q2F0ZWdvcnk6NzA=" }, // Your parameters
                    });
                  }}
                >
                  <p
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "Necklaces" ? "active" : ""
                    }`}
                  >
                    Necklaces
                  </p>
                  <RightOutlined
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "Necklaces" ? "active" : ""
                    }`}
                  />
                </li>

                <li
                  className={`shop-submenu-catageroy-list ${
                    lastHoveredCategory === "Bangles" ? "active" : ""
                  }`}
                  onMouseEnter={() => setLastHoveredCategory("Bangles")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingRight: "10px",
                  }}
                  onClick={() => {
                    router.push({
                      pathname: "/shop",
                      query: { categoryId: "Q2F0ZWdvcnk6Njc=" }, // Your parameters
                    });
                  }}
                >
                  <p
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "Bangles" ? "active" : ""
                    }`}
                  >
                    Bangles & Bracelets
                  </p>
                  <RightOutlined
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "Bangles" ? "active" : ""
                    }`}
                  />
                </li>

                <li
                  className={`shop-submenu-catageroy-list ${
                    lastHoveredCategory === "Rings" ? "active" : ""
                  }`}
                  onMouseEnter={() => setLastHoveredCategory("Rings")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingRight: "10px",
                  }}
                  onClick={() => {
                    router.push({
                      pathname: "/shop",
                      query: { categoryId: "Q2F0ZWdvcnk6MTIwNw==" }, // Your parameters
                    });
                  }}
                >
                  <p
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "Rings" ? "active" : ""
                    }`}
                  >
                    Rings
                  </p>
                  <RightOutlined
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "Rings" ? "active" : ""
                    }`}
                  />
                </li>

                <li
                  className={`shop-submenu-catageroy-list ${
                    lastHoveredCategory === "Anklets" ? "active" : ""
                  }`}
                  onMouseEnter={() => setLastHoveredCategory("Anklets")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingRight: "10px",
                  }}
                  onClick={() => {
                    router?.push({
                      pathname: "/shop",
                      query: { categoryId: "Q2F0ZWdvcnk6NzM1" }, // Your parameters
                    });
                  }}
                >
                  <p
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "Anklets" ? "active" : ""
                    }`}
                  >
                    Anklets
                  </p>
                  <RightOutlined
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "Anklets" ? "active" : ""
                    }`}
                  />
                </li>

                <li
                  className={`shop-submenu-catageroy-list ${
                    lastHoveredCategory === "OtherAccessories" ? "active" : ""
                  }`}
                  onMouseEnter={() =>
                    setLastHoveredCategory("OtherAccessories")
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingRight: "10px",
                  }}
                  onClick={() => {
                    router?.push({
                      pathname: "/shop",
                      query: { categoryId: "Q2F0ZWdvcnk6Mzk0Nw==" }, // Your parameters
                    });
                  }}
                >
                  <p
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "OtherAccessories" ? "active" : ""
                    }`}
                  >
                    Other Accessories
                  </p>
                  <RightOutlined
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "Other Accessories"
                        ? "active"
                        : ""
                    }`}
                  />
                </li>
              </ul>
            </div>
            <div className="col-lg-10">
              <div className="tp-mega-menu-item">
                <CategoryComponent
                  commonImage="/path/to/your/common/image.jpg" // Add the path to your common image
                  lastHoveredCategory={lastHoveredCategory}
                  setLastHoveredCategory={setLastHoveredCategory}
                />
              </div>
            </div>
          </div>
        </div>
      </li>

      <li>
        <Link href="/gift-card" style={{ fontWeight: "500" }}>
          GIFT CARD
        </Link>
      </li>
      {/* {token && (
        <li>
          <Link href="/myOrders" style={{ fontWeight: "500" }}>
            MY-ORDERS
          </Link>
        </li>
      )} */}

      <li>
        <Link href="/pre-orders" style={{ fontWeight: "500" }}>
          PRE-ORDERS
        </Link>
      </li>

      <li>
        <Link href="/sale" style={{ fontWeight: "500" }}>
          SALE
        </Link>
      </li>
      <li>
        <Link href="/about" style={{ fontWeight: "500" }}>
          ABOUT
        </Link>
      </li>
      <li>
        <Link href="/contact" style={{ fontWeight: "500" }}>
          CONTACT US
        </Link>
      </li>
    </ul>
  );
};

export default Menus;
