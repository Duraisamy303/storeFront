import Image from "next/image";
import { useState } from "react";
import PopupVideo from "../common/popup-video";
import Loader from "../loader/loader";
import { profilePic } from "@/utils/constant";
import { FullscreenOutlined } from "@ant-design/icons";
import { UpOutlined, DownOutlined } from "@ant-design/icons";

const DetailsThumbWrapper = ({
  imgWidth,
  imgHeight,
  videoId,
  status,
  product,
  imgHeightMobile,
}) => {
  const imageUrls = product?.images?.map((item) => item?.url);

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(imageUrls?.[0] || "");
  const [loading, setLoading] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState("50% 50%");
  const [isZoomed, setIsZoomed] = useState(false);

  // lightbox state
  const [showLightbox, setShowLightbox] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageActive = (item, index) => {
    setActiveImg(item);
    setSelectedImageIndex(index);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
    setBackgroundPosition("50% 50%"); // Center the image when the mouse leaves
  };

  // Lightbox functions
  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setShowLightbox(true);
  };

  const handleLightboxClose = () => {
    setShowLightbox(false);
    setSelectedImageIndex(0); // Reset the selected image index
  };

  const navigateImage = (direction) => {
    if (direction === "prev") {
      setSelectedImageIndex((prevIndex) =>
        prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
      );
    } else if (direction === "next") {
      setSelectedImageIndex((prevIndex) =>
        prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handleNavigationClick = (event) => {
    event.stopPropagation(); // Prevent propagation of the click event
    navigateImage(event.target.name);
  };

  
  const handleNavigationClicking = (direction) => {
    const currentIndex = imageUrls.indexOf(activeImg);
    let newIndex;

    if (direction === "prev") {
      newIndex = currentIndex === 0 ? imageUrls.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === imageUrls.length - 1 ? 0 : currentIndex + 1;
    }

    const newActiveImage = imageUrls[newIndex];
    handleImageActive(newActiveImage);

    // Scroll into view
    document.getElementById(`image-${newIndex}`)?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  return (
    <>
      <div className="tp-product-details-thumb-wrapper tp-tab d-sm-flex w-100">
      
        <nav className="product-side-nav-img" style={{height: imageUrls?.length > 4 ? "740px": "auto", overflow:"hidden"}}>
          <div className="nav nav-tabs flex-sm-column">
            {imageUrls?.map((item, i) => {
              return (
                <button
                  key={i}
                  className={`nav-link ${item === activeImg ? "active" : ""}`}
                  onClick={() => handleImageActive(item, i)}
                  style={{
                    height: imageUrls?.length > 3 ? "180px" : "250px",
                  }}
                >
                  <Image
                    src={item}
                    alt="image"
                    width={78}
                    height={100}
                    style={{ width: "100%", height: "100%" }}
                  />
                </button>
              );
            })}
          </div>

          <UpOutlined
            className="prev-btn"
            onClick={() => handleNavigationClicking("prev")}
            style={{
              fontSize: "12px",
              background: "#f2efec",
              borderRadius: "50%",
              padding: "3px",
              color: "black",
              position: "absolute",
              left: "80px",
              top: "20px",
              opacity: "0.8",
            }}
          />
          <DownOutlined
            className="next-btn"
            onClick={() => handleNavigationClicking("next")}
            style={{
              fontSize: "12px",
              background: "#f2efec",
              borderRadius: "50%",
              padding: "3px",
              color: "black",
              position: "absolute",
              left: "80px",
              bottom: "20px",
              opacity: "0.8",
            }}
          />

        </nav>
        <div className="tab-content m-img details-section-main-image">
          <div className="tab-pane fade show active details-section-main-image-cover">
            <div
              className="tp-product-details-nav-main-thumb p-relative"
              style={{ overflow: "hidden", display:"flex", justifyContent:"center" }}
            >
              {loading ? (
                <Loader />
              ) : (
                <div
                  style={{
                    position: "relative",
                    width: `${imgWidth}px`,
                    height: `${imgHeight}px`,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      overflow: "hidden",
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    // onClick={() => handleImageClick(selectedImageIndex)}
                  >
                    <Image
                      src={profilePic(activeImg)}
                      alt="product img"
                      width={imgWidth}
                      height={imgHeight}
                      className="imageHover"
                      style={{
                        cursor: "pointer",
                        transform: isZoomed ? "scale(2)" : "scale(1)",
                        transformOrigin: backgroundPosition,
                        transition: "transform 0.1s ease-in-out",
                      
                      }}
                    />
                  </div>
                  <FullscreenOutlined
                    style={{
                      position: "absolute",
                      bottom: "5px",
                      left: "50px",
                      transform: "translate(-50%, -50%)",
                      color: "gray",
                      padding: "10px",
                      background: "white",
                      borderRadius: "50%",
                      zIndex: 1,
                    }}
                    onClick={() => handleImageClick(selectedImageIndex)}
                  />
                </div>
              )}

              <div className="tp-product-badge">
                {status === "out-of-stock" && (
                  <span className="product-hot">out-stock</span>
                )}
              </div>

              <div className="tp-product-badge-2">
                {product?.defaultVariant?.quantityAvailable === 0 && (
                  <span
                    className="product-hot text-center"
                    style={{ padding: "15px 12px", fontSize: "12px" }}
                  >
                    SOLD
                    <br /> OUT
                  </span>
                )}
              </div>

              <div
                className={`${
                  product?.defaultVariant?.quantityAvailable === 0
                    ? "tp-product-badge"
                    : "tp-product-badge-2"
                }`}
              >
                {product?.metadata?.filter((item) => item.key === "label")
                  .length > 0 &&
                  product.metadata
                    .filter((item) => item.key === "label")
                    .map((item, index) => (
                      <span
                        key={index}
                        className="product-trending text-center"
                        style={{
                          padding: "18px 12px",
                          textTransform: "capitalize",
                        }}
                      >
                        {item.value}
                      </span>
                    ))}
              </div>
              {videoId && (
                <div
                  onClick={() => setIsVideoOpen(true)}
                  className="tp-product-details-thumb-video"
                >
                  <a className="tp-product-details-thumb-video-btn cursor-pointer popup-video">
                    <i className="fas fa-play"></i>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* modal popup start */}
      {videoId && (
        <PopupVideo
          isVideoOpen={isVideoOpen}
          setIsVideoOpen={setIsVideoOpen}
          videoId={videoId}
        />
      )}
      {/* modal popup end */}

      {showLightbox && (
        <div
          className="lightbox"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
          onClick={handleLightboxClose}
        >
          <button
            className="prev-btn"
            onClick={handleNavigationClick}
            name="prev"
            style={{
              fontSize: "18px",
              background: "#c78b2e",
              padding: "5px 15px",
              color: "white",
              position: "absolute",
              left: "20px", // Adjusted position
            }}
          >
            &lt;
          </button>
          <Image
            src={imageUrls[selectedImageIndex]}
            alt="Lightbox"
            width={imgWidth }
            height={imgHeight }
            style={{
              width: "100%",
              maxWidth: "90%",
              maxHeight: "90%",
              objectFit: "contain",
            }}
          />
          <button
            onClick={handleLightboxClose}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px", // Adjusted position
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
            onClick={handleNavigationClick}
            name="next"
            style={{
              fontSize: "18px",
              background: "#c78b2e",
              padding: "5px 15px",
              color: "white",
              position: "absolute",
              right: "20px", // Adjusted position
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
