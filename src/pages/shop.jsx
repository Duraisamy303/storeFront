import React, { useState, useEffect } from "react";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import ShopArea from "@/components/shop/shop-area";
import { useGetAllProductsQuery } from "@/redux/features/productApi";
import ErrorMsg from "@/components/common/error-msg";
import ShopFilterOffCanvas from "@/components/common/shop-filter-offcanvas";
import ShopLoader from "@/components/loader/shop/shop-loader";
import FooterTwo from "@/layout/footers/footer-2";
import shopBanner from "../../public/assets/img/shop-banner.jpg";
import { shortData } from "@/utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { useGetCartListQuery } from "@/redux/features/card/cardApi";
import { cart_list } from "@/redux/features/cartSlice";

const ShopPage = ({ query }) => {
  const {
    data: productsData,
    isError,
    isLoading,
  } = useGetAllProductsQuery({ channel: "india-channel", first: 20 });


  const [cartUpdate, setCartUpdate] = useState(false);

  const products = productsData?.data?.products?.edges;

  const [priceValue, setPriceValue] = useState([0, 0]);
  const [selectValue, setSelectValue] = useState("");
  const [currPage, setCurrPage] = useState(1);
  let productItems = products;

  useEffect(() => {
    if (!isLoading && !isError && products?.length > 0) {
      const maxPrice = products.reduce((max, product) => {
        return product.price > max ? product.price : max;
      }, 0);
      setPriceValue([0, maxPrice]);
    }
  }, [isLoading, isError, products]);


 
  const handleChanges = (val) => {
    setCurrPage(1);
    setPriceValue(val);
  };

  const selectHandleFilter = (e) => {
    setSelectValue(e.value);
  };

  const otherProps = {
    priceFilterValues: {
      priceValue,
      handleChanges,
    },
    selectHandleFilter,
    currPage,
    setCurrPage,
  };

  if (selectValue) {
    const shortDatas = shortData(selectValue, products);
    productItems = shortDatas;
  }

  let content = null;

  if (isLoading) {
    content = <ShopLoader loading={isLoading} />;
  } else if (isError) {
    content = <ErrorMsg msg="There was an error" />;
  } else if (products?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  } else {
    // Render product items...
  }

  return (
    <Wrapper>
      <SEO pageTitle="Shop" />
      <HeaderTwo style_2={true} />
      <ShopBreadcrumb title="Shop" subtitle="Shop Grid" bgImage={shopBanner} />
      <ShopArea
        all_products={products}
        products={productItems}
        otherProps={otherProps}
        updateData={() => setCartUpdate(true)}
      />
      {content}
      <FooterTwo primary_style={true} />
    </Wrapper>
  );
};

export default ShopPage;

export const getServerSideProps = async (context) => {
  const { query } = context;

  return {
    props: {
      query,
    },
  };
};
