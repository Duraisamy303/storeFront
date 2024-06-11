import React, { useEffect } from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import FooterTwo from "@/layout/footers/footer-2";
import { useSetState } from "../utils/functions";
import { useGetProductQuery } from "@/redux/features/productApi";
import ProductDetailsArea from "../components/product-details/product-details-area";
import banner from "../../public/assets/img/shop-banner.jpg";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";

export default function GiftCart() {
  const {
    data: productData,
    isLoading,
    isError,
  } = useGetProductQuery({ productId: "UHJvZHVjdDo1NTI3" });
  const product = productData?.data?.product;
  console.log("product: ", product);

  const [state, setState] = useSetState({
    data: {},
  });
  console.log("productData: ", state.data);

  useEffect(() => {
    getData();
  }, [productData]);

  const getData = async () => {
    try {
      const product = productData?.data?.product;
      setState({ data: product });
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <Wrapper>
      <SEO pageTitle="Gift Cart" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb
        title="Gift Cart"
        subtitle="Gift Cart"
        BgImage={banner}
      />
      <ProductDetailsArea productItem={product} />
      <FooterTwo primary_style={true} />
    </Wrapper>
  );
}
