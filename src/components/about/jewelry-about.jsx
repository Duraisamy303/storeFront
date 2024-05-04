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
                style={{ fontSize: "24px", lineHeight: "40px", color: "gray" }}
              >
                PraDe strives to encapsulate Indian values and sentiments
                through its designs. We look forward to maintain the Indian
                heritage and bring out the tradition and culture.
              </p>
            </div>

            <div className="col-md-6 about-section-brand">
              <p
                style={{
                  color: "black",
                  fontWeight: "500",
                  fontSize: "20px",
                  marginBottom: "5px",
                }}
              >
                THE BRAND
              </p>
              <p
                style={{
                  color: "gray",
                  fontWeight: "400",
                  fontSize: "18px",
                  marginBottom: "5px",
                }}
              >
                PRADE JEWELS
              </p>
              <p
                style={{
                  color: "black",
                  fontWeight: "400",
                  fontSize: "16px",
                  marginBottom: "5px",
                  lineHeight: "30px",
                }}
              >
                PraDe Jewels is a leading luxury jewellery label founded in 2017
                and is based out of South India. PraDe deals in Pure 925 Silver
                Jewellery. We at PraDe bring you a different perspective on
                authentic handcrafted Silver Jewellery with high standards.
              </p>
              <p
                style={{
                  color: "black",
                  fontWeight: "400",
                  fontSize: "16px",
                  marginBottom: "5px",
                  lineHeight: "30px",
                }}
              >
                PraDe strives to encapsulate Indian values and sentiments
                through its designs. We look forward to maintain the Indian
                heritage and bring out the tradition and culture.
              </p>
            </div>

            <div className="col-md-6 about-section-brand">
              <p
                style={{
                  color: "black",
                  fontWeight: "500",
                  fontSize: "20px",
                  marginBottom: "5px",
                }}
              >
                DEEPTHI MUTHUSAMY
              </p>
              <p
                style={{
                  color: "gray",
                  fontWeight: "400",
                  fontSize: "18px",
                  marginBottom: "5px",
                }}
              >
                OUR FOUNDER
              </p>
              <p
                style={{
                  color: "black",
                  fontWeight: "400",
                  fontSize: "16px",
                  marginBottom: "5px",
                  lineHeight: "30px",
                }}
              >
                Deepthi Muthusamy, born and raised in Chennai, is a self-trained
                fashion entrepreneur who is passionate about jewellery
                designing. Born with an inhouse aesthetic sense, inherited
                knowledge with a vast exposure and interest towards creating
                designs.
              </p>
              <p
                style={{
                  color: "black",
                  fontWeight: "400",
                  fontSize: "16px",
                  marginBottom: "5px",
                  lineHeight: "30px",
                }}
              >
                She brings the best out of it and launches the most
                breath-taking and wearable traditional as well as contemporary
                designs which creates a craze for all our customers every time.
              </p>
            </div>
          </div>

          <div className="row align-items-center ">
            <div className="col-md-6 about-section-brand">
              <p
                style={{
                  color: "black",
                  fontWeight: "500",
                  fontSize: "20px",
                  marginBottom: "5px",
                }}
              >
                OUR DESIGNS & PRODUCTS
              </p>
              <p
                style={{
                  color: "gray",
                  fontWeight: "400",
                  fontSize: "18px",
                  marginBottom: "5px",
                }}
              >
                PRADE
              </p>
              <p
                style={{
                  color: "black",
                  fontWeight: "400",
                  fontSize: "16px",
                  marginBottom: "5px",
                  lineHeight: "30px",
                }}
              >
                PraDe deals with wide range of silver jewellery including but
                not limited to necklaces, earrings, bangles, anklets, etc., that
                can go well with traditional as well as indo–western outfits.
              </p>
              <p
                style={{
                  color: "black",
                  fontWeight: "400",
                  fontSize: "16px",
                  marginBottom: "5px",
                  lineHeight: "30px",
                }}
              >
                We at PraDe support handmade craft and our jewels are lovingly
                handmade by our artisans. PraDe has always been the first choice
                for many of the leading stylists and artists in the industry.
                For more details you can access **Celebrity Blog Link**.
              </p>
            </div>

            <div className="col-md-6 about-section-brand">
              <p
                style={{
                  color: "black",
                  fontWeight: "500",
                  fontSize: "20px",
                  marginBottom: "5px",
                }}
              >
                OUR TEAM
              </p>
              <p
                style={{
                  color: "gray",
                  fontWeight: "400",
                  fontSize: "18px",
                  marginBottom: "5px",
                }}
              >
                PRADE
              </p>
              <p
                style={{
                  color: "black",
                  fontWeight: "400",
                  fontSize: "16px",
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
      </section>
    </>
  );
};

export default JewelryAbout;
