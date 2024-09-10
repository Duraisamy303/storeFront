import React, { useState, useEffect } from "react";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import ShopArea from "@/components/shop/shop-area";
import {
  usePriceFilterMutation,
  useLootSaleProductQuery,
} from "@/redux/features/productApi";
import ErrorMsg from "@/components/common/error-msg";
import ShopFilterOffCanvas from "@/components/common/shop-filter-offcanvas";
import ShopLoader from "@/components/loader/shop/shop-loader";
import FooterTwo from "@/layout/footers/footer-2";
import shopBanner from "../../public/assets/img/shop-banner.jpg";
import { shortData } from "@/utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { useCreateCheckoutTokenWithoutEmailMutation } from "@/redux/features/card/cardApi";
import {
  filterData,
  handleFilterSidebarClose,
} from "@/redux/features/shop-filter-slice";
import { get_wishlist_products } from "@/redux/features/wishlist-slice";
import { useGetWishlistQuery } from "@/redux/features/productApi";

const PreOrders = () => {
  const datas = {
    categories: ["Q2F0ZWdvcnk6MTIwMjQ="],
  };
  const {
    data: productsData,
    isError,
    isLoading,
  } = useLootSaleProductQuery({
    filter: {},
  });

  const filter = useSelector((state) => state.shopFilter.filterData);

  const { data: wishlistData } = useGetWishlistQuery();

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

  const dispatch = useDispatch();

  const [priceFilter, {}] = usePriceFilterMutation();

  const [cartUpdate, setCartUpdate] = useState(false);
  const [maxPrice, setMaxPrice] = useState(0);

  let products = productsData?.data?.productsSearch?.edges;
  // productsData?.data?.collections?.edges[0]?.node?.products?.edges;

  const [priceValue, setPriceValue] = useState([0, 0]);

  const [selectValue, setSelectValue] = useState("");
  const [productList, setProductList] = useState("");
  const [filterList, setFilterList] = useState([]);

  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    if (!isLoading && !isError && products?.length > 0) {
      const maxPrice = products?.reduce((max, item) => {
        const price =
          item?.node?.pricing?.priceRange?.start?.gross?.amount || 0;
        return price > max ? price : max;
      }, 0);
      setPriceValue([0, maxPrice]);
      setMaxPrice(maxPrice);
    }
  }, [isLoading, isError, products]);

  useEffect(() => {
    productLists();
  }, [productsData]);

  const productLists = () => {
    const list = productsData?.data?.productsSearch?.edges;
    setProductList(list);
  };

  const handleChanges = (val) => {
    setCurrPage(1);
    setPriceValue(val);
  };

  const selectHandleFilter = (e) => {
    console.log("e: ", e);
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

  useEffect(() => {
    if (selectValue !== "") {
      sortingFilter();
    }
  }, [selectValue]);

  useEffect(() => {
    if (filter?.length > 0) {
      filters();
    } else {
      productLists();
    }
  }, [filter]);

  const sortingFilter = () => {
    const shortDatas = shortData(selectValue, productList);
    setProductList(shortDatas);
  };

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

  const filters = () => {
    let datas = {};
    const find = filter?.find((item) => item?.type == "price");
    // if (find == undefined) {
    if (filter?.length > 0) {
      filter.forEach((item) => {
        if (item.type === "finish") {
          datas.productFinish = item.id;
        } else if (item.type === "style") {
          datas.productstyle = item.id;
        } else if (item.type === "design") {
          datas.prouctDesign = item.id;
        } else if (item.type === "stone") {
          datas.productStoneType = item.id;
        } else if (item.type === "stock") {
          datas.stockAvailability = item.id;
        }
      });
      if (find !== undefined) {
        datas.price = { gte: priceValue[0], lte: priceValue[1] };
        // setPriceValue([find.min, find.max]);
      }
      datas.categories = ["Q2F0ZWdvcnk6MTIwMjQ="];

      priceFilter({
        filter: datas,
      }).then((res) => {
        const list = res?.data?.data?.productsSearch?.edges;
        setProductList(list);

        dispatch(handleFilterSidebarClose());
      });
    } else {
      productLists();

      let datas = [...filter, find];
      dispatch(filterData(datas));
    }
    // }
  };

  const filterByPrice = (type) => {
    const bodyData = {
      price: { gte: priceValue[0], lte: priceValue[1] },
      categories: ["Q2F0ZWdvcnk6Mzk5OQ=="],
    };
    priceFilter({
      filter: bodyData,
    }).then((res) => {
      const list = res?.data?.data?.products?.edges;
      setProductList(list);

      const body = {
        type: "price",
        min: priceValue[0],
        max: priceValue[1],
      };

      let filteredList = filter;

      if (type === "priceRange") {
        filteredList = filter?.filter((item) => item.type !== "price");
      }

      const listd = [...filteredList, body];
      dispatch(filterData(listd));
      setPriceValue([priceValue[0], priceValue[1]]);
      setFilterList([...filterList, body]);
      dispatch(handleFilterSidebarClose());
    });
  };

  return (
    <Wrapper>
      <SEO pageTitle="Shop" />
      <HeaderTwo style_2={true} />
      <ShopBreadcrumb
        title="Loot Sale"
        subtitle="Loot Sale"
        bgImage={shopBanner}
        // catList={categoryList}
      />
      <ShopArea
        all_products={productList}
        products={productList}
        otherProps={otherProps}
        updateData={() => setCartUpdate(true)}
        subtitle="Loot Sale"
        updateRange={(range) => handleChanges(range)}
        maxPrice={maxPrice}
      />
      <ShopFilterOffCanvas
        all_products={products}
        otherProps={otherProps}
        filterByPrice={(val) => filterByPrice("priceRange")}
        maxPrice={maxPrice}
      />
      <FooterTwo primary_style={true} />
    </Wrapper>
  );
};

export default PreOrders;

export const getServerSideProps = async (context) => {
  const { query } = context;

  return {
    props: {
      query,
    },
  };
};
