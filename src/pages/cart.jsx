import React from 'react';
import SEO from '@/components/seo';
import HeaderTwo from '@/layout/headers/header-2';
import Wrapper from '@/layout/wrapper';
import CartArea from '@/components/cart-wishlist/cart-area';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import FooterTwo from '@/layout/footers/footer-2';
import { useGetCartListQuery } from '@/redux/features/card/cardApi';
import CartBanner from "../../public/assets/img/shop-banner.jpg";

const CartPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Cart" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Shopping Cart" subtitle="Shopping Cart" BgImage={CartBanner}/>
      <CartArea/>
      <FooterTwo primary_style={true} />
    </Wrapper>
  );
};

export default CartPage;