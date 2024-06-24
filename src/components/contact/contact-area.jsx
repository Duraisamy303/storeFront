import React from "react";
import Image from "next/image";
// internal
import ContactForm from "../forms/contact-form";
import contact_icon_1 from "@assets/img/contact/contact-icon-1.png";
import contact_icon_2 from "@assets/img/contact/contact-icon-2.png";
import contact_icon_3 from "@assets/img/contact/contact-icon-3.png";
import Mail from "@assets/img/contact/mail.png";
import Phone from "@assets/img/contact/phone.png";
import ContactSideImage from "@assets/img/contact/contact-side-image.jpg";
import Link from "next/link";
import Address from "@assets/img/contact/address.png";
import {
  FacebookFilled,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeFilled,
  PinterestOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";

const FacebookIcon = () => (
  <Avatar
    shape="circle"
    style={{
      backgroundColor: "gray", // Facebook blue color
    }}
    icon={<FacebookFilled style={{ color: "white" }} />}
  />
);

const TwitterIcon = () => (
  <Avatar
    shape="circle"
    style={{
      backgroundColor: "gray", // Twitter blue color
    }}
    icon={<TwitterOutlined style={{ color: "white" }} />}
  />
);

const InstagramIcon = () => (
  <Avatar
    shape="circle"
    style={{
      backgroundColor: "gray", // Instagram's gradient color
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

const ContactArea = () => {
  return (
    <>
      <section className="tp-contact-area">
        <div className="container">
          <div className="tp-contact-inner">
            {/* <div className="row">
              <div className="col-xl-9 col-lg-8">
                <div className="tp-contact-wrapper">
                  <h3 className="tp-contact-title">Sent A Message</h3>

                  <div className="tp-contact-form">
                    <ContactForm />

                    <p className="ajax-response"></p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4">
                <div className="tp-contact-info-wrapper">
                  <div className="tp-contact-info-item">
                    <div className="tp-contact-info-icon">
                      <span>
                        <Image src={contact_icon_1} alt="contact-icon" />
                      </span>
                    </div>
                    <div className="tp-contact-info-content">
                      <p data-info="mail">
                        <a href="mailto:contact@prade.in">contact@prade.in</a>
                      </p>
                      <p data-info="phone">
                        <a href="tel:670-413-90-762">+670 413 90 762</a>
                      </p>
                    </div>
                  </div>
                  <div className="tp-contact-info-item">
                    <div className="tp-contact-info-icon">
                      <span>
                        <Image src={contact_icon_2} alt="contact-icon" />
                      </span>
                    </div>
                    <div className="tp-contact-info-content">
                      <p>
                        <a
                          href="https://www.google.com/maps/place/New+York,+NY,+USA/@40.6976637,-74.1197638,11z/data=!3m1!4b1!4m6!3m5!1s0x89c24fa5d33f083b:0xc80b8f06e177fe62!8m2!3d40.7127753!4d-74.0059728!16zL20vMDJfMjg2"
                          target="_blank"
                        >
                          84 sleepy hollow st. <br /> jamaica, New York 1432
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="tp-contact-info-item">
                    <div className="tp-contact-info-icon">
                      <span>
                        <Image src={contact_icon_3} alt="contact-icon" />
                      </span>
                    </div>
                    <div className="tp-contact-info-content">
                      <div className="tp-contact-social-wrapper mt-5">
                        <h4 className="tp-contact-social-title">
                          Find on social media
                        </h4>

                        <div className="tp-contact-social-icon">
                          <a href="#">
                            <i className="fa-brands fa-facebook-f"></i>
                          </a>
                          <a href="#">
                            <i className="fa-brands fa-twitter"></i>
                          </a>
                          <a href="#">
                            <i className="fa-brands fa-linkedin-in"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="row">
              <div
                className="col-md-6 contact-section1"
                style={{ borderRight: "1px solid #ccc" }}
              >
                <div style={{ marginBottom: "50px" }}>
                  <h4
                    style={{
                      fontWeight: "300",
                      color: "rgb(85 85 85)",
                      paddingBottom: "15px",

                      borderBottom: "1px solid #ececec",
                    }}
                  >
                    CONTACT US
                  </h4>
                </div>
                <div className="contacr-social-links">
                  <div
                    style={{
                      width: "50px",
                      height: "20px",
                      marginRight: "10px",
                    }}
                  >
                    <Image
                      src={Mail}
                      alt="mail"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                  <p style={{ color: "rgb(85 85 85)", fontSize: "16px" }}>
                    <Link href="mailto:support@prade.in">support@prade.in</Link>
                  </p>
                </div>
                <div className="contacr-social-links">
                  <div
                    style={{
                      width: "50px",
                      height: "20px",
                      marginRight: "10px",
                    }}
                  >
                    <Image
                      src={Address}
                      alt="mail"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                  <p style={{ color: "rgb(85 85 85)" }}>
                    <Link
                      href="https://maps.app.goo.gl/qLfBEz7ZVkcsiSxt6"
                      target="_blank"
                    >
                      Prade jewels and Drapes private Limited
                      <br /> No.28, 1st floor, Vijay building,
                      <br /> Near Andhra club, Vijaya Raghava road,
                      <br />
                      Chennai – 600017
                    </Link>
                  </p>
                </div>

                <div className="contacr-social-links">
                  <div
                    style={{
                      width: "50px",
                      height: "20px",
                      marginRight: "10px",
                    }}
                  >
                    <Image
                      src={Phone}
                      alt="mail"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                  <p style={{ color: "rgb(85 85 85)" }}>
                    <Link href="tel:+91 73052 63999">+91 73052 63999</Link>
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <h5
                    style={{
                      marginBottom: "0px",
                      paddingRight: "15px",
                      color: "gray",
                    }}
                  >
                    Follow Us
                  </h5>
                  <div style={{ display: "flex" }}>
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
                    <div
                      className="printer-outline "
                      style={{ backgroundColor: "gray" }}
                    >
                      <Link href="https://pin.it/2RQl6pL" target="_blank">
                        <PinterestOutlined />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 ">
                <Image
                  src={ContactSideImage}
                  alt="mail"
                  style={{ width: "100%", height: "420px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactArea;
