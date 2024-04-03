import React from 'react';
import SEO from '@/components/seo';
import HeaderTwo from '@/layout/headers/header-2';
import Wrapper from '@/layout/wrapper';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import CouponArea from '@/components/coupon/coupon-area';
import FooterTwo from '@/layout/footers/footer-2';
import banner from '../../public/assets/img/shop-banner.jpg';

const CouponPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Coupon" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Grab Best Offer" subtitle="Coupon" BgImage={banner} />
      <CouponArea/>
      <FooterTwo primary_style={true} />
    </Wrapper>
  );
};

export default CouponPage;