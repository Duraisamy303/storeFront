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
      Earrings: "earrings",
      Necklaces: "necklaces",
      bangles__bracelets: "bangles__bracelets",
      finger_rings: "finger_rings",
      Anklets: "anklets",
      Idols: "idols",
      OtherAccessories: "other_accessories",
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
                  key={item?.node?.slug}
                  onClick={() => {
                    router?.push({
                      pathname: "/shop",
                      query: { category: item?.node?.slug }, // Your parameters
                    });
                  }}
                >
                  <a
                    href={`/shop?category=${item?.node?.slug}`}
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
                        query: { category: item?.node?.slug }, // Your parameters
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
                    query: { category: parentCategoryId }, // Your parameters
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
      id: "earrings",
      title: "ALL EARRINGS",
    },
    Necklaces: {
      id: "necklaces",
      title: "ALL NECKLACES",
    },
    bangles__bracelets: {
      id: "bangles__bracelets",
      title: "ALL BANGLES & BRACELETS",
    },
    finger_rings: {
      id: "finger_rings",
      title: "ALL RINGS",
    },
    Anklets: {
      id: "anklets",
      title: "ALL ANKLETS",
    },
    OtherAccessories: {
      id: "other_accessories",
      title: "ALL OTHER ACCESSORIES",
    },
    Idols: {
      id: "idols",
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
      const SubCategory = await subCatList({ slug: categoryId });
      setSubCategoryLists(SubCategory?.data?.data?.category?.children?.edges);

      priceFilter({
        filter: { categorySlugs: categoryId },
        sortBy: { direction: "DESC", field: "CREATED_AT" },
        first: 12,
        after: null,
      }).then((res) => {
        const list = res?.data?.data?.productsSearch?.edges?.slice(0, 11);
        const result = list
          ?.map((item) => item.node?.category)
          ?.flatMap((subArray) =>
            subArray.find(
              (item) => item.slug === categoryId && item.backgroundImageUrl !== ""
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
                      query: { category: "earrings" }, // Your parameters
                    });
                  }}
                >
                  <a
                    href="/shop?category=earrings"
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a cursor-pointer ${
                      lastHoveredCategory === "Earrings" ? "active" : ""
                    }`}
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { category: "earrings" }, // Your parameters
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
                      query: { category: "necklaces" }, // Your parameters
                    });
                  }}
                >
                  <a
                    href="/shop?category=necklaces"
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a cursor-pointer ${
                      lastHoveredCategory === "Necklaces" ? "active" : ""
                    }`}
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { category: "necklaces" }, // Your parameters
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
                    lastHoveredCategory === "bangles__bracelets" ? "active" : ""
                  }`}
                  onMouseEnter={() => setLastHoveredCategory("bangles__bracelets")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingRight: "10px",
                  }}
                  onClick={() => {
                    router.push({
                      pathname: "/shop",
                      query: { category: "bangles__bracelets" }, // Your parameters
                    });
                  }}
                >
                  <a
                    href="/shop?category=bangles__bracelets"
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a cursor-pointer ${
                      lastHoveredCategory === "bangles__bracelets" ? "active" : ""
                    }`}
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { category: "bangles__bracelets" }, // Your parameters
                      });
                    }}
                  >
                    Bangles & Bracelets
                  </a>
                  <RightOutlined
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "bangles__bracelets" ? "active" : ""
                    }`}
                  />
                </li>

                <li
                  className={`shop-submenu-catageroy-list ${
                    lastHoveredCategory === "finger_rings" ? "active" : ""
                  }`}
                  onMouseEnter={() => setLastHoveredCategory("finger_rings")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingRight: "10px",
                  }}
                  onClick={() => {
                    router.push({
                      pathname: "/shop",
                      query: { category: "finger_rings" }, // Your parameters
                    });
                  }}
                >
                  <a
                    href="/shop?category=finger_rings"
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a cursor-pointer ${
                      lastHoveredCategory === "finger_rings" ? "active" : ""
                    }`}
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { category: "finger_rings" }, // Your parameters
                      });
                    }}
                  >
                    Rings
                  </a>

                  <RightOutlined
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "finger_rings" ? "active" : ""
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
                      query: { category: "anklets" }, // Your parameters
                    });
                  }}
                >
                  <a
                    href="/shop?category=anklets"
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a cursor-pointer ${
                      lastHoveredCategory === "Anklets" ? "active" : ""
                    }`}
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { category: "anklets" }, // Your parameters
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
                      query: { category: "idols" }, // Your parameters
                    });
                  }}
                >
                  <a
                    href="/shop?category=idols"
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a cursor-pointer ${
                      lastHoveredCategory === "Idols" ? "active" : ""
                    }`}
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { category: "idols" }, // Your parameters
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
                      query: { category: "other_accessories" }, // Your parameters
                    });
                  }}
                >
                  <a
                    href="/shop?category=other_accessories"
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a cursor-pointer ${
                      lastHoveredCategory === "OtherAccessories" ? "active" : ""
                    }`}
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { category: "other_accessories" }, // Your parameters
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
