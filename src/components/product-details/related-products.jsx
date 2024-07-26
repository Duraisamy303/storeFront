import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation, Autoplay } from "swiper";
import { useGetRelatedProductsQuery } from "@/redux/features/productApi";
import ProductItem from "../products/beauty/product-item";
import ErrorMsg from "../common/error-msg";
import { HomeNewArrivalPrdLoader } from "../loader";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "swiper/swiper-bundle.min.css";
import { useRouter } from "next/router";

const slider_setting = {
  slidesPerView: 4,
  spaceBetween: 10,
  navigation: {
    prevEl: ".tp-related-slider-button-prev",
    nextEl: ".tp-related-slider-button-next",
  },
  autoplay: {
    delay: 5000,
  },
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

const RelatedProducts = ({
  id,
  products,
  relatedProductLoading,
  relatedProductErr,
}) => {

  let content = null;

  if (relatedProductLoading) {
    content = <HomeNewArrivalPrdLoader loading={relatedProductLoading} />;
  } else if (relatedProductErr) {
    content = <ErrorMsg msg="There was an error" />;
  } else if (!relatedProductLoading && products?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  } else if (!relatedProductLoading && products?.length > 0) {
    content = (
      <Swiper
        {...slider_setting}
        modules={[Autoplay, Navigation]}
        className="tp-product-related-slider-active swiper-container mb-10"
      >
        {products.map((item) => (
          <SwiperSlide key={item._id}>
            <ProductItem
              product={item?.node}
              primary_style={true}
              data={products}
            />
          </SwiperSlide>
        ))}
        <div className="tp-related-slider-button-prev swiper-button-prev">
          <LeftOutlined />
        </div>
        <div className="tp-related-slider-button-next swiper-button-next">
          <RightOutlined />
        </div>
      </Swiper>
    );
  }

  return <div className="tp-product-related-slider">{content}</div>;
};

export default RelatedProducts;
