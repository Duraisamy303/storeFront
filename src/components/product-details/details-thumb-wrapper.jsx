import Image from "next/image";
import { useState, useEffect } from "react";
import PopupVideo from "../common/popup-video";
import Loader from "../loader/loader";

const DetailsThumbWrapper = ({
  imgWidth = 416,
  imgHeight = 480,
  videoId = false,
  status,
  product,
}) => {

  const imageUrls = product?.images?.map((item) => item?.url);

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeImg, setActiveImg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageActive = (item) => {
    setLoading(true);
    setActiveImg(item);
    setLoading(false);
  };
  return (
    <>
      <div className="tp-product-details-thumb-wrapper tp-tab d-sm-flex">
        <nav className="product-side-nav-img">
          <div className="nav nav-tabs flex-sm-column">
            {imageUrls?.map((item, i) => (
            <button
              key={i}
              className={`nav-link ${item === activeImg ? "active" : ""}`}
              onClick={() => handleImageActive(item)}
            >
              <Image
                src={item}
                alt="image"
                width={78}
                height={100}
                style={{ width: "100%", height: "100%" }}
              />
            </button>
            ))}
          </div>
        </nav>
        <div className="tab-content m-img">
          <div className="tab-pane fade show active">
            <div className="tp-product-details-nav-main-thumb p-relative">
              {loading ? (
                <Loader />
              ) : (
                <Image
                  src={activeImg ? activeImg : imageUrls[0]}
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

export default DetailsThumbWrapper;
