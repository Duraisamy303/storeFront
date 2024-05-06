import React, { useEffect, useState } from "react";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderFour from "@/layout/headers/header-4";
import JewelryBanner from "@/components/banner/jewelry-banner";
import JewelryShopBanner from "@/components/shop-banner/jewelry-shop-banner";
import JewelryAbout from "@/components/about/jewelry-about";
import PopularProducts from "@/components/products/jewelry/popular-products";
import ProductArea from "@/components/products/jewelry/product-area";
import JewelryCollectionBanner from "@/components/shop-banner/jewelry-collection-banner";
import BestSellerPrd from "@/components/products/jewelry/best-seller-prd";
import JewelryBrands from "@/components/brand/jewelry-brands";
import InstagramAreaFour from "@/components/instagram/instagram-area-4";
import FeatureAreaThree from "@/components/features/feature-area-3";
import FooterTwo from "@/layout/footers/footer-2";
import HeaderTwo from "@/layout/headers/header-2";
import {
  useCheckoutTokenMutation,
  useCreateCheckoutTokenWithoutEmailMutation,
  useGetCartListQuery,
} from "@/redux/features/card/cardApi";
import { useDispatch, useSelector } from "react-redux";
import { cart_list, checkout_token } from "@/redux/features/cartSlice";
import { useGetWishlistQuery } from "@/redux/features/productApi";
import { get_wishlist_products } from "@/redux/features/wishlist-slice";


const Index = () => {
  // const dispatch = useDispatch();

  const { data: tokens } = useGetCartListQuery();

  const [createCheckoutTokenWithoutEmail, { data: data }] =
    useCreateCheckoutTokenWithoutEmailMutation();

  useEffect(() => {
    const token = localStorage.getItem("checkoutToken");
    if (!token) {
      getCheckoutToken();
    }
  }, []);

  const getCheckoutToken = async () => {
    try {
      await createCheckoutTokenWithoutEmail({});
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const { data: wishlistData, isError, isLoading } = useGetWishlistQuery();
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (wishlistData) {
  //     if (wishlistData?.data?.wishlists?.edges?.length > 0) {
  //       const modify = wishlistData?.data?.wishlists.edges;
  //       dispatch(get_wishlist_products(modify?.map((item) => item.node)));
  //     } else {
  //       dispatch(get_wishlist_products([]));
  //     }
  //   } else {
  //     dispatch(get_wishlist_products([]));
  //   }
  // }, [wishlistData]);

  return (
    <Wrapper>
      <SEO pageTitle="Home" />
      <HeaderTwo />
      <JewelryBanner />
      <FeatureAreaThree />
      <JewelryShopBanner />
      {/* <JewelryAbout/> */}
      <PopularProducts />
      {/* <ProductArea/> */}
      <JewelryCollectionBanner />
      {/* <BestSellerPrd/> */}
      {/* <JewelryBrands/> */}
      <InstagramAreaFour />
      <FooterTwo />
    </Wrapper>
  );
};

export default Index;
