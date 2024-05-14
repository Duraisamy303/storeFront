import React from "react";
import Image from "next/image";
import Link from "next/link";
// internal
import social_data from "@/data/social-data";
import { Email, Location } from "@/svg";
import logo from "@assets/img/prade-logo.png";
import pay from "@assets/img/footer/footer-pay.png";
import footerInstaPost from "@assets/img/footer-instapost-1.png";

import { MobileOutlined } from "@ant-design/icons";
import { getPaddingAndBorder } from "react-range/lib/utils";
import { Avatar } from "antd";
import {
  FacebookFilled,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeFilled,
  PinterestOutlined,
} from "@ant-design/icons";

const FacebookIcon = () => (
  <Avatar
    shape="circle"
    style={{
      backgroundColor: "#1877f2", // Facebook blue color
    }}
    icon={<FacebookFilled style={{ color: "white" }} />}
  />
);

const TwitterIcon = () => (
  <Avatar
    shape="circle"
    style={{
      backgroundColor: "#1DA1F2", // Twitter blue color
    }}
    icon={<TwitterOutlined style={{ color: "white" }} />}
  />
);

const InstagramIcon = () => (
  <Avatar
    shape="circle"
    style={{
      backgroundColor: "#E1306C", // Instagram's gradient color
    }}
    icon={<InstagramOutlined style={{ color: "white" }} />} // Use a custom Instagram icon if needed
  />
);

const YoutubeIcon = () => (
  <Avatar
    shape="circle"
    style={{
      backgroundColor: "#FF0000", // YouTube red color
    }}
    icon={<YoutubeFilled style={{ color: "white" }} />}
  />
);

const FooterTwo = () => {
  return (
    <>
      <footer>
        <div
          className="tp-footer-area tp-footer-style-2 tp-footer-style-3 tp-footer-style-4"
          data-bg-color="#F5F5F5"
          style={{ backgroundColor: `#eaeaea` }}
        >
          <div className="tp-footer-top pt-50">
            <div className="container-fluid">
              <div style={{ padding: "0px 50px" }}>
                <div className="row">
                  <div className=" col-md-3 col-sm-6">
                    <div className="tp-footer-widget footer-col-4-1 mb-50">
                      <h4 className="tp-footer-widget-title">ABOUT US</h4>
                      <div className="tp-footer-logo">
                        <Link href="/">
                          <Image src={logo} alt="logo" />
                        </Link>
                      </div>
                      <div className="tp-footer-widget-content">
                        <div className="tp-footer-talk mb-20">
                          <span>
                            PraDe Jewels is a leading luxury jewellery label
                            founded in 2017 and is based out of South India.
                            PraDe deals in Pure 925 Silver Jewellery.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3 col-sm-12">
                    <div className="tp-footer-widget footer-col-4-2 mb-50">
                      <h4 className="tp-footer-widget-title">QUICK LINKS</h4>
                      <div className="tp-footer-widget-content">
                        <ul>
                          <li>
                            <Link href="/about">About</Link>
                          </li>
                          <li>
                            <Link href="/contect">Contact Us</Link>
                          </li>
                          <li>
                            <Link href="/shop">Shop</Link>
                          </li>
                          <li>
                            <Link href="/coupon">Gift Card</Link>
                          </li>
                          <li>
                            <Link href="/terms-and-conditions">
                              Terms And Conditions
                            </Link>
                          </li>
                          <li>
                            <Link href="/privacy-policy">Privacy Policy</Link>
                          </li>
                          <li>
                            <Link href="/shipping-and-exchange-policy">
                              Shipping and Exchange Policy
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* <div className="col-xl-2 col-lg-4 col-md-4 col-sm-12">
                    <div className="tp-footer-widget footer-col-4-3 mb-50">
                      <h4 className="tp-footer-widget-title">POLICIES</h4>
                      <div className="tp-footer-widget-content">
                        <ul>
                         
                          <li>
                            <Link href="/shipping-and-exchange-policy">
                              Shipping and Exchange Policy
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div> */}

                  <div className="col-md-3 col-sm-12">
                    <div className="tp-footer-widget footer-col-4-2 mb-50">
                      <h4 className="tp-footer-widget-title">STORE ADDRESS</h4>
                      <div className="tp-footer-widget-content">
                        <div className="tp-footer-contact">
                          <div className="tp-footer-contact-item d-flex align-items-start">
                            <div className="tp-footer-contact-icon">
                              <span>
                                <Location />
                              </span>
                            </div>
                            <div className="tp-footer-contact-content">
                              <p>
                                <a
                                  href="https://maps.app.goo.gl/RoQg5oRAZ6fawCVh6"
                                  target="_blank"
                                >
                                  Prade Jewels and Drapes Pvt Ltd <br/>No.28, 1st
                                  floor, Vijay building, Near Andhra club,
                                  Vijaya Raghava road,
                                  <br /> Chennai – 600017.
                                </a>
                              </p>
                            </div>
                          </div>

                          <div className="tp-footer-contact-item d-flex align-items-start">
                            <div className="tp-footer-contact-icon">
                              <span>
                                <MobileOutlined />
                              </span>
                            </div>
                            <div className="tp-footer-contact-content">
                              <p>
                                Phone :
                                <Link href="tel:+91 73052 63999">
                                  +91 73052 63999
                                </Link>
                              </p>
                            </div>
                          </div>
                          <div className="tp-footer-contact-item d-flex align-items-start">
                            <div className="tp-footer-contact-icon">
                              <span>
                                <Email />
                              </span>
                            </div>
                            <div className="tp-footer-contact-content">
                              <p>
                                <a href="mailto:support@prade.in">
                                  support@prade.in
                                </a>
                              </p>
                            </div>
                          </div>
                          <div style={{ display: "flex", paddingTop: "15px" }}>
                            <div style={{ paddingRight: "15px" }}>
                              <Link
                                href="https://www.facebook.com/PraDeJewels"
                                target="_blank"
                              >
                                <FacebookIcon />
                              </Link>
                            </div>
                            <div style={{ paddingRight: "15px" }}>
                              <Link
                                href="https://www.instagram.com/pradejewels/"
                                target="_blank"
                              >
                                <InstagramIcon />
                              </Link>
                            </div>
                            <div className="printer-outline">
                              <Link
                                href="https://pin.it/2RQl6pL"
                                target="_blank"
                              >
                                <PinterestOutlined />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className=" col-md-3 col-sm-12">
                    <div className="tp-footer-widget footer-col-4-4 mb-50">
                      <h4 className="tp-footer-widget-title">STORE LOCATION</h4>
                      <div
                        className="tp-footer-widget-content"
                        style={{ overflow: "hidden" }}
                      >
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7960308.336715554!2d80.242347!3d13.04399!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267e3de37ce75%3A0xd50eb41608bccab6!2sPraDe%20Jewels!5e0!3m2!1sen!2sin!4v1715580579688!5m2!1sen!2sin"
                          style={{ border: "0", width: "100%", height:"220px" }}
                          allowfullscreen=""
                          loading="lazy"
                          referrerpolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tp-footer-bottom">
            <div className="container-fluid">
              <div style={{ padding: "0px 50px" }}>
                <div className="tp-footer-bottom-wrapper">
                  <div className="row align-items-center">
                    <div className="col-md-12">
                      <div className="tp-footer-copyright">
                        <p>
                          Copyright {new Date().getFullYear()} © PraDe Jewels,
                          Concept by 
                           <Link href="https://irepute.in/" target="blank" style={{paddingLeft:"3px"}}>
                            repute
                          </Link>
                          .
                        </p>
                      </div>
                    </div>
                    {/* <div className="col-md-6">
                    <div className="tp-footer-payment text-md-end">
                      <p>
                        <Image src={pay} alt="pay" />
                      </p>
                    </div>
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterTwo;
