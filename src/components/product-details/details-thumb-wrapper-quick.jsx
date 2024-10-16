import Image from "next/image";
import { useState } from "react";
import PopupVideo from "../common/popup-video";
import Loader from "../loader/loader";
import { profilePic } from "@/utils/constant";
import { UpOutlined, DownOutlined } from "@ant-design/icons";

const DetailsThumbWrapperQuick = ({ videoId = false, status, product }) => {
  const imageUrls = product?.media?.map((item) => item?.url);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(imageUrls?.[0]);
  const [loading, setLoading] = useState(false);

  const handleImageActive = (item) => {
    setLoading(true);
    setActiveImg(item);
    setLoading(false);
  };

  const handleNavigationClick = (direction) => {
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
    document.getElementById(`image-${newIndex}`).scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };


  const isImage = (url) => {
    return /\.(jpg|webp|jpeg|png|gif)$/i.test(url);
  };

  return (
    <>
      <div className="tp-product-details-thumb-wrapper tp-tab d-sm-flex quickview-first-section pt-30 pt-lg-0">
        <nav
          className="product-side-nav-img quickview-nav-wrapper "
          style={{
            height: imageUrls?.length > 4 ? "420px" : "auto",
            overflow: "hidden",
          }}
        >
          {" "}
          <div className="nav nav-tabs quickview-nav-tabs-main ">
            {imageUrls?.map((item, i) => (
              <button
                key={i}
                className={`nav-link quickview-nav-image  ${
                  item === activeImg ? "active" : ""
                }`}
                onClick={() => handleImageActive(item)}
                id={`image-${i}`}
              >
                {/* <Image
                  src={profilePic(item)}
                  alt="thumbnail"
                  width={78}
                  height={100}
                  style={{ width: "100%", height: "100%" }}
                /> */}
                {isImage(profilePic(item)) ? (
                  <img
                    src={profilePic(item)}
                    alt="thumbnail"
                    width={78}
                    height={100}
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <video
                    src={profilePic(item)}
                    width={78}
                    height={100}
                    style={{ width: "100%", height: "100%" }}
                    muted
                    loop
                  />
                )}
              </button>
            ))}
          </div>
          {imageUrls?.length > 3 && (
            <>
              {" "}
              <UpOutlined
                className=" quickview-nav-prev-btn"
                onClick={() => handleNavigationClick("prev")}
              />
              <DownOutlined
                className="quickview-nav-next-btn"
                onClick={() => handleNavigationClick("next")}
              />
            </>
          )}
        </nav>
        <div className="tab-content m-img quickview-tab-content">
          <div className="tab-pane fade show active">
            <div className="tp-product-details-nav-main-thumb p-relative">
              {loading ? (
                <Loader />
              ) : (
                // <Image
                //   src={profilePic(activeImg)}
                //   alt="product img"
                //   width={imgWidth}
                //   height={imgHeight}
                // />
                <>
                  {isImage(activeImg) ? (
                    <img
                      src={profilePic(activeImg)}
                      alt="product img"
                      className="quickview-main-image"
                    />
                  ) : (
                    <video
                      src={profilePic(activeImg)}
                      className="quickview-main-image"
                      autoPlay
                      muted // Ensure it's muted to autoplay without user interaction
                      loop // Ensure it loops indefinitely
                      playsInline // Ensure it plays inline on iOS devices
                    />
                  )}
                  {/* <img
                  src={profilePic(activeImg)}
                  alt="product img"
                  width={imgWidth}
                  height={imgHeight}
                /> */}
                </>
              )}

              <div className="tp-product-badge">
                {status === "out-of-stock" && (
                  <span className="product-hot">out-stock</span>
                )}
              </div>

              <div className="tp-product-badge-2">
                {product?.defaultVariant?.quantityAvailable == 0 && (
                  <span className="product-hot text-center soldout-badge">
                    SOLD
                    <br /> OUT
                  </span>
                )}
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
    </>
  );
};

export default DetailsThumbWrapperQuick;
