import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb'
import ShopBreadcrumb from '@/components/breadcrumb/shop-breadcrumb'
import CartArea from '@/components/cart-wishlist/cart-area'
import OrderList from '@/components/cart-wishlist/order-list'
import SEO from '@/components/seo'
import ShopArea from '@/components/shop/shop-area'
import FooterTwo from '@/layout/footers/footer-2'
import HeaderTwo from '@/layout/headers/header-2'
import Wrapper from '@/layout/wrapper'
import React from 'react';
import OrderBanner from "@assets/img/shop-banner.jpg";
import { useRouter } from 'next/router'

 const OrderDetails = ({ query }) => {
  console.log("query: ", query?.id);

  const router=useRouter();
  const orderId= router?.query?.id
  console.log("orderId: ", orderId);
  return (
    
    <Wrapper>
      <SEO pageTitle="Cart" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Order List" subtitle="Order List" BgImage={OrderBanner} />
     
      <FooterTwo primary_style={true} />
    </Wrapper>
  )
}
export default OrderDetails
