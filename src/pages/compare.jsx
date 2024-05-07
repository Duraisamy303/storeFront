import React, { useEffect } from 'react';
import SEO from '@/components/seo';
import HeaderTwo from '@/layout/headers/header-2';
import Wrapper from '@/layout/wrapper';
import CompareArea from '@/components/compare/compare-area';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import FooterTwo from '@/layout/footers/footer-2';
import banner from '@assets/img/shop-banner.jpg';
import {
  useGetWishlistQuery,
} from "@/redux/features/productApi";
import { useDispatch } from 'react-redux';
import { get_wishlist_products } from "@/redux/features/wishlist-slice";


const ComparePage = () => {
  const { data: wishlistData, isError, isLoading } = useGetWishlistQuery();
const dispatch=useDispatch()
  useEffect(() => {
    if (wishlistData) {
      if (wishlistData?.data?.wishlists?.edges?.length > 0) {
        const modify = wishlistData?.data?.wishlists.edges;
        dispatch(get_wishlist_products(modify?.map((item) => item.node)));
      } else {
        dispatch(get_wishlist_products([]));
      }
    } else {
      dispatch(get_wishlist_products([]));
    }
  }, [wishlistData]);

  return (
    <Wrapper>
      <SEO pageTitle="Shop" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Compare" subtitle="Compare" BgImage={banner}/>
      <CompareArea/>
      <FooterTwo primary_style={true} />
    </Wrapper>
  );
};

export default ComparePage;