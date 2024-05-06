import { gql } from "@apollo/client";
import { apiSlice } from "../api/apiSlice";
import { configuration } from "@/utils/constant";
import {
  ADD_WISHLIST,
  CATEGORY_LIST,
  FEATURE_PRODUCT,
  FINISH_LIST,
  GET_PRODUCTLIST_BY_ID,
  ORDER_LIST,
  PRODUCT_FILTER,
  PRODUCT_LIST,
  STYLE_LIST,
  WISHLIST_LIST,
} from "@/utils/queries/productList";
import {
  RELATED_PRODUCT,
  SINGLE_PRODUCT,
} from "@/utils/queries/singleProduct/productDetailsByID";
import { useSelector } from "react-redux";
import { DESIGN_LIST, STONE_LIST } from "../../utils/queries/productList";

export const productApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ channel, first }) =>
        configuration(PRODUCT_LIST({ channel, first })),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result: ", result);
        } catch (err) {
          // do nothing
        }
      },
      providesTags: ["Products"],
    }),
    getProductType: builder.query({
      query: ({ channel, first }) =>
        configuration(PRODUCT_LIST({ channel, first })),

      providesTags: ["ProductType"],
    }),

    getOfferProducts: builder.query({
      query: (type) => `/api/product/offer?type=${type}`,
      providesTags: ["OfferProducts"],
    }),
    getPopularProductByType: builder.query({
      query: (type) => `/api/product/popular/${type}`,
      providesTags: ["PopularProducts"],
    }),
    getTopRatedProducts: builder.query({
      query: () => `/api/product/top-rated`,
      providesTags: ["TopRatedProducts"],
    }),
    // get single product
    getProduct: builder.query({
      query: ({ productId }) => configuration(SINGLE_PRODUCT({ productId })),

      providesTags: (result, error, arg) => [{ type: "Product", id: arg }],
      invalidatesTags: (result, error, arg) => [
        { type: "RelatedProducts", id: arg },
      ],
    }),
    // get related products
    getRelatedProducts: builder.query({
      query: ({ id }) => configuration(RELATED_PRODUCT({ id })),
      providesTags: (result, error, arg) => [
        { type: "RelatedProducts", id: arg },
      ],
    }),
    orderList: builder.query({
      query: () => {
        const orderid = localStorage.getItem("orderId");
        return configuration(ORDER_LIST({ orderid }));
      },
      providesTags: ["Products"],
    }),

    addWishlist: builder.mutation({
      query: ({ input }) => configuration(ADD_WISHLIST({ input })),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result: ", result);
        } catch (err) {
          // do nothing
        }
      },
    }),

    getWishlist: builder.query({
      query: () => {
        const user = localStorage.getItem("userInfo");
        let userEmail = "";
        if (user) {
          const users = JSON.parse(user);
          userEmail = users.user.email;
        }
        return configuration(WISHLIST_LIST({ userEmail }));
      },
      providesTags: ["Products"],
    }),

    getProductById: builder.query({
      query: ({ ids }) => {
        return configuration(
          GET_PRODUCTLIST_BY_ID({ ids, channel: "india-channel" })
        );
      },
      providesTags: ["Products"],
    }),

    getCategoryList: builder.query({
      query: (data) => {
        return configuration(
          CATEGORY_LIST({ channel: "india-channel", first: 100 })
        );
      },
      providesTags: ["Products"],
    }),

    getFinishList: builder.query({
      query: (data) => {
        return configuration(FINISH_LIST());
      },
      providesTags: ["Products"],
    }),

    getStyleList: builder.query({
      query: (data) => {
        return configuration(STYLE_LIST());
      },
      providesTags: ["Products"],
    }),

    getDesignList: builder.query({
      query: (data) => {
        return configuration(DESIGN_LIST());
      },
      providesTags: ["Products"],
    }),

    getStoneList: builder.query({
      query: (data) => {
        return configuration(STONE_LIST());
      },
      providesTags: ["Products"],
    }),

    featureProduct: builder.query({
      query: (data) => {
        return configuration(FEATURE_PRODUCT());
      },
      providesTags: ["Products"],
    }),

    //filters
    priceFilter: builder.mutation({
      query: ({ filter }) => {
        return configuration(
          PRODUCT_FILTER({
            channel: "india-channel",
            first: 100,
            after: null,
            filter,
          })
        );
      },
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductTypeQuery,
  useGetOfferProductsQuery,
  useGetPopularProductByTypeQuery,
  useGetTopRatedProductsQuery,
  useGetProductQuery,
  useGetRelatedProductsQuery,
  useOrderListQuery,
  useAddWishlistMutation,
  useGetWishlistQuery,
  useGetProductByIdQuery,
  useGetCategoryListQuery,
  //filter
  usePriceFilterMutation,
  useGetFinishListQuery,
  useGetStyleListQuery,
  useGetDesignListQuery,
  useGetStoneListQuery,
  useFeatureProductQuery,
} = productApi;
