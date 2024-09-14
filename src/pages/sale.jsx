import React, { useState, useEffect } from "react";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import ShopArea from "@/components/shop/shop-area";
import {
  useGetPreOrderProductsQuery,
  useGetCategoryListQuery,
  usePriceFilterMutation,
  useGetParentCategoryListQuery,
} from "@/redux/features/productApi";
import ErrorMsg from "@/components/common/error-msg";
import ShopFilterOffCanvas from "@/components/common/shop-filter-offcanvas";
import ShopLoader from "@/components/loader/shop/shop-loader";
import FooterTwo from "@/layout/footers/footer-2";
import shopBanner from "../../public/assets/img/shop-banner.jpg";
import { shortData } from "@/utils/functions";
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
import Pagination from "../pagination/pagination";
import {
  useMaxPriceMutation,
  useNewPreOrderProductsMutation,
  useShopPaginationMutation,
} from "../redux/features/productApi";
import { useRouter } from "next/router";
import { sortingBy } from "../utils/functions";

const PreOrders = () => {
  const PAGE_LIMIT = 21;
  const filter = useSelector((state) => state.shopFilter.filterData);

  const router = useRouter();

  const dispatch = useDispatch();

  const [priceValue, setPriceValue] = useState([0, 0]);
  const [cartUpdate, setCartUpdate] = useState(false);
  const [maxPrice, setMaxPrice] = useState(0);
  const [categoryList, setCategoryList] = useState("");
  const [productList, setProductList] = useState("");
  const [filterList, setFilterList] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [prevPage, setPrevPage] = useState(1);
  const [startCursor, setStartCursor] = useState(null);
  const [endCursor, setEndCursor] = useState(null);
  const [currPage, setCurrPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [initialMaxPrice, setInitialMaxPrice] = useState(0);

  const filterByOtherAttribute = () => {
    let datas = {};

    // if (find == undefined) {
    if (filter?.length > 0) {
      filter?.forEach((item) => {
        if (item?.type === "finish") {
          datas.productFinish = item?.id;
        } else if (item?.type === "style") {
          datas.productstyle = item?.id;
        } else if (item?.type === "design") {
          datas.prouctDesign = item?.id;
        } else if (item?.type === "stone") {
          datas.productStoneType = item?.id;
        } else if (item.type === "stock") {
          datas.stockAvailability = item.id;
        }
      });
    }

    return datas;
  };

  const commonFilter = () => {
    let filters = {};
    filters.categories = ["Q2F0ZWdvcnk6MTIwMjQ="];

    if (filter?.length > 0) {
      const find = filter?.find((item) => item?.type == "price");
      filters.price = {
        gte: find?.min ? find?.min : priceValue[0],
        lte: find?.max ? find?.max : priceValue[1],
      };

      const otherFilters = filterByOtherAttribute();
      filters = {
        ...filters, // Keep the existing price filter
        ...otherFilters, // Merge other filters
      };
    }
    return filters;
  };

  const {
    data: productsData,
    isError,
    isLoading,
  } = useGetPreOrderProductsQuery({
    first: PAGE_LIMIT,
    filter:
      // categories: ["Q2F0ZWdvcnk6MTE3NDE="], original ID
      commonFilter(),
  });

  const [productListRefetch, { isLoading: productListLoading }] =
    useNewPreOrderProductsMutation();

  const { data: wishlistData } = useGetWishlistQuery();

  const [maximumPrice, { isLoading: maxPriceLoading }] = useMaxPriceMutation();

  const [createCheckoutTokenWithoutEmail] =
    useCreateCheckoutTokenWithoutEmailMutation();

  const { data: categoryData, isLoading: categoryLoading } =
    useGetParentCategoryListQuery();

  const [priceFilter, { isLoading: filterLoading }] = usePriceFilterMutation();

  const [shopPagination, { isLoading: shopPaginationLoading }] =
    useShopPaginationMutation();

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
      const datas = data?.json();
      localStorage.setItem(
        "checkoutTokenINR",
        datas?.data?.data?.checkoutCreate?.checkout?.token
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

  useEffect(() => {
    initialList();
  }, [productsData]);

  useEffect(() => {
    if (filter?.length > 0) {
      filters();
    } else {
      initialList();
    }
  }, [filter]);

  useEffect(() => {
    getProductMaxPrice();
  }, [router]);

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

  const getProductMaxPrice = () => {
    const filter = commonFilter();
    maximumPrice({
      filter,
      first: 1,
      sortBy: sortBy || { direction: "DESC", field: "PRICE" },
    }).then((res) => {
      const list = res.data?.data?.productsSearch?.edges;
      if (list?.length > 0) {
        const maxPrice =
          list[0]?.node?.pricing?.priceRange?.start?.gross?.amount;
        setPriceValue([0, maxPrice]);
        setMaxPrice(maxPrice);
        setInitialMaxPrice(maxPrice);
      } else {
        setPriceValue([0, 0]);
        setMaxPrice(0);
      }
    });
  };

  const initialList = async () => {
    try {
      const res = await productListRefetch({
        first: PAGE_LIMIT,
        filter:
          // categories: ["Q2F0ZWdvcnk6MTE3NDE="], original ID
          commonFilter(),
      });
      setCursorAndList(res);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleChanges = (val) => {
    setCurrPage(1);
    setPriceValue(val);
  };

  const selectHandleFilter = async (e) => {
    try {
      const sortBy = sortingBy(e);
      setSortBy(sortBy);
      finalInitialFilterData(sortBy);
      setCurrentPage(1);
    } catch (error) {
      console.log("error: ", error);
    }
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

  const filters = () => {
    let filters = {};
    const find = filter?.find((item) => item?.type == "price");
    filters.price = {
      gte: find?.min ? find?.min : priceValue[0],
      lte: find?.max ? find?.max : priceValue[1],
    };
    if (filter?.length > 0) {
      const otherFilters = filterByOtherAttribute();
      filters = {
        ...filters, // Keep the existing price filter
        ...otherFilters, // Merge other filters
      };
    } else {
      let datas = [...filter, find];
      dispatch(filterData(datas));
    }
    filters.categories = ["Q2F0ZWdvcnk6MTIwMjQ="];

    priceFilter({
      filter: filters,
      first: PAGE_LIMIT,
      sortBy: sortBy ? sortBy : { direction: "DESC", field: "CREATED_AT" },
    }).then((res) => {
      const data = res?.data?.data?.productsSearch;
      setCursorAndList(res);
      const totalPages = Math.ceil(data?.totalCount / PAGE_LIMIT);
      setTotalPages(totalPages);
      setTotalCount(data?.totalCount);
      setCursorAndList(res);
      dispatch(handleFilterSidebarClose());
    });
  };

  const filterByPrice = (type) => {
    const bodyData = {
      price: { gte: priceValue[0], lte: priceValue[1] },
    };
    bodyData.categories = ["Q2F0ZWdvcnk6MTIwMjQ="];

    priceFilter({
      filter: bodyData,
      first: PAGE_LIMIT,
      after: null,
      sortBy: sortBy || { direction: "DESC", field: "CREATED_AT" },
    }).then((res) => {
      const data = res?.data?.data?.productsSearch;
      setCursorAndList(res);
      const totalPages = Math.ceil(data?.totalCount / PAGE_LIMIT);
      setTotalPages(totalPages);
      setTotalCount(data?.totalCount);

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

  const handlePageChange = (number) => {
    if (prevPage === null) {
      setPrevPage(currentPage);
    } else {
      console.log("else1: ");
      if (number === prevPage + 1) {
        if (filter?.length > 0) {
          filterNextData();
        } else {
          console.log("else2: ");
          finalNextData();
        }
      } else if (number === prevPage - 1) {
        if (filter?.length > 0) {
          filterPrevData();
        } else {
          finalPrevData();
        }
      } else {
        if (number == 1) {
          if (filter?.length > 0) {
            finalInitialFilterData(sortBy);
          } else {
            finalInitialData(sortBy);
          }
        } else {
          finalDynamicPaginationData(number);
        }
      }
    }
    setPrevPage(number);
    setCurrentPage(number);
    return number;
  };

  const filterNextData = async () => {
    const datas = commonFilter();
    console.log("datas: ", datas);
    const res = await priceFilter({
      filter: datas,
      first: PAGE_LIMIT,
      after: endCursor,
      sortBy: sortBy || { direction: "DESC", field: "CREATED_AT" },
    });
    setCursorAndList(res);
  };

  const filterPrevData = async () => {
    const datas = commonFilter();
    console.log("datas: ", datas);
    const res = await priceFilter({
      filter: datas,
      last: PAGE_LIMIT,
      before: startCursor,
      sortBy: sortBy || { direction: "DESC", field: "CREATED_AT" },
    });
    setCursorAndList(res);
  };

  const finalNextData = async () => {
    console.log("endCursor: ", endCursor);
    const res = await productListRefetch({
      first: PAGE_LIMIT,
      after: endCursor,
      sortBy: sortBy || {
        direction: "DESC",
        field: "CREATED_AT",
      },
      filter: commonFilter(),
    });
    console.log("res: ", res);

    setCursorAndList(res);
  };

  const finalPrevData = async () => {
    const res = await productListRefetch({
      last: PAGE_LIMIT,
      before: startCursor,
      sortBy: sortBy || { direction: "DESC", field: "CREATED_AT" },
      filter: commonFilter(),
    });
    setCursorAndList(res);
  };

  const finalInitialData = async (sortBy) => {
    let body = {
      first: PAGE_LIMIT,
      after: null,
      sortBy: sortBy || { direction: "DESC", field: "CREATED_AT" },
      filter: commonFilter(),
    };
    const res = await productListRefetch(body);
    setCursorAndList(res);
  };

  const finalInitialFilterData = async (sortBy) => {
    const datas = commonFilter();
    priceFilter({
      filter: datas,
      first: PAGE_LIMIT,
      after: null,
      sortBy: sortBy || { direction: "DESC", field: "CREATED_AT" },
    }).then((res) => {
      setCursorAndList(res);
    });
  };

  const finalDynamicPaginationData = async (number) => {
    const filter = commonFilter();
    const res = await shopPagination({
      before: null,
      first: PAGE_LIMIT,
      after: null,
      sortBy: sortBy || { direction: "DESC", field: "CREATED_AT" },
      page: number,
      filter,
    });

    const data = res?.data?.data?.findProductsEndcursor;
    if (router?.query?.categoryId || router?.query?.tag || filter?.length > 0) {
      dynamicFilterPageData(data?.pageInfo?.endCursor);
    } else {
      dynamicPageData(data?.pageInfo?.endCursor);
    }
  };

  const dynamicFilterPageData = async (endCursor) => {
    const datas = commonFilter();
    priceFilter({
      filter: datas,
      first: PAGE_LIMIT,
      after: endCursor,
      sortBy: sortBy || { direction: "DESC", field: "CREATED_AT" },
    }).then((res) => {
      const data = res?.data?.data?.productsSearch;
      setCursorAndList(res);
      const totalPages = Math.ceil(data?.totalCount / PAGE_LIMIT);
      setTotalPages(totalPages);
      setTotalCount(data?.totalCount);
    });
  };

  const dynamicPageData = async (endCursor) => {
    const res = await productListRefetch({
      first: PAGE_LIMIT,
      after: endCursor,
      sortBy: sortBy || { direction: "DESC", field: "CREATED_AT" },
      filter: commonFilter(),
    });
    setCursorAndList(res);
  };

  const setCursorAndList = (res) => {
    const data = res?.data?.data?.productsSearch;
    console.log("data: ", data);
    const list = data?.edges;
    setProductList(list);
    setStartCursor(data?.pageInfo?.startCursor);
    setEndCursor(data?.pageInfo?.endCursor);
    const totalPages = Math.ceil(data?.totalCount / PAGE_LIMIT);
    setTotalPages(totalPages);
    setTotalCount(data?.totalCount);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const refresh = async () => {
    let body = {
      first: PAGE_LIMIT,
      after: null,
      sortBy: sortBy || { direction: "DESC", field: "CREATED_AT" },
      filter: {
        categories: ["Q2F0ZWdvcnk6MTIwMjQ="],
      },
    };
    const res = await productListRefetch(body);
    dispatch(filterData([]));
    setPriceValue([0, initialMaxPrice]);
    setInitialMaxPrice(initialMaxPrice);
    dispatch(handleFilterSidebarClose());
    setCursorAndList(res);
  };

  let content = null;

  if (isLoading) {
    content = <ShopLoader loading={isLoading} />;
  } else if (isError) {
    content = <ErrorMsg msg="There was an error" />;
  } else if (productList?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  } else {
    // Render product items...
  }

  return (
    <Wrapper>
      <SEO pageTitle="Shop" />
      <HeaderTwo style_2={true} />
      <ShopBreadcrumb
        title="Loot Sale"
        subtitle="Loot Sale"
        bgImage={shopBanner}
        catList={categoryList}
      />
      <ShopArea
        all_products={productList}
        products={productList}
        otherProps={otherProps}
        productLoading={
          isLoading ||
          filterLoading ||
          productListLoading ||
          maxPriceLoading ||
          categoryLoading ||
          shopPaginationLoading
        }
        updateData={() => setCartUpdate(true)}
        subtitle="Loot Sale"
        updateRange={(range) => handleChanges(range)}
        maxPrice={maxPrice}
        totalCount={totalCount}
        page={currentPage}
        clearFilter={()=>refresh()}
      />
      {productList?.length > 0 &&
        !isLoading &&
        !filterLoading &&
        !productListLoading &&
        !maxPriceLoading &&
        !categoryLoading &&
        !shopPaginationLoading && (
          <div>
            <div
              className="mb-20 "
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pagination
                activeNumber={handlePageChange}
                totalPages={totalPages}
                currentPages={currentPage}
              />
            </div>
          </div>
        )}
      <ShopFilterOffCanvas
        otherProps={otherProps}
        filterByPrice={(val) => filterByPrice("priceRange")}
        maxPrice={maxPrice}
        resetFilter={() => {
          refresh();
        }}
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
