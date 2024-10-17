import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactModal from "react-modal";
// internal
import { handleModalClose } from "@/redux/features/productModalSlice";
import DetailsThumbWrapperQuick from "@/components/product-details/details-thumb-wrapper-quick";
import DetailsWrapperQuick from "@/components/product-details/details-wrapper-quick";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "calc(100% - 50px)",
  },
};

const ProductModal = () => {
  const { productItem, isModalOpen, parentSlug } = useSelector(
    (state) => state.productModal
  );

  const { img, status } = productItem || {};

  const [activeImg, setActiveImg] = useState(img);
  const [channel, setChannel] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const channel = localStorage.getItem("channel");
    setChannel(channel);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Prevent scroll
    } else {
      document.body.style.overflow = "auto"; // Restore scroll
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

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
              activeImg={activeImg}
              parentSlug={parentSlug}
            />
            {/* product-details-wrapper end */}
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default ProductModal;
