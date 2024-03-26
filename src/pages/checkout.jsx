import React,{useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
// internal
import SEO from '@/components/seo';
import Wrapper from '@/layout/wrapper';
import HeaderTwo from '@/layout/headers/header-2';
import Footer from '@/layout/footers/footer';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import CheckoutArea from '@/components/checkout/checkout-area';
import FooterTwo from '@/layout/footers/footer-2';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCartListQuery } from '@/redux/features/card/cardApi';
import { cart_list } from '@/redux/features/cartSlice';


const CheckoutPage = () => {
  const router = useRouter();

  const  cart  = useSelector((state) => state.cart?.cart_list);
  console.log("HeaderTwo: ", cart);

  const dispatch = useDispatch();

  const [checkoutToken, setCheckoutToken] = useState("");

  const {
    data,
    error,
    isLoading: loading,
  } = useGetCartListQuery({ checkoutToken });

  const cartData = data?.data?.checkout?.lines;

  dispatch(cart_list(cartData));

  useEffect(() => {
    getCartListData();
  }, []);

  const getCartListData = async () => {
    try {
      const checkoutToken = localStorage.getItem("checkoutToken");
      setCheckoutToken(checkoutToken);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <Wrapper>
      <SEO pageTitle="Checkout" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Checkout" subtitle="Checkout" bg_clr={true} />
      <CheckoutArea/>
      <FooterTwo style_2={true} />
    </Wrapper>
  );
};

export default CheckoutPage;