import React, { useState, useRef, useEffect } from "react";
import Loader from "../loader/loader";
import { profilePic } from "@/utils/constant";
import {
  UpOutlined,
  DownOutlined,
  MergeCellsOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";

const DetailsThumbWrapper = ({ product, relatedClick }) => {
  const Router = useRouter();

  const [activeImg, setActiveImg] = useState(product?.media[0] || "");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const buttonRef = useRef(null);
  const timeoutId = useRef(null);
  const [startIndex, setStartIndex] = useState(0);
  const [hover, setHover] = useState(false);

  const handleImageActive = (item) => {
    setActiveImg(item);
  };

  const handleNavigationClicking = (direction) => {
    const currentIndex = product?.media?.findIndex(
      (item) => item.url === activeImg?.url
    );
    let newIndex;
    if (direction === "prev") {
      newIndex =
        (currentIndex - 1 + product?.media?.length) % product?.media?.length;
    } else {
      newIndex = (currentIndex + 1) % product?.media?.length;
    }
    setActiveImg(product?.media[newIndex]);
    setPhotoIndex(newIndex);

    if (direction === "prev" && startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    } else if (
      direction === "next" &&
      startIndex < product?.media?.length - 4
    ) {
      setStartIndex((prev) => prev + 1);
    }
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

  const handleClick = () => {
    relatedClick();
  };

  const isImage = (url) => {
    return /\.(jpg|webp|jpeg|png|gif)$/i.test(url);
  };

  return (
    <>
      <div
        className={`tp-product-details-thumb-wrapper tp-tab d-md-flex
        w-100`}
      >
        {/* {product?.media?.length > 1 && ( */}
        <nav className="product-side-nav-img p-relative">
          <div className="nav nav-tabs flex-md-column flex-nowrap justify-content-start">
            {product?.media
              ?.slice(startIndex, startIndex + 4)
              .map((item, i) => (
                <button
                  key={i + startIndex}
                  className={`nav-link ${
                    item?.url === activeImg?.url ? "active" : ""
                  }`}
                  onClick={() => handleImageActive(item)}
                  id={`image-${i}`}
                >
                  {isImage(profilePic(item?.url)) ? (
                    <figure>
                      <img
                        src={item?.url}
                        alt={item?.alt}
                        description={item?.description}
                        caption={item?.caption}
                        title={item?.title}
                        width={78}
                        height={100}
                        style={{ width: "100%", height: "100%" }}
                      />
                      {/* <figcaption className="hidden-for-seo">
                          <strong>{item?.title}</strong> 
                          <p>{item?.description}</p>
                          <em>{item?.caption}</em> 
                        </figcaption> */}
                    </figure>
                  ) : (
                    <figure>
                      <video
                        src={item?.url}
                        aria-label={item?.alt}
                        width={78}
                        height={100}
                        style={{ width: "100%", height: "100%" }}
                        muted
                        loop
                        description={item?.description}
                        caption={item?.caption}
                        title={item?.title}
                      />
                      {/* <figcaption className="hidden-for-seo">
                          <strong>{item?.title}</strong> 
                          <p>{item?.description}</p> 
                          <em>{item?.caption}</em> 
                        </figcaption> */}
                    </figure>
                  )}
                </button>
              ))}
          </div>
          {product?.media?.length > 3 && (
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
        {/* )} */}

        <div className={`tab-content m-img full-width-image`}>
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
                    {isImage(profilePic(activeImg?.url)) ? (
                      <figure
                        className="detail-single-image"
                        style={{ marginBottom: "0px" }}
                      >
                        <img
                          className="product-details-image"
                          description={activeImg?.description}
                          caption={activeImg?.caption}
                          title={activeImg?.title}
                          src={profilePic(activeImg?.url)}
                          alt={activeImg.alt}
                          onLoad={() => setLoading(false)}
                          onError={() => setLoading(false)}
                        />
                        {/* <figcaption className="hidden-for-seo">
                          <strong>{activeImg?.title}</strong> 
                          <p>{activeImg?.description}</p>
                          <em>{activeImg?.caption}</em> 
                        </figcaption> */}
                      </figure>
                    ) : (
                      <figure
                        style={{ marginBottom: "0px" }}
                        className="detail-single-image"
                      >
                        <video
                          className="product-details-image"
                          src={activeImg?.url}
                          autoPlay
                          muted // Ensure it's muted to autoplay without user interaction
                          loop // Ensure it loops indefinitely
                          playsInline // Ensure it plays inline on iOS devices
                          onLoadedData={() => setLoading(false)}
                          onError={() => setLoading(false)}
                          aria-label={activeImg?.alt}
                          description={activeImg?.description}
                          caption={activeImg?.caption}
                          title={activeImg?.title}
                        />
                        {/* <figcaption className="hidden-for-seo">
                          <strong>{activeImg?.title}</strong> 
                          <p>{activeImg?.description}</p> 
                          <em>{activeImg?.caption}</em> 
                        </figcaption> */}
                      </figure>
                    )}
                  </div>
                  {Router.route == "/gift-card" ? (
                    <></>
                  ) : (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        right: "10px",
                      }}
                    >
                      <button
                        className={`animated-button ${hover ? "hover" : ""}`}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        onClick={handleClick}
                      >
                        <span className="icon">
                          <MergeCellsOutlined stytle={{ fontSize: "18px" }} />
                        </span>
                        <span className="text">Similar Product</span>
                      </button>
                    </div>
                  )}
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
            onClick={handleLightboxPrev}
            name="prev"
            style={{
              fontSize: "18px",
              background: "rgb(0 0 0 / 40%)",
              padding: "5px 10px",
              color: "white",
              position: "fixed",
              left: "20px",
              top: "50vh",
            }}
          >
            <LeftOutlined />
          </button>

          {isImage(
            profilePic(activeImg?.url) || product?.media[photoIndex]?.url
          ) ? (
            <img
              src={
                profilePic(activeImg?.url) || product?.media[photoIndex]?.url
              }
              alt="Lightbox"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "none",
                maxHeight: "none",
                objectFit: "contain",
              }}
              onLoad={() => setLoading(false)}
              onError={() => setLoading(false)}
            />
          ) : (
            <video
              src={
                profilePic(activeImg?.url) || product?.media[photoIndex]?.url
              }
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "none",
                maxHeight: "none",
                objectFit: "contain",
              }}
              controls
              onLoadedData={() => setLoading(false)}
              onError={() => setLoading(false)}
            />
          )}
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
            onClick={handleLightboxNext}
            name="next"
            style={{
              fontSize: "18px",
              background: "rgb(0 0 0 / 40%)",
              padding: "5px 10px",
              color: "white",
              position: "fixed",
              right: "20px",
              top: "50vh",
            }}
          >
            <RightOutlined />
          </button>
        </div>
      )}
    </>
  );
};

export default DetailsThumbWrapper;
