import React from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import ContactBreadcrumb from "@/components/breadcrumb/contact-breadcrumb";
import ContactArea from "@/components/contact/contact-area";
import ContactMap from "@/components/contact/contact-map";
import FooterTwo from "@/layout/footers/footer-2";

const ContactPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Contact" />
      <HeaderTwo style_2={true} />
      <ContactBreadcrumb />
      <ContactArea/>
      <ContactMap/>
      <FooterTwo primary_style={true} />
    </Wrapper>
  );
};

export default ContactPage;
