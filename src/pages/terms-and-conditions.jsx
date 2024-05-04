import React from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import FooterTwo from "@/layout/footers/footer-2";
import TermsAndConditionsMain from "@/components/terms/terms-main";

const TermsAndConditions = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Terms And Conditions" />
      <HeaderTwo style_2={true} />

      <TermsAndConditionsMain />
      <FooterTwo primary_style={true} />
    </Wrapper>
  );
};

export default TermsAndConditions;
