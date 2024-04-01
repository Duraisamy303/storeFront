import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactModal from "react-modal";
// internal
import { handleModalClose } from "@/redux/features/productModalSlice";
import DetailsThumbWrapper from "@/components/product-details/details-thumb-wrapper";
import DetailsWrapper from "@/components/product-details/details-wrapper";
import { initialOrderQuantity } from "@/redux/features/cartSlice";

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

  const { img, imageURLs, status } = productItem || {};
  const imageUrls=productItem?.images?.map((item)=>item?.url)
  console.log("imageUrls: ", imageUrls);

  const [activeImg, setActiveImg] = useState(img);

  const dispatch = useDispatch();
  // active image change when img change
  useEffect(() => {
    dispatch(initialOrderQuantity());
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
            <DetailsThumbWrapper
              product={productItem}
              status={status}
            />
            {/* product-details-thumb-wrapper end */}

            {/* product-details-wrapper start */}
            <DetailsWrapper
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
