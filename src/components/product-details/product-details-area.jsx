import React, { useState, useEffect } from "react";
import DetailsThumbWrapper from "./details-thumb-wrapper";
import DetailsWrapper from "./details-wrapper";
import { useDispatch } from "react-redux";
import DetailsTabNav from "./details-tab-nav";
import RelatedProducts from "./related-products";

const ProductDetailsArea = ({ productItem }) => {
  console.log("productItem: ", productItem);
  const {  images, imageURLs, videoId, status } = productItem || {};
  const [activeImg, setActiveImg] = useState(images[0]);
  const dispatch = useDispatch();
  // active image change when img change
  useEffect(() => {
    setActiveImg(images);
  }, [images]);

  // handle image active
  const handleImageActive = (item) => {
    setActiveImg(item.img);
  };
  return (
    <section className="tp-product-details-area">
      <div className="tp-product-details-top pb-115">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-5 col-lg-6">
              {/* product-details-thumb-wrapper start */}
              <DetailsThumbWrapper
                activeImg={productItem?.images[0]?.url}
                handleImageActive={handleImageActive}
                imageURLs={imageURLs}
                imgWidth={580}
                imgHeight={670}
                videoId={videoId}
                status={status}
              />
              {/* product-details-thumb-wrapper end */}
            </div>
            <div className="col-xl-7 col-lg-6">
              {/* product-details-wrapper start */}
              <DetailsWrapper
                productItem={productItem}
                handleImageActive={handleImageActive}
                activeImg={productItem?.images[0]?.url}
                detailsBottom={false}
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

      {/* related products start */}
      <section className="tp-related-product pt-50 pb-50">
        <div className="container-fluid">
          <div className="row">
            <div className="tp-section-title-wrapper-6 text-center mb-40">
              <span className="tp-section-title-pre-6">Next day Products</span>
              <h3 className="tp-section-title-6">Related Products</h3>
            </div>
          </div>
          <div className="row">
            <RelatedProducts id={productItem?.id} />
          </div>
        </div>
      </section>
      {/* related products end */}
    </section>
  );
};

export default ProductDetailsArea;
