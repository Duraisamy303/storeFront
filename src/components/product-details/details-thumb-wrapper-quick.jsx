import Image from "next/image";
import { useState } from "react";
import PopupVideo from "../common/popup-video";
import Loader from "../loader/loader";
import { profilePic } from "@/utils/constant";
import { UpOutlined, DownOutlined } from "@ant-design/icons";

const DetailsThumbWrapperQuick = ({
  imgWidth = 416,
  imgHeight = 480,
  videoId = false,
  status,
  product,
}) => {
  const imageUrls = product?.images?.map((item) => item?.url);
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

  return (
    <>
      <div className="tp-product-details-thumb-wrapper tp-tab d-sm-flex">
        <nav
          className="product-side-nav-img"
          style={{
            height: imageUrls?.length > 4 ? "420px" : "auto",
            overflow: "hidden",
          }}
        >
          {" "}
          <div className="nav nav-tabs flex-sm-column">
            {imageUrls?.map((item, i) => (
              <button
                key={i}
                className={`nav-link ${item === activeImg ? "active" : ""}`}
                onClick={() => handleImageActive(item)}
                id={`image-${i}`}
                style={{ border: "none", background: "none", padding: 0 }}
              >
                <Image
                  src={profilePic(item)}
                  alt="thumbnail"
                  width={78}
                  height={100}
                  style={{ width: "100%", height: "100%" }}
                />
              </button>
            ))}
          </div>
          {imageUrls?.length > 4 && (
            <>
              {" "}
              <UpOutlined
                className="prev-btn"
                onClick={() => handleNavigationClick("prev")}
                style={{
                  fontSize: "12px",
                  background: "#f2efec",
                  borderRadius: "50%",
                  padding: "3px",
                  color: "black",
                  position: "absolute",
                  left: "70px",
                  top: "20px",
                  opacity: "0.8",
                }}
              />
              <DownOutlined
                className="next-btn"
                onClick={() => handleNavigationClick("next")}
                style={{
                  fontSize: "12px",
                  background: "#f2efec",
                  borderRadius: "50%",
                  padding: "3px",
                  color: "black",
                  position: "absolute",
                  left: "70px",
                  bottom: "80px",
                  opacity: "0.8",
                }}
              />
            </>
          )}
        </nav>
        <div className="tab-content m-img">
          <div className="tab-pane fade show active">
            <div className="tp-product-details-nav-main-thumb p-relative">
              {loading ? (
                <Loader />
              ) : (
                <Image
                  src={profilePic(activeImg)}
                  alt="product img"
                  width={imgWidth}
                  height={imgHeight}
                />
              )}

              <div className="tp-product-badge">
                {status === "out-of-stock" && (
                  <span className="product-hot">out-stock</span>
                )}
              </div>

              <div className="tp-product-badge-2">
                {product?.defaultVariant?.quantityAvailable == 0 && (
                  <span
                    className="product-hot text-center"
                    style={{ padding: "15px 12px" }}
                  >
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
