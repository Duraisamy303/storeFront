import React from "react";
import Image from "next/image";
import Link from "next/link";
//internal
import thumb_bg from "@assets/img/product/collection/4/collection-1.jpg";
import side_text from "@assets/img/product/collection/4/side-text.png";
import collection_sm from "@assets/img/product/collection/4/collection-sm-1.jpg";
import { ArrowRightSm, PlusTwo } from "@/svg";
import { Carousel } from "antd";
import profile1 from "@assets/img/carosel-profile1.jpg";
import profile2 from "@assets/img/carosel-profile2.jpg";
import profile3 from "@assets/img/carosel-profile3.jpg";
import actor1 from "@assets/img/collection-actor-1.jpg";
import actor2 from "@assets/img/collection-actor-2.jpg";
import actor3 from "@assets/img/collection-actor-3.jpg";
import actor4 from "@assets/img/collection-actor-4.jpg";
import actor5 from "@assets/img/collection-actor-5.jpg";
import actor6 from "@assets/img/collection-actor-6.jpg";
import { useRouter } from "next/router";

const JewelryCollectionBanner = () => {
  const Router = useRouter();

  const contentStyle = {
    color: "black",
    lineHeight: "400px",
    textAlign: "center",
    background: "#f4f4f4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px 20px",
  };

  const customDotStyle = {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    margin: "0 5px", // Adjust the margin between dots
    border: "2px solid black", // Default outline style
    backgroundColor: "transparent", // Default background color
  };

  const activeDotStyle = {
    ...customDotStyle,
    backgroundColor: "black !important", // Active dot fill color
  };

  const settings = {
    customPaging: (i, active) => (
      <div style={active ? activeDotStyle : customDotStyle}></div>
    ), // Custom dots rendering
    dots: true,
    autoplay: true,
  };

  return (
    <>
      <section
        className="tp-collection-area"
        style={{ backgroundColor: "black" }}
      >
        <div className="container-fluid">
          <div className="tp-collection-inner-4 ">
            <div
              className="row gx-0 align-items-center pt-20 pb-20"
              style={{ background: "black" }}
            >
              <div className="col-xl-6 col-lg-6 gx-0 gy-0">
                <div className="tp-collection-thumb-wrapper-4 p-relative fix z-index-1">
                  <div>
                    <div className="carosel-outer">
                      <Carousel {...settings}>
                        <div className="profile-carosel">
                          <div style={contentStyle}>
                            <div>
                              <h5 className="carosel-adisicing">
                                Voices of Satisfaction
                              </h5>
                              <h3 className="carosel-title">
                                WHAT OUR CLIENTS SAY
                              </h3>
                              <div className="profile-outer">
                                <Image
                                  src={profile1}
                                  alt="profile-1"
                                  className="carosel-profileImg"
                                />
                              </div>
                              <p
                                style={{
                                  marginBottom: "5px",
                                  color: "gray",
                                  fontSize: "14px",
                                }}
                              >
                                I purchased this beautifully crafted beads and
                                kundan necklace from Prade, which had unique
                                craftsmanship for which I received many
                                compliments from my friends and relatives.
                              </p>
                              <p style={{ color: "black", fontSize: "14px" }}>
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    color: "black",
                                    fontSize: "14px",
                                  }}
                                >
                                  Anjali
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="profile-carosel">
                          <div style={contentStyle}>
                            <div>
                              <h5 className="carosel-adisicing">
                                Voices of Satisfaction
                              </h5>
                              <h3 className="carosel-title">
                                WHAT OUR CLIENTS SAY
                              </h3>
                              <div className="profile-outer">
                                <Image
                                  src={profile2}
                                  alt="profile-1"
                                  className="carosel-profileImg"
                                />
                              </div>
                              <p
                                style={{
                                  marginBottom: "5px",
                                  color: "gray",
                                  fontSize: "14px",
                                }}
                              >
                                I had recently purchased their Kundan earrings
                                and they were excellent and perfectly
                                <br /> matched my festival outfit, making my day
                                even more special.
                              </p>
                              <p style={{ color: "black", fontSize: "14px" }}>
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    color: "black",
                                    fontSize: "14px",
                                  }}
                                >
                                  Diya
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="profile-carosel">
                          <div style={contentStyle}>
                            <div>
                              <h5 className="carosel-adisicing">
                                Voices of Satisfaction
                              </h5>
                              <h3 className="carosel-title">
                                WHAT OUR CLIENTS SAY
                              </h3>
                              <div className="profile-outer">
                                <Image
                                  src={profile3}
                                  alt="profile-1"
                                  className="carosel-profileImg"
                                />
                              </div>
                              <p
                                style={{
                                  marginBottom: "5px",
                                  color: "gray",
                                  fontSize: "14px",
                                }}
                              >
                                I was searching for a unique ring, and Prade
                                Jewellery had exactly what I wanted. The ring is
                                stunning, with a design that truly stands out.
                                <br /> I will recommend Prade to my friends.
                              </p>
                              <p style={{ color: "black", fontSize: "14px" }}>
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    color: "black",
                                    fontSize: "14px",
                                  }}
                                >
                                  Priya
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="profile-carosel">
                          <div style={contentStyle}>
                            <div>
                              <h5 className="carosel-adisicing">
                                Voices of Satisfaction
                              </h5>
                              <h3 className="carosel-title">
                                WHAT OUR CLIENTS SAY
                              </h3>
                              <div className="profile-outer">
                                <Image
                                  src={profile3}
                                  alt="profile-1"
                                  className="carosel-profileImg"
                                />
                              </div>
                              <p
                                style={{
                                  marginBottom: "5px",
                                  color: "gray",
                                  fontSize: "14px",
                                }}
                              >
                                Prade has an excellent collection of silver
                                bangles, the team were helpful and guided me
                                through their collection and helped me choose
                                something I liked and it was so comfortable to
                                wear.
                              </p>
                              <p style={{ color: "black", fontSize: "14px" }}>
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    color: "black",
                                    fontSize: "14px",
                                  }}
                                >
                                  Meera
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Carousel>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 gx-0 gy-0 actors-outer">
                <div className="row">
                  <div
                    className="col-md-4 col-6  gx-1 gy-1"
                    onClick={() => Router.push("/celebrity-style")}
                  >
                    <Image src={actor1} alt="actor1" className="actor-img" />
                  </div>
                  <div
                    className="col-md-4 col-6 gx-1 gy-1"
                    onClick={() => Router.push("/celebrity-style")}
                  >
                    <Image src={actor2} alt="actor2" className="actor-img" />
                  </div>
                  <div
                    className="col-md-4 col-6 gx-1 gy-1"
                    onClick={() => Router.push("/celebrity-style")}
                  >
                    <Image src={actor3} alt="actor3" className="actor-img" />
                  </div>

                  <div
                    className="col-md-4 col-6 gx-1 gy-1"
                    onClick={() => Router.push("/celebrity-style")}
                  >
                    <Image src={actor4} alt="actor4" className="actor-img" />
                  </div>
                  <div
                    className="col-md-4 col-6 gx-1 gy-1"
                    onClick={() => Router.push("/celebrity-style")}
                  >
                    <Image src={actor5} alt="actor5" className="actor-img" />
                  </div>
                  <div
                    className="col-md-4 col-6 gx-1 gy-1"
                    onClick={() => Router.push("/celebrity-style")}
                  >
                    <Image src={actor6} alt="actor6" className="actor-img" />
                  </div>
                </div>

                {/* <div className='row'>
                 
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JewelryCollectionBanner;
