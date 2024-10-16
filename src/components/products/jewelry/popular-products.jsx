import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar } from "swiper";
import { Navigation, Autoplay } from "swiper";
// internal
import {
  useFeatureProductQuery,
  useGetProductTypeQuery,
} from "@/redux/features/productApi";
import ProductSliderItem from "./product-slider-item";
import ErrorMsg from "@/components/common/error-msg";
import { HomeTwoPopularPrdLoader } from "@/components/loader";
import LoginForm from "@/components/forms/login-form";
import ProductItem from "../beauty/product-item";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
// slider setting
const slider_setting = {
  slidesPerView: 4,
  spaceBetween: 10,
  navigation: {
    prevEl: ".tp-related-slider-button-prev",
    nextEl: ".tp-related-slider-button-next",
  },
  // autoplay: {
  //   delay: 5000,
  // },
  breakpoints: {
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
    350: {
      slidesPerView: 2,
    },
    0: {
      slidesPerView: 1,
    },
  },
};

const PopularProducts = () => {
  const {
    data: productsData,
    isError,
    isLoading,
  } = useGetProductTypeQuery({ channel: "india-channel", first: 19 });

  const { data: featureProduct, isLoading: loading } = useFeatureProductQuery({
    channel: "india-channel",
    first: 21,
    after: null,
    filter: {
      categories: ["Q2F0ZWdvcnk6MjQ5Njc="],
    },
  });

  const [featureProducts, setFeatureProducts] = useState([]);
  // decide what to render

  useEffect(() => {
    featureProductData();
  }, [featureProduct]);

  const featureProductData = () => {
    try {
      const data = featureProduct?.data?.productsSearch?.edges;
      setFeatureProducts(data);

      // if (featureProduct) {
      //   console.log("featureProduct: ", featureProduct);
      //   if (
      //     featureProduct?.data &&
      //     featureProduct?.data?.collections &&
      //     featureProduct?.data?.collections?.edges?.length > 0
      //   ) {
      //     if (featureProduct?.data?.collections?.edges[0]?.node) {
      //       if (
      //         featureProduct?.data?.collections?.edges[0]?.node?.products?.edges
      //           ?.length > 0
      //       ) {
      //         const list =
      //           featureProduct?.data?.collections?.edges[0]?.node?.products
      //             ?.edges;

      //         const removeHiddenCategory = list?.filter((item) => {
      //           return item?.node?.category.some(
      //             (cat) => cat?.name === "Hidden"
      //           );
      //         });

      //         const idsToRemove = removeHiddenCategory?.map(
      //           (item) => item.node.id
      //         );

      //         const products = list?.filter(
      //           (item) => !idsToRemove.includes(item.node.id)
      //         );

      //       }
      //     }
      //   }
      // }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  let content = null;
  const products = productsData?.data?.productsSearch?.edges;

  if (loading) {
    content = <HomeTwoPopularPrdLoader loading={loading} />;
  }
  if (!loading) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!loading && featureProducts?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  }
  if (!loading && featureProducts?.length > 0) {
    // const product_items = products.slice(0, 8);
    content = (
      <Swiper
        {...slider_setting}
        modules={[Navigation]}
        className="tp-category-slider-active-4 swiper-container"
      >
        {featureProducts?.map((item) => (
          <SwiperSlide key={item._id}>
            <ProductItem
              product={item?.node}
              primary_style={true}
              data={featureProducts}
            />
          </SwiperSlide>
        ))}
        <div className="tp-related-slider-button-prev swiper-button-prev">
          <LeftOutlined />
        </div>
        <div className="tp-related-slider-button-next swiper-button-next">
          <RightOutlined />
        </div>

        {/* <SwiperSlide key={item.id}>
          <ProductSliderItem product={item} />
        </SwiperSlide> */}
      </Swiper>
    );
  }
  return (
    <>
      <section
        className="tp-category-area tp-category-plr-85"
        style={{ backgroundColor: `#EFF1F5` }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-section-title-wrapper-4  home-section-heading  text-center">
                <h5
                  className="popular-adipisicing"
                  style={{ fontWeight: "400" }}
                >
                  Handpicked Favourites
                </h5>
                <h4 style={{ fontWeight: "400" }}>FEATURED PRODUCTS</h4>
                <p style={{ color: "gray", fontSize: "14px" }}>
                  Explore the latest and most sought-after products, specially
                  curated for you
                </p>
              </div>
            </div>
          </div>
          <div className="row pb-30">
            <div className="col-xl-12">
              <div className="tp-category-slider-4">
                {content}
                {/* <div className="tp-category-swiper-scrollbar tp-swiper-scrollbar"></div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PopularProducts;
