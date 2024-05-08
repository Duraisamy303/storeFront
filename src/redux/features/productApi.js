import { gql } from "@apollo/client";
import { apiSlice } from "../api/apiSlice";
import { configuration } from "@/utils/constant";
import {
  ADD_WISHLIST,
  CATEGORY_LIST,
  FEATURE_PRODUCT,
  FINISH_LIST,
  GET_PRODUCTLIST_BY_ID,
  MY_ORDER_LIST,
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
import {
  COUNTRY_LIST,
  DESIGN_LIST,
  STONE_LIST,
  STATE_LIST,
} from "../../utils/queries/productList";

export const productApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ first }) => {
        let channel = "";
        const channels = localStorage.getItem("channel");
        if (!channels) {
          channel = "india-channel";
        } else {
          channel = channels;
        }
        return configuration(PRODUCT_LIST({ channel, first }));
      },

      providesTags: ["Products"],
    }),
    getProductType: builder.query({
      query: ({ first }) => {
        let channel = "";
        const channels = localStorage.getItem("channel");
        if (!channels) {
          channel = "india-channel";
        } else {
          channel = channels;
        }

        return configuration(PRODUCT_LIST({ channel, first }));
      },

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
      query: ({ productId }) => {
        let channel = "";
        const channels = localStorage.getItem("channel");
        if (!channels) {
          channel = "india-channel";
        } else {
          channel = channels;
        }
        console.log("channel: ", channel);

        return configuration(SINGLE_PRODUCT({ productId, channel }));
      },

      providesTags: (result, error, arg) => [{ type: "Product", id: arg }],
      invalidatesTags: (result, error, arg) => [
        { type: "RelatedProducts", id: arg },
      ],
    }),
    // get related products
    getRelatedProducts: builder.query({
      query: ({ id }) => {
        let channel = "";
        const channels = localStorage.getItem("channel");
        if (!channels) {
          channel = "india-channel";
        } else {
          channel = channels;
        }
        return configuration(RELATED_PRODUCT({ id, channel }));
      },
      providesTags: (result, error, arg) => [
        { type: "RelatedProducts", id: arg },
      ],
    }),
    orderList: builder.query({
      query: ({ orderId }) => {
        return configuration(ORDER_LIST({ orderId }));
      },
      providesTags: ["Products"],
    }),

    myOrderList: builder.query({
      query: () => {
        const orderid = localStorage.getItem("orderId");
        return configuration(MY_ORDER_LIST({ first: 100 }));
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
        console.log('✌️userEmail --->', userEmail);

        return configuration(WISHLIST_LIST({ userEmail:userEmail }));
      },
      providesTags: ["Products"],
    }),

    getProductById: builder.query({
      query: ({ ids }) => {
        let channel = "";
        const channels = localStorage.getItem("channel");
        if (!channels) {
          channel = "india-channel";
        } else {
          channel = channels;
        }
        return configuration(GET_PRODUCTLIST_BY_ID({ ids, channel }));
      },
      providesTags: ["Products"],
    }),

    getCategoryList: builder.query({
      query: (data) => {
        let channel = "";
        const channels = localStorage.getItem("channel");
        if (!channels) {
          channel = "india-channel";
        } else {
          channel = channels;
        }
        return configuration(CATEGORY_LIST({ channel, first: 100 }));
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
      query: ({ first, after, collectionid }) => {
        let channel = "";
        const channels = localStorage.getItem("channel");
        if (!channels) {
          channel = "india-channel";
        } else {
          channel = channels;
        }
        return configuration(
          FEATURE_PRODUCT({ first, after, channel, collectionid })
        );
      },
      providesTags: ["Products"],
    }),

    countryList: builder.query({
      query: () => configuration(COUNTRY_LIST({})),
      providesTags: ["Products"],
    }),

    stateList: builder.query({
      query: ({ code }) => configuration(STATE_LIST({ code })),
      providesTags: ["Products"],
    }),

    //filters
    priceFilter: builder.mutation({
      query: ({ filter }) => {
        let channel = "";
        const channels = localStorage.getItem("channel");
        if (!channels) {
          channel = "india-channel";
        } else {
          channel = channels;
        }
        return configuration(
          PRODUCT_FILTER({
            channel,
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
  useMyOrderListQuery,
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
  useCountryListQuery,
  useStateListQuery,
} = productApi;
