import React from "react";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import SEO from "@/components/seo";
import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import shopBanner from "../../public/assets/img/shop-banner.jpg";
import FooterTwo from "@/layout/footers/footer-2";
import Newshops from "../components/shop/newshops";
import { useGetAllProductsQuery } from "../redux/features/productApi";

export default function Newshop() {
  const {
    data: productsData,
    isError,
    isLoading,
  } = useGetAllProductsQuery({ channel: "india-channel", first: 500 });

  return (
    <Wrapper>
      <SEO pageTitle="Shop" />
      <HeaderTwo style_2={true} />
      <ShopBreadcrumb title="Shop" bgImage={shopBanner} />
      <Newshops products={productsData} />

      {/* <ShopArea
        all_products={productList}
        products={productList}
        otherProps={otherProps}
        updateData={() => setCartUpdate(true)}
        subtitle={shopTitle}
        updateRange={(range) => setPriceValue(range)}
      />
      <ShopFilterOffCanvas
        all_products={products}
        otherProps={otherProps}
        filterByPrice={() => filterByPrice()}
        finishFilterData={(data, type) => filterByPrice(data, type)}
      /> */}
      <FooterTwo primary_style={true} />
      {/* </>
      )} */}
    </Wrapper>
  );
}
