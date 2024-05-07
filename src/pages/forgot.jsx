import React from 'react';
import SEO from '@/components/seo';
import Wrapper from '@/layout/wrapper';
import HeaderTwo from '@/layout/headers/header-2';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import ForgotArea from '@/components/login-register/forgot-area';
import FooterTwo from '@/layout/footers/footer-2';

const ForgotPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Login" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Forgot Password" subtitle="Reset Password" center={true} />
      <ForgotArea />
      <FooterTwo primary_style={true} />
    </Wrapper>
  );
};

export default ForgotPage;