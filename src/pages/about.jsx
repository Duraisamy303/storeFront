import React from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import CartArea from "@/components/cart-wishlist/cart-area";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import FooterTwo from "@/layout/footers/footer-2";
import AboutArea from "@/components/about/about-area";
import JewelryAbout from "@/components/about/jewelry-about";
import aboutBanner from "../../public/assets/img/shop-banner.jpg";

const about = () => {
  return (
    <Wrapper>
      <SEO pageTitle="About Us" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb
        title="About Us"
        subtitle="About Us"
        content="PraDe Jewels is a leading luxury jewellery label founded in 2017 and is based out of South India. PraDe deals in Pure 925 Silver Jewellery. We at PraDe bring you a different perspective on authentic handcrafted Silver Jewellery with high standards."
        BgImage={aboutBanner}
      />
      <JewelryAbout />
      <FooterTwo primary_style={true} />
    </Wrapper>
  );
};

export default about;
