import React from 'react';
import SEO from '@/components/seo';
import HeaderTwo from '@/layout/headers/header-2';
import Footer from '@/layout/footers/footer';
import Wrapper from '@/layout/wrapper';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import LoginArea from '@/components/login-register/login-area';
import FooterTwo from '@/layout/footers/footer-2';
import { useSelector } from 'react-redux';

const LoginPage = () => {
  const cartData = useSelector((state) => state);
  console.log("cartData: ", cartData);

  return (
    <Wrapper>
      <SEO pageTitle="Login" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Login" subtitle="Login" center={true} />
      <LoginArea/>
      <FooterTwo primary_style={true} />
    </Wrapper>
  );
};

export default LoginPage;