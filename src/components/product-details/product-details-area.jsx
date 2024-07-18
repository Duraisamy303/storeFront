import React, { useState, useEffect } from "react";
import DetailsThumbWrapper from "./details-thumb-wrapper";
import DetailsWrapper from "./details-wrapper";
import { useDispatch } from "react-redux";
import DetailsTabNav from "./details-tab-nav";
import RelatedProducts from "./related-products";
import { useRouter } from "next/router";
import ProductItem from "../products/beauty/product-item";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation, Autoplay } from "swiper";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { slider_setting } from "../../utils/functions";

const ProductDetailsArea = ({
  productItem,
  pageTitle,
  detailsRefetch,
  youMayLikeData,
}) => {
  const router = useRouter();
  const { images, imageURLs, videoId, status } = productItem || {};
  const [activeImg, setActiveImg] = useState(null);
  const dispatch = useDispatch();
  // active image change when img change
  useEffect(() => {
    setActiveImg(images);
  }, [images]);

  // handle image active
  const handleImageActive = (item) => {
    setActiveImg(item);
  };

  const imageUrls = productItem?.images?.map((item) => item?.url);

  

  return (
    <section
      className="tp-product-details-area pt-50"
      style={{ backgroundColor: "#f4f4f4" }}
    >
      <div className="tp-product-details-top">
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-xl-8 col-lg-7"
              style={{ maxWidth: "100%", overflow: "hidden" }}
            >
              {/* product-details-thumb-wrapper start */}
              <DetailsThumbWrapper
                product={productItem}
                imgWidth={800}
                imgHeight={740}
                imgHeightMobile={540}
                videoId={videoId}
                status={status}
              />
              {/* product-details-thumb-wrapper end */}
            </div>
            <div className="col-xl-4 col-lg-5">
              {/* product-details-wrapper start */}
              <DetailsWrapper
                productItem={productItem}
                productRefetch={detailsRefetch}
                handleImageActive={handleImageActive}
                activeImg={productItem?.media[0]?.url}
                detailsBottom={false}
                pageTitle={pageTitle}
              />
              {/* product-details-wrapper end */}
            </div>
          </div>
        </div>
      </div>

      {/* product details description */}
      <div className="tp-product-details-bottom pb-50">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              {/* <DetailsTabNav product={productItem} /> */}
            </div>
          </div>
        </div>
      </div>
      {/* product details description */}

      {router.route == "/gift-card" ? (
        <></>
      ) : (
        <>
          {/* related products start */}
          {productItem?.category?.id && (
            <section className="tp-related-product pt-50">
              <div className="container-fluid">
                <div className="row">
                  <div className="tp-section-title-wrapper-6 mb-40">
                    {/* <span className="tp-section-title-pre-6">Next day Products</span> */}
                    <h3 className="tp-section-title-6">Related Products</h3>
                  </div>
                </div>

                <div className="row">
                  <RelatedProducts id={productItem?.category?.id} />
                </div>
              </div>
            </section>
          )}

          {youMayLikeData?.length > 0 && (
            <section className="tp-related-product pt-50">
              <div className="container-fluid">
                <div className="row">
                  <div className="tp-section-title-wrapper-6 mb-40">
                    {/* <span className="tp-section-title-pre-6">Next day Products</span> */}
                    <h3 className="tp-section-title-6">You May Like This...</h3>
                  </div>
                </div>

                <div className="row">
                  <Swiper
                    {...slider_setting}
                    modules={[Autoplay, Navigation]}
                    className="tp-product-related-slider-active swiper-container mb-10"
                  >
                    {youMayLikeData?.map((item) => (
                      <SwiperSlide key={item._id}>
                        <ProductItem
                          product={item?.data?.product}
                          primary_style={true}
                          data={youMayLikeData}
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
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* related products end */}
    </section>
  );
};

export default ProductDetailsArea;
