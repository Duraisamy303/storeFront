import React from 'react'
import SEO from '@/components/seo';
import HeaderTwo from '@/layout/headers/header-2';
import Wrapper from '@/layout/wrapper';
import CartArea from '@/components/cart-wishlist/cart-area';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import FooterTwo from '@/layout/footers/footer-2';
import AboutArea from '@/components/about/about-area';

const about = () => {
  return (
<Wrapper>
      <SEO pageTitle="Cart" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="About Us" subtitle="About Us" />
      <AboutArea />
      <FooterTwo primary_style={true} />
    </Wrapper>
      )
}

export default about