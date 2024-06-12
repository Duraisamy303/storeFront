import React, { useEffect } from "react";
// internal
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import ErrorMsg from "@/components/common/error-msg";
import {
  useGetProductQuery,
  useGetRelatedProductsQuery,
} from "@/redux/features/productApi";
import ProductDetailsBreadcrumb from "@/components/breadcrumb/product-details-breadcrumb";
import ProductDetailsArea from "@/components/product-details/product-details-area";
import PrdDetailsLoader from "@/components/loader/prd-details-loader";
import FooterTwo from "@/layout/footers/footer-2";
import { useCreateCheckoutTokenWithoutEmailMutation } from "@/redux/features/card/cardApi";

const ProductDetailsPage = ({ query }) => {
  const {
    data: productData,
    isLoading,
    isError,refetch:detailProductRefetch
  } = useGetProductQuery({ productId: query.id });
  console.log("productData: ", productData);

  const [createCheckoutTokenWithoutEmail] =
    useCreateCheckoutTokenWithoutEmailMutation();

  useEffect(() => {
    const checkoutTokenINR = localStorage.getItem("checkoutTokenINR");
    const checkoutTokenUSD = localStorage.getItem("checkoutTokenUSD");

    if (!checkoutTokenINR) {
      createCheckoutTokenINR();
    }
    if (!checkoutTokenUSD) {
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

  const product = productData?.data?.product;

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <PrdDetailsLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && product) {
    content = (
      <>
        {/* <ProductDetailsBreadcrumb category={product.category.name} title={product.title} /> */}
        <ProductDetailsArea productItem={product} detailsRefetch={detailProductRefetch}/>
      </>
    );
  }
  return (
    <Wrapper>
      <SEO pageTitle="Product Details" />
      <HeaderTwo style_2={true} />
      {content}
      <FooterTwo primary_style={true} />
    </Wrapper>
  );
};

export default ProductDetailsPage;

export const getServerSideProps = async (context) => {
  const { query } = context;

  return {
    props: {
      query,
    },
  };
};
