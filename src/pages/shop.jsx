import React, { useState, useEffect } from "react";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import ShopArea from "@/components/shop/shop-area";
import {
  useGetAllProductsQuery,
  useGetCategoryNameMutation,
  useGetParentCategoryListQuery,
  useGetTagNameMutation,
  usePriceFilterMutation,
} from "@/redux/features/productApi";
import ErrorMsg from "@/components/common/error-msg";
import ShopFilterOffCanvas from "@/components/common/shop-filter-offcanvas";
import ShopLoader from "@/components/loader/shop/shop-loader";
import FooterTwo from "@/layout/footers/footer-2";
import shopBanner from "../../public/assets/img/shop-banner.jpg";
import { checkChannel, shortData } from "@/utils/functions";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreateCheckoutTokenWithoutEmailMutation,
  useGetCartListQuery,
} from "@/redux/features/card/cardApi";
import { cart_list } from "@/redux/features/cartSlice";
import {
  filterData,
  handleFilterSidebarClose,
} from "@/redux/features/shop-filter-slice";
import { get_wishlist_products } from "@/redux/features/wishlist-slice";
import { useGetWishlistQuery } from "@/redux/features/productApi";
import { useRouter } from "next/router";

const ShopPage = () => {
  const {
    data: productsData,
    isError,
    isLoading,
  } = useGetAllProductsQuery({
    sortBy: { direction: "ASC", field: "ORDER_NO" },
  });

  const { data: newData, refetch: getProductRefetch } =
    useGetAllProductsQuery();

  const [getCategoryName] = useGetCategoryNameMutation();
  const [getTagName] = useGetTagNameMutation();

  const router = useRouter();

  const filter = useSelector((state) => state.shopFilter.filterData);

  const { data: wishlistData } = useGetWishlistQuery();

  const { data: tokens } = useGetCartListQuery();

  const [createCheckoutTokenWithoutEmail] =
    useCreateCheckoutTokenWithoutEmailMutation();

  useEffect(() => {
    const checkoutTokenINR = localStorage.getItem("checkoutTokenINR");
    const checkoutTokenUSD = localStorage.getItem("checkoutTokenUSD");

    if (!checkoutTokenINR) {
      createCheckoutTokenINR();
    }
    if (!checkoutTokenUSD) {
      createCheckoutTokenUSD();
    }
  }, []);

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = async () => {
    try {
      const res = await getProductRefetch({
        first: 500,
        after: null,
        channel: checkChannel(),
        sortByField: "CREATED_AT",
        sortByDirection: "DESC",
      });
      setProductList(res?.data?.data?.products?.edges);
    } catch (error) {
      console.log("error: ", error);
    }
  };

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

  const { data: data } = useGetCartListQuery();
  const { data: categoryData } = useGetParentCategoryListQuery();

  const [priceFilter, {}] = usePriceFilterMutation();

  const [cartUpdate, setCartUpdate] = useState(false);

  let products = productsData?.data?.products?.edges;

  const [priceValue, setPriceValue] = useState([0, 0]);

  const [selectValue, setSelectValue] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState("");
  const [filterList, setFilterList] = useState([]);

  const [currPage, setCurrPage] = useState(1);

  const [catName, setCatName] = useState("");
  const [parentCatName, setParentCatName] = useState("");
  const [tagName, setTagName] = useState("");
  useEffect(() => {
    if (router?.query?.categoryId) {
      filterByCategoryName();
    }
  }, [router]);

  useEffect(() => {
    if (router?.query?.tag) {
      filterByTagName();
    }
  }, [router]);

  console.log("router?.query: ", router?.query);

  useEffect(() => {
    if (!isLoading && !isError && products?.length > 0) {
      const maxPrice = products?.reduce((max, item) => {
        const price =
          item?.node?.pricing?.priceRange?.start?.gross?.amount || 0;
        return price > max ? price : max;
      }, 0);
      setPriceValue([0, maxPrice]);
    }
  }, [isLoading, isError, products]);

  useEffect(() => {
    productLists();
  }, [productsData]);

  const productLists = () => {
    if (
      productsData &&
      productsData?.data &&
      productsData?.data?.products &&
      productsData?.data?.products?.edges?.length > 0
    ) {
      const list = productsData?.data?.products?.edges;
      setProductList(list);
    }
  };

  useEffect(() => {
    if (
      categoryData &&
      categoryData?.data &&
      categoryData?.data?.categories &&
      categoryData?.data?.categories?.edges
    ) {
      const catList = categoryData?.data?.categories?.edges;
      const lastTen = catList?.slice(0, 8);
      setCategoryList(lastTen);
    }
  }, [categoryData]);

  const handleChanges = (val) => {
    setCurrPage(1);
    setPriceValue(val);
  };

  const selectHandleFilter = async (e) => {
    console.log("e: ", e.value);
    setSelectValue(e.value);

    // try {
    //   let sortBy = {};
    //   if ((e = "Default Sorting")) {
    //     sortBy = { direction: "ASC", field: "ORDER_NO" };
    //   } else if (e == "Low to High") {
    //     sortBy = { direction: "ASC", field: "PRICE" };
    //   } else if (e == "High to Low") {
    //     sortBy = { direction: "DESC", field: "PRICE" };
    //   } else if (e == "New Added") {
    //     sortBy = { direction: "DESC", field: "CREATED_AT" };
    //   }
    //   console.log("sortBy: ", sortBy);

    //   const res = await getProductRefetch({
    //     first: 500,
    //     after: null,
    //     channel: checkChannel(),
    //     sortByField: sortBy.field,
    //     sortByDirection: sortBy.direction,
    //   });
    //   console.log("selectHandleFilter: ", res);
    //   setProductList(res?.data?.data?.products?.edges);
    // } catch (error) {
    //   console.log("error: ", error);
    // }
    // console.log("e: ", e.value);
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
    filters();
  }, [filter]);

  const sortingFilter = () => {
    const shortDatas = shortData(selectValue, productList);
    setProductList(shortDatas);
  };

  let content = null;

  if (!isLoading) {
    content = <ShopLoader loading={isLoading} />;
  } else if (isError) {
    content = <ErrorMsg msg="There was an error" />;
  } else if (products?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  } else {
    // Render product items...
  }

  useEffect(() => {
    if (router?.query?.categoryId) {
      filterByCategory();
    }
  }, [router]);

  useEffect(() => {
    if (router?.query?.tag) {
      filterByTags();
    }
  }, [router]);

  const filterByCategory = () => {
    const datas = {
      categories: router?.query?.categoryId,
      // categories:"Q2F0ZWdvcnk6MTE2Mg=="
    };

    priceFilter({
      filter: datas,
    }).then((res) => {
      const list = res?.data?.data?.products?.edges;
      setProductList(list);
    });
  };

  const filterByTags = () => {
    const datas = {
      tag: router?.query?.tag,
      // tag:"VGFnOjg="
    };

    priceFilter({
      filter: datas,
    }).then((res) => {
      const list = res?.data?.data?.products?.edges;

      setProductList(list);
    });
  };

  const filters = () => {
    const datas = {};
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
        }
      });

      priceFilter({
        filter: datas,
      }).then((res) => {
        const list = res?.data?.data?.products?.edges;
        setProductList(list);
        dispatch(handleFilterSidebarClose());
      });
    } else {
      productLists();
    }
  };

  const filterByPrice = (data, type) => {
    const bodyData = {
      price: { gte: priceValue[0], lte: priceValue[1] },
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

      const listd = [...filter, body];
      dispatch(filterData(listd));
      setPriceValue([priceValue[0], priceValue[1]]);
      setFilterList([...filterList, body]);
      dispatch(handleFilterSidebarClose());
    });
  };

  const filterByCategoryName = async () => {
    try {
      const res = await getCategoryName({
        categoryid: router?.query?.categoryId,
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

  const filterByTagName = async () => {
    try {
      const res = await getTagName({
        id: router?.query?.tag,
      });
      console.log("✌️res --->", res);
      const list = res?.data?.data?.tagById?.name;
      setTagName(list);
    } catch (err) {
      console.log(err);
    }
  };


  const { categoryId, tag } = router?.query || {};
let shopTitle = "Shop";

if (categoryId) {
    shopTitle = `Shop / ${parentCatName ? `${parentCatName} / ` : ""}${catName}`;
} else if (tag) {
    shopTitle = `Shop / ${tagName}`;
}

console.log(shopTitle);


  return (
    <Wrapper>
      <SEO pageTitle="Shop" />
      <HeaderTwo style_2={true} />
      <ShopBreadcrumb
        title={shopTitle}
        // title="Shop"
        subtitle="Shop"
        bgImage={shopBanner}
        catList={categoryList}
      />
      {/* {isLoading ? (
        <ShopLoader loading={isLoading} />
      ) : (
        <> */}
      <ShopArea
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
      />
      <FooterTwo primary_style={true} />
      {/* </>
      )} */}
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
