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
import CommonImage from "../../../../public/assets/img/earring-menu-pic-1.png";
import Loader from "../../../components/loader/loader";
import { useDispatch } from "react-redux";
import { filterData } from "@/redux/features/shop-filter-slice";

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
    const categoryMap = {
      Earrings: "Q2F0ZWdvcnk6MTE2NDU=",
      Necklaces: "Q2F0ZWdvcnk6MTE2NDI=",
      Bangles: "Q2F0ZWdvcnk6MTE2NDc=",
      Rings: "Q2F0ZWdvcnk6MTE2NTU=",
      Anklets: "Q2F0ZWdvcnk6MTIxNTI=",
      Idols: "Q2F0ZWdvcnk6MTM1ODc=",
      OtherAccessories: "Q2F0ZWdvcnk6MTI0MTU=",
    };

    const categoryId = categoryMap[categoryName] || ""; // Retrieve the category ID or set to an empty string if not found
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
                  <a
                    href={`/shop?categoryId=${item?.node?.id}`}
                    className="cursor-pointer"
                    style={{
                      fontWeight: "500",
                      marginBottom: "0px",
                      color: "gray",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { categoryId: item?.node?.id }, // Your parameters
                      });
                    }}
                  >
                    {item?.node?.name}
                  </a>
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
              {commonImage ? (
                <img
                  src={commonImage}
                  alt="category image"
                  style={{ width: "100%", height: "250px" }}
                />
              ) : (
                <img
                  src={"/assets/img/earring-menu-pic-1.png"}
                  alt="category image"
                  style={{ width: "100%", height: "250px" }}
                />
              )}
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
  const [priceFilter, { isLoading: productLoading }] = usePriceFilterMutation();
  const [productList, setProductList] = useState([]);
  const [categoryImage, setCategoryImage] = useState([]);
  const [subCategoryLists, setSubCategoryLists] = useState([]);

  const [subCatList, { isLoading: loadingProduct }] = useSubCatListMutation();

  const categoryMap = {
    Earrings: {
      id: "Q2F0ZWdvcnk6MTE2NDU=",
      title: "ALL EARRINGS",
    },
    Necklaces: {
      id: "Q2F0ZWdvcnk6MTE2NDI=",
      title: "ALL NECKLACES",
    },
    Bangles: {
      id: "Q2F0ZWdvcnk6MTE2NDc=",
      title: "ALL BANGLES & BRACELETS",
    },
    Rings: {
      id: "Q2F0ZWdvcnk6MTE2NTU=",
      title: "ALL RINGS",
    },
    Anklets: {
      id: "Q2F0ZWdvcnk6MTIxNTI=",
      title: "ALL ANKLETS",
    },
    OtherAccessories: {
      id: "Q2F0ZWdvcnk6MTI0MTU=",
      title: "ALL OTHER ACCESSORIES",
    },
    Idols: {
      id: "Q2F0ZWdvcnk6MTM1ODc=",
      title: "IDOLS",
    },
  };

  const currentCategory = hoveredCategory || lastHoveredCategory;

  const handleCategoryHover = (category) => {
    setHoveredCategory(category);
    setLastHoveredCategory(category);
  };

  const handleCategoryLeave = () => {
    setLastHoveredCategory(hoveredCategory);
    setHoveredCategory(hoveredCategory);
  };

  useEffect(() => {
    if (currentCategory) {
      filterByCategory(currentCategory);
    }
  }, [hoveredCategory, lastHoveredCategory]);

  const filterByCategory = async (category) => {
    const categoryId = categoryMap[category]?.id || "";

    if (categoryId) {
      const SubCategory = await subCatList({ parentid: categoryId });
      setSubCategoryLists(SubCategory?.data?.data?.category?.children?.edges);

      priceFilter({
        filter: { categories: categoryId },
        sortBy: { direction: "DESC", field: "CREATED_AT" },
        first: 12,
        after: null,
      }).then((res) => {
        const list = res?.data?.data?.productsSearch?.edges?.slice(0, 11);
        const result = list
          ?.map((item) => item.node?.category)
          ?.flatMap((subArray) =>
            subArray.find(
              (item) => item.id === categoryId && item.backgroundImageUrl !== ""
            )
          );

        setCategoryImage(result?.[0]?.backgroundImageUrl || commonImage);
        setProductList(list);
      });
    }
  };

  const renderContent = () => {
    if (productList?.length === 0) return null;

    return loadingProduct || productLoading ? (
      <SingleLoader loading={loadingProduct} />
    ) : productList?.length > 0 ? (
      <Swiper
        {...slider_setting}
        modules={[Pagination]}
        className="tp-category-slider-active-4 swiper-container"
      >
        {productList?.map((item) => (
          <SwiperSlide key={item?.id}>
            <div
              className="col-lg-3 menus-product-list"
              style={{ padding: "0px 8px 0px 0px", width: "250px" }}
            >
              <MenusProductSlider product={item} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    ) : (
      <div
        style={{
          fontSize: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Product Not Found
      </div>
    );
  };

  const renderCategoryContent = () => {
    if (!currentCategory || !categoryMap[currentCategory]) return null;

    const { title } = categoryMap[currentCategory];
    return (
      <CategoryContent
        title={title}
        commonImage={categoryImage}
        lists={subCategoryLists}
        categoryName={lastHoveredCategory}
      >
        {renderContent()}
      </CategoryContent>
    );
  };

  return <div>{renderCategoryContent()}</div>;
};

function SingleLoader({ loading }) {
  return (
    <div
      className="col-xl-3 col-lg-3 col-sm-6 d-flex align-items-center"
      style={{ height: "300px" }}
    >
      <Loader loading={loading} />
    </div>
  );
}

const Menus = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const [lastHoveredCategory, setLastHoveredCategory] = useState("Earrings");

  useEffect(() => {
    dispatch(filterData({}));
  }, [router]);

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
                      query: { categoryId: "Q2F0ZWdvcnk6MTE2NDU=" }, // Your parameters
                    });
                  }}
                >
                  <a
                    href="/shop?categoryId=Q2F0ZWdvcnk6MTE2NDU="
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a cursor-pointer ${
                      lastHoveredCategory === "Earrings" ? "active" : ""
                    }`}
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { categoryId: "Q2F0ZWdvcnk6MTE2NDU=" }, // Your parameters
                      });
                    }}
                  >
                    Earrings
                  </a>

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
                      query: { categoryId: "Q2F0ZWdvcnk6MTE2NDI=" }, // Your parameters
                    });
                  }}
                >
                  <a
                    href="/shop?categoryId=Q2F0ZWdvcnk6MTE2NDI="
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a cursor-pointer ${
                      lastHoveredCategory === "Necklaces" ? "active" : ""
                    }`}
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { categoryId: "Q2F0ZWdvcnk6MTE2NDI=" }, // Your parameters
                      });
                    }}
                  >
                    Necklaces
                  </a>
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
                      query: { categoryId: "Q2F0ZWdvcnk6MTE2NDc=" }, // Your parameters
                    });
                  }}
                >
                  <a
                    href="/shop?categoryId=Q2F0ZWdvcnk6MTE2NDc="
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a cursor-pointer ${
                      lastHoveredCategory === "Bangles" ? "active" : ""
                    }`}
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { categoryId: "Q2F0ZWdvcnk6MTE2NDc=" }, // Your parameters
                      });
                    }}
                  >
                    Bangles & Bracelets
                  </a>
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
                      query: { categoryId: "Q2F0ZWdvcnk6MTE2NTU=" }, // Your parameters
                    });
                  }}
                >
                  <a
                    href="/shop?categoryId=Q2F0ZWdvcnk6MTE2NTU="
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a cursor-pointer ${
                      lastHoveredCategory === "Rings" ? "active" : ""
                    }`}
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { categoryId: "Q2F0ZWdvcnk6MTE2NTU=" }, // Your parameters
                      });
                    }}
                  >
                    Rings
                  </a>

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
                      query: { categoryId: "Q2F0ZWdvcnk6MTIxNTI=" }, // Your parameters
                    });
                  }}
                >
                  <a
                    href="/shop?categoryId=Q2F0ZWdvcnk6MTIxNTI="
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a cursor-pointer ${
                      lastHoveredCategory === "Anklets" ? "active" : ""
                    }`}
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { categoryId: "Q2F0ZWdvcnk6MTIxNTI=" }, // Your parameters
                      });
                    }}
                  >
                    Anklets
                  </a>
                  <RightOutlined
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "Anklets" ? "active" : ""
                    }`}
                  />
                </li>

                <li
                  className={`shop-submenu-catageroy-list ${
                    lastHoveredCategory === "Idols" ? "active" : ""
                  }`}
                  onMouseEnter={() => setLastHoveredCategory("Idols")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingRight: "10px",
                  }}
                  onClick={() => {
                    router?.push({
                      pathname: "/shop",
                      query: { categoryId: "Q2F0ZWdvcnk6MTM1ODc=" }, // Your parameters
                    });
                  }}
                >
                  <a
                    href="/shop?categoryId=Q2F0ZWdvcnk6MTM1ODc="
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a cursor-pointer ${
                      lastHoveredCategory === "Idols" ? "active" : ""
                    }`}
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { categoryId: "Q2F0ZWdvcnk6MTM1ODc=" }, // Your parameters
                      });
                    }}
                  >
                    Idols
                  </a>
                  <RightOutlined
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "Idols" ? "active" : ""
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
                      query: { categoryId: "Q2F0ZWdvcnk6MTI0MTU=" }, // Your parameters
                    });
                  }}
                >
                  <a
                    href="/shop?categoryId=Q2F0ZWdvcnk6MTI0MTU="
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a cursor-pointer ${
                      lastHoveredCategory === "OtherAccessories" ? "active" : ""
                    }`}
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { categoryId: "Q2F0ZWdvcnk6MTI0MTU=" }, // Your parameters
                      });
                    }}
                  >
                    Other Accessories
                  </a>
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
                  commonImage="/assets/img/earring-menu-pic-1.png" // Add the path to your common image
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
          LOOT SALE
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
