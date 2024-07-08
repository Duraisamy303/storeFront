import React, { useState, useRef, useEffect } from "react";
import Loader from "../loader/loader";
import { profilePic } from "@/utils/constant";
import {
  UpOutlined,
  DownOutlined,
  MergeCellsOutlined,
} from "@ant-design/icons";

const DetailsThumbWrapper = ({ product }) => {
  const imageUrls = product?.images?.map((item) => item?.url) || [];
  const [activeImg, setActiveImg] = useState(imageUrls[0] || "");
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const buttonRef = useRef(null);
  const timeoutId = useRef(null);

  const handleImageActive = (item) => {
    setActiveImg(item);
    // setPhotoIndex(imageUrls.indexOf(item));
  };

  const handleNavigationClicking = (direction) => {
    const currentIndex = imageUrls.indexOf(activeImg);
    let newIndex;
    if (direction === "prev") {
      newIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
    } else {
      newIndex = (currentIndex + 1) % imageUrls.length;
    }
    setActiveImg(imageUrls[newIndex]);
    setPhotoIndex(newIndex);
  };

  const handleMouseEnter = () => {
    clearTimeout(timeoutId.current);
    setIsHovered(true);
    timeoutId.current = setTimeout(() => setShowText(true), 300);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutId.current);
    setIsHovered(false);
    setShowText(false);
  };

  const handleLightboxClose = () => {
    setIsOpen(false);
  };

  const handleLightboxPrev = (e) => {
    e.stopPropagation();
    handleNavigationClicking("prev");
  };

  const handleLightboxNext = (e) => {
    e.stopPropagation();
    handleNavigationClicking("next");
  };

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  return (
    <>
      <div
        className={`tp-product-details-thumb-wrapper tp-tab ${
          imageUrls.length > 1 ? "d-sm-flex" : ""
        } w-100`}
      >
        {imageUrls?.length > 1 && (
          <nav className="product-side-nav-img">
            <div className="nav nav-tabs flex-sm-column">
              {imageUrls.map((item, i) => (
                <button
                  key={i}
                  className={`nav-link ${item === activeImg ? "active" : ""}`}
                  onClick={() => handleImageActive(item)}
                  id={`image-${i}`}
                >
                  <img
                    src={item}
                    alt={`Product image ${i + 1}`}
                    width={78}
                    height={100}
                    style={{ width: "100%", height: "100%" }}
                  />
                </button>
              ))}
            </div>
            {imageUrls.length > 4 && (
              <>
                <UpOutlined
                  className="prev-btn"
                  onClick={() => handleNavigationClicking("prev")}
                />
                <DownOutlined
                  className="next-btn"
                  onClick={() => handleNavigationClicking("next")}
                />
              </>
            )}
          </nav>
        )}

        <div
          className={`tab-content m-img ${
            imageUrls.length === 1 ? "full-width-image" : ""
          }`}
        >
          <div className="tab-pane fade show active">
            <div className="tp-product-details-nav-main-thumb p-relative">
              {loading ? (
                <Loader />
              ) : (
                <>
                  <div
                    style={{ cursor: "zoom-in" }}
                    onClick={() => setIsOpen(true)}
                  >
                    <img
                      src={profilePic(activeImg)}
                      alt="Active product image"
                      style={{ width: "100%", height: "auto" }}
                      onLoad={() => setLoading(false)}
                      onError={() => setLoading(false)}
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                    }}
                  >
                    <button
                      ref={buttonRef}
                      className="btn btn-primary"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        border: "none",
                        background: "rgb(194, 136, 43)",
                        padding: "7px 0px",
                        borderRadius: "50px",
                        color: "white",
                        transition: "width 0.3s ease-in-out",
                        minWidth: "40px",
                        width: isHovered
                          ? `${buttonRef.current?.offsetWidth + 50}px`
                          : "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MergeCellsOutlined />
                      {showText && (
                        <span
                          style={{
                            fontWeight: "500",
                            marginLeft: "5px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          View Similar
                        </span>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="lightbox"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            zIndex: 999,
            overflow: "auto", // Enable scrolling
            // Hide scrollbar for IE, Edge and Firefox
            msOverflowStyle: "none", // IE and Edge
            scrollbarWidth: "none", // Firefox
          }}
          onClick={handleLightboxClose}  
        >
          <button
            className="prev-btn"
            onClick={handleLightboxPrev}
            name="prev"
            style={{
              fontSize: "18px",
              background: "#c78b2e",
              padding: "5px 15px",
              color: "white",
              position: "fixed",
              left: "20px",
              top:"50vh",
            }}
          >
            &lt;
          </button>
          <img
            src={imageUrls[photoIndex]}
            alt="Lightbox"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "none",
              maxHeight: "none",
              objectFit: "contain",
            }}
          />
          <button
            onClick={handleLightboxClose}
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              background: "none",
              border: "none",
              fontSize: "18px",
              color: "white",
              cursor: "pointer",
            }}
          >
            <i className="fal fa-times"></i>
          </button>
          <button
            className="next-btn"
            onClick={handleLightboxNext}
            name="next"
            style={{
              fontSize: "18px",
              background: "#c78b2e",
              padding: "5px 15px",
              color: "white",
              position: "fixed",
              right: "20px",
              top:"50vh",
            }}
          >
            &gt;
          </button>
        </div>
      )}
    </>
  );
};

export default DetailsThumbWrapper;
