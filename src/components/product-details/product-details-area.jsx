import React, { useState, useEffect, useRef } from "react";
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
import { useGetRelatedProductsQuery } from "@/redux/features/productApi";
const ProductDetailsArea = ({
  productItem,
  pageTitle,
  detailsRefetch,
  youMayLikeData,
  isGiftCard,
  parentSlug
}) => {
  const router = useRouter();
  const { media, imageURLs, videoId, status } = productItem || {};
  const [activeImg, setActiveImg] = useState(null);
  const dispatch = useDispatch();

  const id = productItem?.category[0]?.id;
  const {
    data: related_product,
    isError,
    isLoading,
  } = useGetRelatedProductsQuery({ id });

  const productsList = related_product?.data?.category?.products?.edges;

  const sameProduct = productsList?.filter((item) => {
    return item?.node?.id !== router?.query?.id;
  });

  const removeHiddenCategory = sameProduct?.filter((item) => {
    return item?.node?.category.some((cat) => cat?.name === "Hidden");
  });

  const idsToRemove = removeHiddenCategory?.map((item) => item.node.id);

  const relatedproducts = sameProduct?.filter(
    (item) => !idsToRemove.includes(item.node.id)
  );


  // active image change when img change
  useEffect(() => {
    setActiveImg(media);
  }, [media]);

  // handle image active
  const handleImageActive = (item) => {
    setActiveImg(item);
  };

  // Ref to the related products section
  const relatedProductsRef = useRef(null);

  const relatedClicked = () => {
    // Scroll to the related products section
    relatedProductsRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="tp-product-details-area pt-40"
      style={{ backgroundColor: "#f4f4f4" }}
    >
      <div className="tp-product-details-top">
        <div className="container">
          <div className="row">
            <div
              className="col-xl-7 col-lg-7"
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
                relatedClick={() => relatedClicked()}
              />
              {/* product-details-thumb-wrapper end */}
            </div>
            <div className="col-xl-5 col-lg-5">
              {/* product-details-wrapper start */}
              <DetailsWrapper
                productItem={productItem}
                productRefetch={detailsRefetch}
                handleImageActive={handleImageActive}
                activeImg={productItem?.media[0]?.url}
                detailsBottom={false}
                pageTitle={pageTitle}
                isGiftCard={isGiftCard}
                parentSlug={parentSlug}
              />
              {/* product-details-wrapper end */}
            </div>
          </div>
        </div>
      </div>

      {/* product details description */}
      <div className="tp-product-details-bottom pb-40"></div>
      {/* product details description */}

      {router.route == "/gift-card" ? (
        <></>
      ) : (
        <>
          {/* related products start */}
          {relatedproducts?.length > 0 && (
            <section
              className="tp-related-product pt-40"
              ref={relatedProductsRef}
            >
              <div className="container-fluid">
                <div className="row">
                  <div className="tp-section-title-wrapper-6 mb-10">
                    {/* <span className="tp-section-title-pre-6">Next day Products</span> */}
                    <h3 className="tp-section-title-6">Similar Products</h3>
                  </div>
                </div>

                <div className="row">
                  <RelatedProducts products={relatedproducts} relatedProductLoading={isLoading} relatedProductErr={isError} id={productItem?.category[0]?.id} />
                </div>
              </div>
            </section>
          )}

          {youMayLikeData?.length > 0 && (
            <section className="tp-related-product pt-40">
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
