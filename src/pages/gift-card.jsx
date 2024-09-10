import React, { useEffect, useState } from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import FooterTwo from "@/layout/footers/footer-2";
import { useSetState } from "../utils/functions";
import { useGetCategoryNameMutation, useGetProductQuery } from "@/redux/features/productApi";
import ProductDetailsArea from "../components/product-details/product-details-area";
import banner from "../../public/assets/img/shop-banner.jpg";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import PrdDetailsLoader from "@/components/loader/prd-details-loader";
import ErrorMsg from "@/components/common/error-msg";

export default function GiftCart() {
  const {
    data: productData,
    isLoading,
    isError,
    refetch: productRefetch,
  } = useGetProductQuery({ productId: "UHJvZHVjdDo1NzMwOQ==" });
  const product = productData?.data?.product;

  // const [state, setState] = useSetState({
  //   data: {},
  // });
  // console.log("productData: ", state.data);

  // useEffect(() => {
  //   getData();
  // }, [productData]);

  // const getData = async () => {
  //   try {
  //     const product = productData?.data?.product;
  //     setState({ data: product });
  //   } catch (error) {
  //     console.log("error: ", error);
  //   }
  // };

  const [getCategoryName] = useGetCategoryNameMutation();

  const [catName, setCatName] = useState("");
  const [parentCatName, setParentCatName] = useState("");

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
          detailsRefetch={productRefetch}
          isGiftCard={true}
        />
      </>
    );
  }
  return (
    <Wrapper>
      <SEO pageTitle="Gift Card" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb
        title="Gift Card"
        subtitle="Gift Card"
        BgImage={banner}
      />
      {/* <ProductDetailsArea
        productItem={product}
        detailsRefetch={productRefetch}
      /> */}
      {content}
      <FooterTwo primary_style={true} />
    </Wrapper>
  );
}
