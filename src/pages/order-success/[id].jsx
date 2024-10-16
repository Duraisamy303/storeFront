import React, { useEffect } from 'react'
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import FooterTwo from "@/layout/footers/footer-2";
import Success from '@/components/payment/success';
import { useRouter } from 'next/router';
import { useOrderListQuery } from '@/redux/features/productApi';
import {
  useCreateCheckoutTokenWithoutEmailMutation,
} from "@/redux/features/card/cardApi";

const PaymentSucess = () => {
  const router = useRouter();
  const orderId = router?.query?.id;
  const { data } = useOrderListQuery({ orderId: orderId });

  const [createCheckoutTokenWithoutEmail, { data:checkoutTokens}] =
  useCreateCheckoutTokenWithoutEmailMutation();


  useEffect(() => {
    const checkoutTokenINR = localStorage.getItem("checkoutTokenINR");
    const checkoutTokenUSD = localStorage.getItem("checkoutTokenUSD");

    if (!checkoutTokenINR || checkoutTokenINR == "undefined") {
      createCheckoutTokenINR();
    }
    if (!checkoutTokenUSD || checkoutTokenUSD == "undefined") {
      createCheckoutTokenUSD();
    }
  }, []);

  const createCheckoutTokenINR = async () => {
    try {
      const data = await createCheckoutTokenWithoutEmail({
        channel: "india-channel",
      });
      localStorage.setItem(
        "checkoutTokenINR",
        data?.data?.data?.checkoutCreate?.checkout?.token
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createCheckoutTokenUSD = async () => {
    try {
      const data = await createCheckoutTokenWithoutEmail({
        channel: "default-channel",
      });
      localStorage.setItem(
        "checkoutTokenUSD",
        data?.data?.data?.checkoutCreate?.checkout?.token
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

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