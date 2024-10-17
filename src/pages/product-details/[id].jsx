import React, { useEffect, useState } from "react";
// internal
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import ErrorMsg from "@/components/common/error-msg";
import {
  useGetCategoryNameMutation,
  useGetProductQuery,
  useGetRelatedProductsQuery,
  useGetYouMayLikeMutation,
} from "@/redux/features/productApi";
import ProductDetailsBreadcrumb from "@/components/breadcrumb/product-details-breadcrumb";
import ProductDetailsArea from "@/components/product-details/product-details-area";
import PrdDetailsLoader from "@/components/loader/prd-details-loader";
import FooterTwo from "@/layout/footers/footer-2";
import { useCreateCheckoutTokenWithoutEmailMutation } from "@/redux/features/card/cardApi";
import { useRouter } from "next/router";
import { getValueByKey } from "@/utils/functions";

const ProductDetailsPage = ({ query }) => {
  const router = useRouter();

  const [youMayLikeData, setYouMayLikeData] = useState([]);

  const {
    data: productData,
    isLoading,
    isError,
    refetch: detailProductRefetch,
  } = useGetProductQuery({ productId: query.id });

  const [getYouMayLike] = useGetYouMayLikeMutation();

  const [createCheckoutTokenWithoutEmail] =
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

  useEffect(() => {
    getYouMayLikeData();
  }, [productData]);

  // useEffect(() => {
  //   const product = productData?.data?.product;
  //   const value = getValueByKey(product?.metadata, "keyword");
  //     const meta = document.createElement("meta");
  //     meta.name = "keyword";
  //     meta.content = value?value:product?.name;
  //     document.head.appendChild(meta);
  //     return () => {
  //       document.head.removeChild(meta);
  //     };

  // }, [productData]);

  useEffect(() => {
    const product = productData?.data?.product;

    const addMetaTag = (name, content) => {
      const meta = document.createElement("meta");
      meta.name = name;
      meta.content = content;
      document.head.appendChild(meta);
      return meta;
    };

    const keywordValue =
      getValueByKey(product?.metadata, "keyword") || product?.name;
    const descriptionValue =
      getValueByKey(product?.metadata, "description") ||
      product?.seoDescription;
    const titleValue =
      getValueByKey(product?.metadata, "title") || product?.seoTitle;

    const keywordMeta = addMetaTag("keyword", keywordValue);
    const descriptionMeta = addMetaTag("description", descriptionValue);
    const titleMeta = addMetaTag("title", titleValue);

    return () => {
      document.head.removeChild(keywordMeta);
      document.head.removeChild(descriptionMeta);
      document.head.removeChild(titleMeta);
    };
  }, [productData]);


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

  const getYouMayLikeData = async () => {
    try {
      const product = productData?.data?.product;
      let productDetails = [];

      if (product?.getUpsells?.length > 0) {
        for (let item of product.getUpsells) {
          try {
            const res = await getYouMayLike({ productId: item?.productId });
            productDetails.push(res?.data);
          } catch (error) {
            console.error(
              `Error fetching data for productId ${item?.productId}:`,
              error
            );
          }
        }
        setYouMayLikeData(productDetails);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const product = productData?.data?.product;
  const [getCategoryName] = useGetCategoryNameMutation();

  const [catName, setCatName] = useState("");
  const [parentCatName, setParentCatName] = useState("");
  const [parentSlug, setParentSlug] = useState("");


  useEffect(() => {
    if (product?.category?.id) {
      filterByCategoryName();
    }
  }, [product?.category?.id]);

  const filterByCategoryName = async () => {
    const categoryID = product?.category?.id;
    try {
      const res = await getCategoryName({
        categoryid: categoryID,
      });

      const list = res?.data?.data?.category?.name;
      setCatName(list);

      if (res?.data?.data?.category?.parent?.name) {
        setParentCatName(res?.data?.data?.category?.parent?.name);
        setParentSlug(res?.data?.data?.category?.parent?.slug);

      }
    } catch (err) {
      console.log(err);
    }
  };

  let shopTitle = "Shop";

  if (product?.category?.id) {
    shopTitle = `Shop / ${
      parentCatName ? `${parentCatName} / ` : ""
    }${catName}`;
  }

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
        <ProductDetailsArea
          productItem={product}
          pageTitle={shopTitle}
          detailsRefetch={detailProductRefetch}
          youMayLikeData={youMayLikeData}
          isGiftCard={false}
          parentSlug={parentSlug}
        />
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
