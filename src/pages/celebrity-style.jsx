import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import WishlistArea from "@/components/cart-wishlist/wishlist-area";
import SEO from "@/components/seo";
import FooterTwo from "@/layout/footers/footer-2";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import React from "react";
import WishlistBanner from "../../public/assets/img/shop-banner.jpg";
import CelebrityStyleMain from "@/components/celebrity/CelebrityStyleMain";


const CelebrityStyle = () => {


  return (
    <>
      <Wrapper>
        <SEO pageTitle="celebrity style" />
        <HeaderTwo style_2={true} />
        <CommonBreadcrumb
          title="CELEBRITY STYLE"
          subtitle="CELEBRITY STYLE"
          BgImage={WishlistBanner}
        />
        <CelebrityStyleMain />
        <FooterTwo primary_style={true} />
      </Wrapper>
    </>
  );
};

export default CelebrityStyle;
