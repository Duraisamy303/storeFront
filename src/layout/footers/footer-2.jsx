import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// internal
import social_data from '@/data/social-data';
import { Email, Location } from '@/svg';
import logo from '@assets/img/prade-logo.png';
import pay from '@assets/img/footer/footer-pay.png';
import footerInstaPost from '@assets/img/footer-instapost-1.png'

import {
  MobileOutlined
} from '@ant-design/icons';
import { getPaddingAndBorder } from 'react-range/lib/utils';
import { Avatar } from 'antd';
import { FacebookFilled, TwitterOutlined, InstagramOutlined, YoutubeFilled } from '@ant-design/icons';

const FacebookIcon = () => (
  <Avatar
    shape="circle"
    style={{
      backgroundColor: '#1877f2', // Facebook blue color
    }}
    icon={<FacebookFilled style={{ color: 'white' }} />}
  />
);

const TwitterIcon = () => (
  <Avatar
    shape="circle"
    style={{
      backgroundColor: '#1DA1F2', // Twitter blue color
    }}
    icon={<TwitterOutlined style={{ color: 'white' }} />}
  />
);

const InstagramIcon = () => (
  <Avatar
    shape="circle"
    style={{
      backgroundColor: '#E1306C', // Instagram's gradient color
    }}
    icon={<InstagramOutlined style={{ color: 'white' }} />} // Use a custom Instagram icon if needed
  />
);

const YoutubeIcon = () => (
  <Avatar
    shape="circle"
    style={{
      backgroundColor: '#FF0000', // YouTube red color
    }}
    icon={<YoutubeFilled style={{ color: 'white' }} />}
  />
);


const FooterTwo = () => {
  return (
    <>
      <footer>
        <div className="tp-footer-area tp-footer-style-2 tp-footer-style-3 tp-footer-style-4" data-bg-color="#F5F5F5" style={{ backgroundColor: `rgb(245, 245, 245)` }}>
          <div className="tp-footer-top pt-50">
            <div className="container-fluid">
              <div style={{ padding: "0px 50px" }}>
                <div className="row">

                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                    <div className="tp-footer-widget footer-col-4-1 mb-50">
                      <h4 className="tp-footer-widget-title">PROFILE</h4>
                      <div className="tp-footer-logo">
                        <Link href="/">
                          <Image src={logo} alt="logo" />
                        </Link>
                      </div>
                      <div className="tp-footer-widget-content">
                        <div className="tp-footer-talk mb-20">
                          <span>PraDe Jewels is a leading luxury jewellery label founded in 2017 and is based out of South India. PraDe deals in Pure 925 Silver Jewellery.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                    <div className="tp-footer-widget footer-col-4-2 mb-50">
                      <h4 className="tp-footer-widget-title">CONTACT US</h4>
                      <div className="tp-footer-widget-content">
                        <div className="tp-footer-contact">
                          <div className="tp-footer-contact-item d-flex align-items-start">
                            <div className="tp-footer-contact-icon">
                              <span>
                                <Location />
                              </span>
                            </div>
                            <div className="tp-footer-contact-content">
                              <p><a href="https://www.google.com/maps/place/Sleepy+Hollow+Rd,+Gouverneur,+NY+13642,+USA/@44.3304966,-75.4552367,17z/data=!3m1!4b1!4m6!3m5!1s0x4cccddac8972c5eb:0x56286024afff537a!8m2!3d44.3304928!4d-75.453048!16s%2Fg%2F1tdsjdj4" target="_blank">B-3, Poes Pride Apartments, 50/103, Poes Road, Teynampet, Chennai - 6000182</a></p>
                            </div>
                          </div>

                          <div className="tp-footer-contact-item d-flex align-items-start">
                            <div className="tp-footer-contact-icon">
                              <span>
                                <MobileOutlined />
                              </span>
                            </div>
                            <div className="tp-footer-contact-content">
                              <p>Phone : (064) 332 - 1233</p>
                            </div>
                          </div>
                          <div className="tp-footer-contact-item d-flex align-items-start">
                            <div className="tp-footer-contact-icon">
                              <span>
                                <Email />
                              </span>
                            </div>
                            <div className="tp-footer-contact-content">
                              <p><a href="mailto:shofy@support.com">supprot@prade.in</a></p>
                            </div>
                          </div>
                          <div style={{display:"flex", paddingTop:"15px"}}>
                            <div style={{paddingRight:"15px"}}>
                              <FacebookIcon />
                            </div>
                            <div style={{paddingRight:"15px"}}>
                              <TwitterIcon />
                            </div>
                            <div style={{paddingRight:"15px"}}>
                              <InstagramIcon />
                            </div>
                            <div>
                              <YoutubeIcon />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-2 col-lg-4 col-md-4 col-sm-12">
                    <div className="tp-footer-widget footer-col-4-2 mb-50">
                      <h4 className="tp-footer-widget-title">MY ACCOUNT</h4>
                      <div className="tp-footer-widget-content">
                        <ul>
                          <li><a href="#">Curabitur Sollicitudin</a></li>
                          <li><a href="#">Aenean ut lorem</a></li>
                          <li><a href="#">Fusce Tincidunt</a></li>
                          <li><a href="#">Minim Veniam</a></li>
                          <li><a href="#">Phasellus venenatis</a></li>
                          <li><a href="#">Curabitur Sollicitudin</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-2 col-lg-4 col-md-4 col-sm-12">
                    <div className="tp-footer-widget footer-col-4-3 mb-50">
                      <h4 className="tp-footer-widget-title">POLICIES</h4>
                      <div className="tp-footer-widget-content">
                        <ul>
                          <li><a href="#">Curabitur Sollicitudin</a></li>
                          <li><a href="#">Aenean ut lorem</a></li>
                          <li><a href="#">Fusce Tincidunt</a></li>
                          <li><a href="#">Minim Veniam</a></li>
                          <li><a href="#">Phasellus venenatis</a></li>
                          <li><a href="#">Curabitur Sollicitudin</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-2 col-lg-4 col-md-4 col-sm-12">
                    <div className="tp-footer-widget footer-col-4-4 mb-50">
                      <h4 className="tp-footer-widget-title">INSTAGRAM POSTS</h4>
                      <div className="tp-footer-widget-content">
                        <Image src={footerInstaPost} alt='footer-insta-post' style={{ width: "100%", height: "auto" }} />
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
                        <p>Copyright 2023 © PraDe Jewels, Concept by
                          <Link href="https://irepute.in/" target='blank'> repute</Link>.
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