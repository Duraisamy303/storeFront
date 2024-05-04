import React from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import FooterTwo from "@/layout/footers/footer-2";
import PrivacyPolicyMain from "../components/privacy/privacyPolicyMain";

const PrivacyPloicy = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Privacy Policy" />
      <HeaderTwo style_2={true} />

      <PrivacyPolicyMain />
      <FooterTwo primary_style={true} />
    </Wrapper>
  );
};

export default PrivacyPloicy;
