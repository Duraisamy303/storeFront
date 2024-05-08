import React,{useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
// internal
import SEO from '@/components/seo';
import Wrapper from '@/layout/wrapper';
import HeaderTwo from '@/layout/headers/header-2';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import CheckoutArea from '@/components/checkout/checkout-area';
import FooterTwo from '@/layout/footers/footer-2';
import { useGetCartListQuery } from '@/redux/features/card/cardApi';
import CheckoutBanner from "@assets/img/shop-banner.jpg";
import { useCountryListQuery } from '../redux/features/productApi';


const CheckoutPage = () => {
  const  { data: tokens } = useGetCartListQuery();
  const  { data: list } = useCountryListQuery();



  return (
    <Wrapper>
      <SEO pageTitle="Checkout" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Checkout" subtitle="Checkout" bg_clr={true} BgImage={CheckoutBanner} />
      <CheckoutArea/>
      <FooterTwo style_2={true} />
    </Wrapper>
  );
};

export default CheckoutPage;