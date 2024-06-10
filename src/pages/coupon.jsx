import React from 'react';
import SEO from '@/components/seo';
import HeaderTwo from '@/layout/headers/header-2';
import Wrapper from '@/layout/wrapper';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import CouponArea from '@/components/coupon/coupon-area';
import FooterTwo from '@/layout/footers/footer-2';
import banner from '../../public/assets/img/shop-banner.jpg';
import { useGetProductQuery } from '@/redux/features/productApi';
import ProductDetailsArea from "@/components/product-details/product-details-area";


const CouponPage = () => {


  const {
    data: productData,
    isLoading,
    isError,
  } = useGetProductQuery({ productId: "UHJvZHVjdDo1NTI3"});
  console.log("productData: ", productData);
  const product = productData?.data?.product;


  return (
    <Wrapper>
      <SEO pageTitle="Coupon" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Grab Best Offer" subtitle="Coupon" BgImage={banner} />
      <ProductDetailsArea productItem={product} />
      <FooterTwo primary_style={true} />
    </Wrapper>
  );
};

export default CouponPage;