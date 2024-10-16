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
  useFilterOptionMutation,
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
  const [attributeList, setAttributeList] = useState([]);

  const commonFilter = () => {
    let filters = {};
    filters.categories = ["Q2F0ZWdvcnk6MTE3NDE="];

    if (filter?.price) {
      filters.price = {
        gte: filter?.price?.min ? filter?.price?.min : priceValue[0],
        lte: filter?.price?.max ? filter?.price?.max : priceValue[1],
      };
    }

    if (filter?.attributes) {
      filters = {
        ...filters, // Keep the existing price filter
        attributes: filter?.attributes, // Merge other filters
      };
    }

    if (router?.query?.tag) {
      filters.tag = router?.query?.tag;
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

  const [filterOptions] = useFilterOptionMutation();

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

  useEffect(() => {
    initialList();
  }, [productsData]);

  useEffect(() => {
    if (filter) {
      filters();
    } else {
      initialList();
      filterOption();
    }
  }, [filter]);

  useEffect(() => {
    getProductMaxPrice();
    filterOption();
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
      let sortBy = {};
      if (e.value == "Default Sorting") {
        sortBy = { direction: "ASC", field: "ORDER_NO" };
      }
      if (e.value == "Low to High") {
        sortBy = { direction: "ASC", field: "PRICE" };
      }
      if (e.value == "High to Low") {
        sortBy = { direction: "DESC", field: "PRICE" };
      }
      if (e.value == "New Added") {
        sortBy = { direction: "DESC", field: "CREATED_AT" };
      }
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
    if (filter?.price) {
      filters.price = {
        gte: filter?.price?.min ? filter?.price?.min : priceValue[0],
        lte: filter?.price?.max ? filter?.price?.max : priceValue[1],
      };
    }

    if (filter?.attributes) {
      filters = {
        ...filters, // Keep the existing price filter
        attributes: filter?.attributes, // Merge other filters
      };
    }

    if (router?.query?.tag) {
      filters.tag = router?.query?.tag;
    }
    filters.categories = ["Q2F0ZWdvcnk6MTE3NDE="];

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
    filterOptions({
      filter: filters,
    }).then((res) => {
      finalFilterOptionList(res);
    });
  };

  const filterByPrice = (type) => {
    const bodyData = {
      price: { gte: priceValue[0], lte: priceValue[1] },
    };
  
    if (router?.query?.tag) {
      bodyData.tag = router?.query?.tag;
    }
    bodyData.categories = ["Q2F0ZWdvcnk6MTE3NDE="];
    

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

      const price = {
        min: priceValue[0],
        max: priceValue[1],
      };

      let filteredList = { ...filter, price };

      // if (type === "priceRange") {
      //   filteredList = filter?.filter((item) => item.type !== "price");
      // }

      // const listd = [...filteredList, body];
      dispatch(filterData(filteredList));
      setPriceValue([priceValue[0], priceValue[1]]);
      setFilterList([...filterList, price]);
      dispatch(handleFilterSidebarClose());
    });
    filterOptions({
      filter: bodyData,
    }).then((res) => {
      finalFilterOptionList(res);
    });
  };

  const handlePageChange = (number) => {
    if (prevPage === null) {
      setPrevPage(currentPage);
    } else {
      if (number === prevPage + 1) {
        if (filter) {
          filterNextData();
        } else {
          finalNextData();
        }
      } else if (number === prevPage - 1) {
        if (filter) {
          filterPrevData();
        } else {
          finalPrevData();
        }
      } else {
        if (number == 1) {
          if (filter) {
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
    const res = await priceFilter({
      filter: datas,
      first: PAGE_LIMIT,
      after: endCursor,
      sortBy: sortBy || { direction: "DESC", field: "CREATED_AT" },
    });
    setCursorAndList(res);
    filterOptions({
      filter: datas,
    }).then((res) => {
      finalFilterOptionList(res);
    });
  };

  const filterPrevData = async () => {
    const datas = commonFilter();
    const res = await priceFilter({
      filter: datas,
      last: PAGE_LIMIT,
      before: startCursor,
      sortBy: sortBy || { direction: "DESC", field: "CREATED_AT" },
    });
    setCursorAndList(res);
    filterOptions({
      filter: datas,
    }).then((res) => {
      finalFilterOptionList(res);
    });
  };

  const finalNextData = async () => {
    const res = await productListRefetch({
      first: PAGE_LIMIT,
      after: endCursor,
      sortBy: sortBy || {
        direction: "DESC",
        field: "CREATED_AT",
      },
      filter: commonFilter(),
    });

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
    filterOptions({
      filter: datas,
    }).then((res) => {
      finalFilterOptionList(res);
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
    if (router?.query?.categoryId || router?.query?.tag || filter) {
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
    filterOptions({
      filter: datas,
    }).then((res) => {
      finalFilterOptionList(res);
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

  const refresh = async (sortBy) => {
    let body = {
      first: PAGE_LIMIT,
      after: null,
      sortBy: sortBy || { direction: "DESC", field: "CREATED_AT" },
      filter: {
        categories: ["Q2F0ZWdvcnk6MTE3NDE="],
      },
    };
    const res = await productListRefetch(body);
    dispatch(filterData([]));
    setPriceValue([0, initialMaxPrice]);
    setInitialMaxPrice(initialMaxPrice);
    dispatch(handleFilterSidebarClose());
    setCursorAndList(res);
    filterOption();

  };

  const filterOption = async () => {
    try {
      const datas = commonFilter();

      const res = await filterOptions({
        filter: datas,
      });

      finalFilterOptionList(res);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const finalFilterOptionList = (res) => {
    const data = res?.data?.data?.attributefilter?.filter?.edges;
    const parsedFilterData = JSON.parse(
      res?.data?.data?.attributefilter?.filterData
    );
    if (parsedFilterData?.edges?.length > 0) {
      setAttributeList(parsedFilterData?.edges?.map((item) => item.node));
    } else {
      setAttributeList([]);
    }
    // setProductDesigns(data.productDesigns);
    // setProductFinishes(data.productFinishes);
    // setProductStoneTypes(data.productStoneTypes);
    // setProductStyles(data.productStyles);
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
        title="Pre Orders"
        subtitle="Pre Orders"
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
        subtitle="Pre Orders"
        updateRange={(range) => handleChanges(range)}
        maxPrice={maxPrice}
        totalCount={totalCount}
        page={currentPage}
        clearFilter={() => {
          dispatch(filterData([]));
          refresh();
        }}
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
        attributeList={attributeList}

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
