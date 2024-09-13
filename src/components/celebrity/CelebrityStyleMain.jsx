import React, { useState } from "react";
import Image from "next/image";
import CelebrityData from "@/data/celebrity";
import {
  UpOutlined,
  DownOutlined,
  MergeCellsOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";

const CelebrityStyleMain = () => {
  const [showLightbox, setShowLightbox] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setShowLightbox(true);
  };

  const handleLightboxClose = () => {
    setShowLightbox(false);
    setSelectedImageIndex(null);
  };

  const navigateImage = (direction) => {
    if (direction === "prev") {
      setSelectedImageIndex((prevIndex) =>
        prevIndex === 0 ? CelebrityData.length - 1 : prevIndex - 1
      );
    } else if (direction === "next") {
      setSelectedImageIndex((prevIndex) =>
        prevIndex === CelebrityData.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handleNavigationClick = (event) => {
    event.stopPropagation(); // Prevent propagation of the click event
    navigateImage(event.target.name);
  };

  return (
    <section className="tp-cart-area pb-50 pt-50">
      <div className="container">
        <div className="row">
          {CelebrityData.map((item, index) => (
            <div className=" col-lg-3 col-6 col-md-4" key={item?.id}>
              <div
                className="celebrity-img-outer"
                onClick={() => handleImageClick(index)}
              >
                <Image
                  src={item?.img}
                  alt={item?.designation}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <p style={{ color: "black", paddingTop: "10px" }}>{item?.name}</p>
            </div>
          ))}
        </div>
      </div>

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
            onClick={handleNavigationClick}
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
            &lt;
          </button>

          <Image
            src={CelebrityData[selectedImageIndex]?.img}
            alt="Lightbox"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            onClick={handleNavigationClick}
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
            onClick={handleNavigationClick}
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
            &gt;
          </button>
        </div>
      )}
      {/* {showLightbox && (
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
            src={CelebrityData[selectedImageIndex]?.img}
            alt="Lightbox"
            style={{
              width: "100%",
              maxWidth: "90%",
              maxHeight: "90%",
              objectFit: "contain",
            }}
            onClick={handleNavigationClick}
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
            <i class="fal fa-times"></i>
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
      )} */}
    </section>
  );
};

export default CelebrityStyleMain;
