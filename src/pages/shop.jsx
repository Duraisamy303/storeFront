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

const ShopPage = ({ query }) => {
  const {
    data: productsData,
    isError,
    isLoading,
  } = useGetAllProductsQuery({ channel: "india-channel", first: 20 });
  const products = productsData?.data?.products?.edges;
  // console.log("products: ", products);
  const [priceValue, setPriceValue] = useState([0, 0]);
  // console.log("priceValue: ", priceValue);
  const [selectValue, setSelectValue] = useState("");
  const [currPage, setCurrPage] = useState(1);
  let product_items = products;

  // Load the maximum price once the products have been loaded
  useEffect(() => {
    if (!isLoading && !isError && products?.length > 0) {
      const maxPrice = products.reduce((max, product) => {
        return product.price > max ? product.price : max;
      }, 0);

      setPriceValue([0, maxPrice]);
    }
  }, [isLoading, isError, products]);

  if (selectValue) {
    const shortDatas = shortData(selectValue, products);
    product_items = shortDatas;
  }

  // handleChanges
  const handleChanges = (val) => {
    setCurrPage(1);
    setPriceValue(val);
  };

  // selectHandleFilter
  const selectHandleFilter = (e) => {
    setSelectValue(e.value);
  };

  // other props
  const otherProps = {
    priceFilterValues: {
      priceValue,
      handleChanges,
    },
    selectHandleFilter,
    currPage,
    setCurrPage,
  };
  // decide what to render
  let content = null;

  if (isLoading) {
    content = <ShopLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = (
      <div className="pb-80 text-center">
        <ErrorMsg msg="There was an error" />
      </div>
    );
  }
  if (!isLoading && !isError && products?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  }
  if (!isLoading && !isError && products?.data?.length > 0) {
<<<<<<< HEAD
=======
    // products
    // select short filtering
    // if (selectValue) {
    //   if (selectValue === "Default Sorting") {
    //     product_items = products;
    //   } else if (selectValue === "Low to High") {
    //     product_items = products
    //       .slice()
    //       .sort((a, b) => Number(a.price) - Number(b.price));
    //   } else if (selectValue === "High to Low") {
    //     product_items = products
    //       .slice()
    //       .sort((a, b) => Number(b.price) - Number(a.price));
    //   } else if (selectValue === "New Added") {
    //     product_items = products
    //       .slice()
    //       .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    //   } else if (selectValue === "On Sale") {
    //     product_items = products.filter((p) => p.discount > 0);
    //   } else {
    //     product_items = products;
    //   }
    // }

>>>>>>> 9a6a2f4c0e4daa896d01fc6c6e9701811a433efc
    // price filter
    product_items = product_items.filter(
      (p) => p.price >= priceValue[0] && p.price <= priceValue[1]
    );

    // status filter
    if (query.status) {
      if (query.status === "on-sale") {
        product_items = product_items.filter((p) => p.discount > 0);
      } else if (query.status === "in-stock") {
        product_items = product_items.filter((p) => p.status === "in-stock");
      }
    }

    // category filter
    if (query.category) {
      product_items = product_items.filter(
        (p) =>
          p.parent.toLowerCase().replace("&", "").split(" ").join("-") ===
          query.category
      );
    }

    // category filter
    if (query.subCategory) {
      product_items = product_items.filter(
        (p) =>
          p.children.toLowerCase().replace("&", "").split(" ").join("-") ===
          query.subCategory
      );
    }

    // color filter
    if (query.color) {
      product_items = product_items.filter((product) => {
        for (let i = 0; i < product.imageURLs.length; i++) {
          const color = product.imageURLs[i]?.color;
          if (
            color &&
            color?.name.toLowerCase().replace("&", "").split(" ").join("-") ===
              query.color
          ) {
            return true; // match found, include product in result
          }
        }
        return false; // no match found, exclude product from result
      });
    }

    // brand filter
    if (query.brand) {
      product_items = product_items.filter(
        (p) =>
          p.brand.name.toLowerCase().replace("&", "").split(" ").join("-") ===
          query.brand
      );
    }
<<<<<<< HEAD
  }
=======

    // content = (
    //   <>
    //     <ShopArea
    //       all_products={products.data}
    //       products={product_items}
    //       otherProps={otherProps}
    //     />
    //     <ShopFilterOffCanvas
    //       all_products={products.data}
    //       otherProps={otherProps}
    //     />
    //   </>
    // );
  }
  console.log("product_items: ", product_items);
>>>>>>> 9a6a2f4c0e4daa896d01fc6c6e9701811a433efc

  return (
    <Wrapper>
      <SEO pageTitle="Shop" />
      <HeaderTwo style_2={true} />
      <ShopBreadcrumb title="Shop" subtitle="Shop Grid" bgImage={shopBanner} />
      <ShopArea
        all_products={products}
        products={product_items}
        otherProps={otherProps}
      />
      {/* {content} */}
      {/* <Footer primary_style={true} /> */}
      <FooterTwo primary-style={true} />
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
