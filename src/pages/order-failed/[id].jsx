import React from 'react'
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import FooterTwo from "@/layout/footers/footer-2";
import Success from '@/components/payment/success';
import { useRouter } from 'next/router';
import { useOrderListQuery } from '@/redux/features/productApi';
import Failed from '@/components/payment/failed';

const PaymentFailed = () => {
  const router = useRouter();
  const orderId = router?.query?.id;
  const { data } = useOrderListQuery({ orderId: orderId });
  return (
    <Wrapper>
    <SEO pageTitle="Order Success" />
    <HeaderTwo style_2={true} />
    <Failed data={data} />
    <FooterTwo primary_style={true} />
  </Wrapper>
  )
}

export default PaymentFailed