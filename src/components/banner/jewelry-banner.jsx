import React, { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
// internal
import slider_img_1 from "@assets/img/banner/earrings.jpg";
import slider_img_2 from "@assets/img/banner/necklace.jpg";
import slider_img_3 from "@assets/img/banner/bangles.jpg";
import slider_img_4 from "@assets/img/banner/ring.jpg";
import slider_img_5 from "@assets/img/banner/anklet.jpg";
import slider_img_6 from "@assets/img/banner/idol.jpg";
import slider_img_7 from "@assets/img/banner/other.jpg";

// nav icon
import nav_icon_1 from "@assets/img/slider/4/nav/icon-1.png";
import nav_icon_2 from "@assets/img/slider/4/nav/icon-2.png";
import nav_icon_3 from "@assets/img/slider/4/nav/icon-3.png";
import nav_icon_4 from "@assets/img/slider/4/nav/icon-7.png";
import nav_icon_5 from "@assets/img/slider/4/nav/icon-5.png";
import nav_icon_6 from "@assets/img/slider/4/nav/icon-7.png";
import nav_icon_7 from "@assets/img/slider/4/nav/icon-6.png";
import nav_icon_8 from "@assets/img/slider/4/nav/icon-8.png";
import { ArrowNextTwo, ArrowPrevTwo, Pause, Play } from "@/svg";
import text_shape from "@assets/img/slider/4/shape/rounded-test.png";
import Link from "next/link";
import { useRouter } from "next/router";

// slider data
const slider_data = [
  {
    subtitle: "Exquisite earrings",
    title: "To shine bright and elevate your style",
    img: slider_img_1,
    content:
      "Adorn your ears with timeless designs that speak of grace and beauty",
    shopId: "earrings",
  },
  {
    subtitle: "Elegant Jewellery",
    title: "Reflecting timeless craftsmanship and heritage",
    img: slider_img_2,
    content:
      "Luxurious ethnic jewellery that is a blend of traditional motifs and modern sophistication, perfect for any occasion.",

    shopId: "necklaces",
  },
  {
    subtitle: "Beautiful bracelets",
    title: "Classic charm that never goes out of style",
    img: slider_img_3,
    content:
      "Every piece of our handcrafted bracelets is a work of art that resonates your unique style",
    shopId: "bangles__bracelets",
  },
  {
    subtitle: "Designed to captivate",
    title: "Timeless, handcrafted rings for every occasion",
    img: slider_img_4,
    content: "Stunning collections that convey grace and sophistication",
    shopId: "finger_rings",
  },
  {
    subtitle: "Delicate Anklets",
    title: "That blends tradition and modern flair",
    img: slider_img_5,
    content:
      "Adorn your ankles with stunning designs that complement every step",
    shopId: "anklets",
  },
  {
    subtitle: "Handcrafted Idols",
    title: "For meaningful worship",
    img: slider_img_6,
    content:
      "Celebrate the richness of tradition and honour your heritage and express your devotion in a meaningful way",
    shopId: "idols",
  },
  {
    subtitle: "Stunning Accessories",
    title: "To complete your look",
    img: slider_img_7,
    content:
      "Provides the perfect finishing touch to showcase your individuality",
    shopId: "other_accessories",
  },
];

// slider nav data
const slider_nav_data = [
  { icon: nav_icon_1, title: <>EARRINGS</>, id: "earrings" },
  { icon: nav_icon_3, title: <>NECKLACES</>, id: "necklaces" },
  {
    icon: nav_icon_2,
    title: <>BANGLES & BRACELETS</>,
    id: "bangles__bracelets",
  },
  { icon: nav_icon_4, title: <>RINGS</>, id: "finger_rings" },
  { icon: nav_icon_5, title: <>ANKLETS</>, id: "anklets" },
  { icon: nav_icon_8, title: <>IDOLS</>, id: "idols" },
  {
    icon: nav_icon_7,
    title: <>OTHER ACCESSORIES</>,
    id: "other_accessories",
  },
];

const JewelryBanner = () => {
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  const router = useRouter();

  //  slider setting
  const main_slider_setting = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    centerMode: false,
  };
  // nav slider setting
  const nav_slider_setting = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    dots: false,
    arrows: false,
    centerMode: false,
    focusOnSelect: true,
  };

  //
  const [play, setPlay] = useState(false);

  const handleToggle = () => {
    if (play === false) {
      setPlay(true);
      const videos = document.querySelectorAll(".tp-slider-video video");
      videos.forEach((video) => video.play());
    } else {
      setPlay(false);
      const videos = document.querySelectorAll(".tp-slider-video video");
      videos.forEach((video) => video.pause());
    }
  };
  return (
    <>
      <section className="tp-slider-area p-relative z-index-1 fix">
        <Slider
          {...main_slider_setting}
          asNavFor={slider2}
          ref={(slider) => setSlider1(slider)}
          className="tp-slider-active-4 khaki-bg"
        >
          {slider_data.map((item, i) => (
            <div
              key={i}
              className="tp-slider-item-4 tp-slider-height-4 p-relative khaki-bg d-flex align-items-center"
            >
              <div className="tp-slider-thumb-4">
                <Image
                  src={item.img}
                  alt="slider img"
                  className="mobile-view-width-change"
                />
                <div className="tp-slider-thumb-4-shape">
                  <span className="tp-slider-thumb-4-shape-1"></span>
                  <span className="tp-slider-thumb-4-shape-2"></span>
                </div>
              </div>

              <div className="tp-slider-video-wrapper mobile-view-hide ">
                {/* <!-- video --> */}
                <div
                  className={`tp-slider-video transition-3 ${
                    play ? "full-width" : ""
                  }`}
                >
                  <video loop>
                    <source
                      type="video/mp4"
                      src="http://weblearnbd.net/tphtml/videos/shofy/jewellery-1.mp4#t=3"
                    />
                  </video>
                </div>
                {/* <!-- video button --> */}
                {/* <div className="tp-slider-play">

                  <button onClick={handleToggle} type="button" className={`tp-slider-play-btn tp-slider-video-move-btn tp-video-toggle-btn ${play?'hide':''}`}>
                    <Image className="text-shape" src={text_shape} alt="text shape" priority />
                    <span className="play-icon">
                      <Play/>
                    </span>
                    <span className="pause-icon">
                      <Pause/>
                    </span>
                  </button>
                </div> */}
              </div>

              <div className="container mobile-view-hide">
                <div className="row align-items-center">
                  <div className="col-xl-6 col-lg-6 col-md-8">
                    <div className="tp-slider-content-4 p-relative z-index-1">
                      <span>{item.subtitle}</span>
                      <h3 className="tp-slider-title-4" style={{textTransform: "Uppercase"}}>{item.title}</h3>
                      <p className="tp-slider-content-4">{item?.content}</p>
                      <div className="tp-slider-btn-4">
                        <button
                          onClick={() => {
                            router.push({
                              pathname: "/shop",
                              query: { category: item?.shopId }, // Your parameters
                            });
                          }}
                          className="tp-btn tp-btn-border tp-btn-border-white"
                        >
                          Discover Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* arrow start */}
        <div className="tp-slider-arrow-4">
          <button
            className="tp-slider-3-button-prev slick-arrow"
            onClick={() => slider1?.slickPrev()}
          >
            <ArrowPrevTwo />
          </button>
          <button
            className="tp-slider-3-button-next slick-arrow"
            onClick={() => slider1?.slickNext()}
          >
            <ArrowNextTwo />
          </button>
        </div>
        {/* arrow end */}

        <div className="tp-slider-nav mobile-view-hide">
          <Slider
            {...nav_slider_setting}
            asNavFor={slider1}
            ref={(slider) => setSlider2(slider)}
            className="tp-slider-nav-active"
          >
            {slider_nav_data.map((item, i) => (
              <div
                key={i}
                className="tp-slider-nav-item d-flex align-items-center"
              >
                <div className="tp-slider-nav-icon">
                  <span>
                    <Image src={item.icon} alt="icon" />
                  </span>
                </div>
                <div className="tp-slider-nav-content">
                  <h3 className="tp-slider-nav-title">{item?.title}</h3>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default JewelryBanner;
