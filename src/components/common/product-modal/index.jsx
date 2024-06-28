import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactModal from "react-modal";
// internal
import { handleModalClose } from "@/redux/features/productModalSlice";
import DetailsThumbWrapper from "@/components/product-details/details-thumb-wrapper";
import DetailsWrapper from "@/components/product-details/details-wrapper";
import { initialOrderQuantity } from "@/redux/features/cartSlice";
import DetailsWrapperQuick from "@/components/product-details/details-wrapper-quick";
import DetailsThumbWrapperQuick from "@/components/product-details/details-thumb-wrapper-quick";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "calc(100% - 300px)",
  },
};

const ProductModal = () => {
  const { productItem, isModalOpen } = useSelector(
    (state) => state.productModal
  );

  const { img, imageURLs, status, sku } = productItem || {};
  const imageUrls = productItem?.images?.map((item) => item?.url);

  const [activeImg, setActiveImg] = useState(img);
  const [channel, setChannel] = useState("");

  const dispatch = useDispatch();
  // active image change when img change
  useEffect(() => {
    dispatch(initialOrderQuantity());
    const channel = localStorage.getItem("channel");
    setChannel(channel);
  }, [img, dispatch]);

  // handle image active

  return (
    <div>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => dispatch(handleModalClose())}
        style={customStyles}
        contentLabel="Product Modal"
      >
        <div className="tp-product-modal">
          <div className="tp-product-modal-content d-lg-flex">
            <button
              onClick={() => dispatch(handleModalClose())}
              type="button"
              className="tp-product-modal-close-btn"
            >
              <i className="fa-regular fa-xmark"></i>
            </button>
            {/* product-details-thumb-wrapper start */}
            <DetailsThumbWrapperQuick product={productItem} status={status} />
            {/* product-details-thumb-wrapper end */}

            {/* product-details-wrapper start */}
            <DetailsWrapperQuick
              productItem={productItem}
              // handleImageActive={handleImageActive}
              activeImg={activeImg}
            />
            {/* product-details-wrapper end */}
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default ProductModal;
