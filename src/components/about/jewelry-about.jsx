import React from "react";
import Link from "next/link";
import Image from "next/image";
// internal
import about_img from "@assets/img/about/about-1.jpg";
import about_thumb from "@assets/img/about/about-2.jpg";
import { ArrowRightLong } from "@/svg";

const JewelryAbout = () => {
  return (
    <>
      <section className="tp-about-area pt-50 pb-50">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 text-center">
              <p
                className="tp-about-title mb-25"
                style={{ fontSize: "18px", lineHeight: "40px", color: "gray" }}
              >
                PraDe strives to encapsulate Indian values and sentiments
                through its designs. We look forward to maintain the Indian
                heritage and bring out the tradition and culture.
              </p>
            </div>

            <div className="col-md-6" style={{ position: "relative" }}>
              <div className="about-section-logo">
                <img
                  src="/assets/img/prade-about-logo.jpg"
                  alt="about-thumb"
                  style={{ width: "100%" }}
                />
              </div>
              <div className=" about-section-brand">
                <p
                  style={{
                    color: "black",
                    fontWeight: "400",
                    fontSize: "14px",
                    marginBottom: "5px",
                  }}
                >
                  THE BRAND
                </p>
                <p
                  style={{
                    color: "#777",
                    fontWeight: "100",
                    fontSize: "14px",
                    marginBottom: "5px",
                  }}
                >
                  PRADE JEWELS
                </p>
                <p
                  style={{
                    color: "#777",
                    fontWeight: "400",
                    fontSize: "14px",
                    marginBottom: "5px",
                    lineHeight: "30px",
                  }}
                >
                  Since its founding in 2017, PraDe Jewels & Drapes Private
                  Limited has emerged as a top luxury jewelry brand based in
                  South India. PraDe is renowned for its exquisite collection of
                  pure 925 silver jewelry.
                </p>
              </div>
            </div>

            <div
              className="col-md-6  mt-30 mt-lg-0"
              style={{ position: "relative" }}
            >
              <div className="about-section-logo">
                <img
                  src="/assets/img/prade-about-logo.jpg"
                  alt="about-thumb"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="about-section-brand">
                <p
                  style={{
                    color: "black",
                    fontWeight: "400",
                    fontSize: "14px",
                    marginBottom: "5px",
                  }}
                >
                  DEEPTHI MUTHUSAMY
                </p>
                <p
                  style={{
                    color: "#777",
                    fontWeight: "100",
                    fontSize: "14px",
                    marginBottom: "5px",
                  }}
                >
                  OUR FOUNDER
                </p>
                <p
                  style={{
                    color: "#777",
                    fontWeight: "400",
                    fontSize: "14px",
                    marginBottom: "5px",
                    lineHeight: "30px",
                  }}
                >
                  Deepthi Muthusamy, with her roots in Chennai, is an
                  independent jewelry designer with a keen eye for creative
                  pieces . Possessing an innate sense of aesthetics and a wealth
                  of inherited knowledge, she combines her extensive experience
                  and interest in design to create stunning and wearable pieces.
                  Her creations, both traditional and contemporary, consistently
                  captivate and delight our customers.
                </p>
              </div>
            </div>
          </div>

          <div className="row align-items-center ">
            <div
              className="col-md-6 mt-30 mt-lg-50"
              style={{ position: "relative" }}
            >
              <div className="about-section-logo">
                <img
                  src="/assets/img/prade-about-logo.jpg"
                  alt="about-thumb"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="about-section-brand">
                <p
                  style={{
                    color: "black",
                    fontWeight: "400",
                    fontSize: "14px",
                    marginBottom: "5px",
                  }}
                >
                  OUR DESIGNS & PRODUCTS
                </p>
                <p
                  style={{
                    color: "#777",
                    fontWeight: "100",
                    fontSize: "14px",
                    marginBottom: "5px",
                  }}
                >
                  PRADE
                </p>
                <p
                  style={{
                    color: "#777",
                    fontWeight: "400",
                    fontSize: "14px",
                    marginBottom: "5px",
                    lineHeight: "30px",
                  }}
                >
                  PraDe deals with wide range of silver jewellery including but
                  not limited to necklaces, earrings, bangles, anklets, etc.,
                  that can go well with traditional as well as indo–western
                  outfits.
                </p>
                <p
                  style={{
                    color: "#777",
                    fontWeight: "400",
                    fontSize: "14px",
                    marginBottom: "5px",
                    lineHeight: "30px",
                  }}
                >
                  We at PraDe support handmade craft and our jewels are lovingly
                  handmade by our artisans. PraDe has always been the first
                  choice for many of the leading stylists and artists in the
                  industry. For more details you can access **Celebrity Blog
                  Link**.
                </p>
              </div>
            </div>

            <div
              className="col-md-6  mt-30 mt-lg-0"
              style={{ position: "relative" }}
            >
              <div className="about-section-logo">
                <img
                  src="/assets/img/prade-about-logo.jpg"
                  alt="about-thumb"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="about-section-brand">
                <p
                  style={{
                    color: "black",
                    fontWeight: "400",
                    fontSize: "14px",
                    marginBottom: "5px",
                  }}
                >
                  OUR TEAM
                </p>
                <p
                  style={{
                    color: "#777",
                    fontWeight: "100",
                    fontSize: "14px",
                    marginBottom: "5px",
                  }}
                >
                  PRADE
                </p>
                <p
                  style={{
                    color: "#777",
                    fontWeight: "400",
                    fontSize: "14px",
                    marginBottom: "5px",
                    lineHeight: "30px",
                  }}
                >
                  We have a strong team which strives to ensure a complete
                  customer focus both in terms of full knowledge of our designs
                  and customer enquiries. The zeal and enthusiasm of our Founder
                  is carried forward by our team. Prioritizing the sensibilities
                  of our customers is always our priority and we have been
                  providing the most delightful experience to them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JewelryAbout;
