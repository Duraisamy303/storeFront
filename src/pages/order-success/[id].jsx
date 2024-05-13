import React from 'react'
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import FooterTwo from "@/layout/footers/footer-2";
import Success from '@/components/payment/success';
import { useRouter } from 'next/router';
import { useOrderListQuery } from '@/redux/features/productApi';

const PaymentSucess = () => {
  const router = useRouter();
  const orderId = router?.query?.id;
  const { data } = useOrderListQuery({ orderId: orderId });
  console.log("data: ", data);
  return (
    <Wrapper>
    <SEO pageTitle="Payment Success" />
    <HeaderTwo style_2={true} />
    <Success data={data} />
    <FooterTwo primary_style={true} />
  </Wrapper>
  )
}

export default PaymentSucess