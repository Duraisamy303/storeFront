import { gql } from "@apollo/client";
import { apiSlice } from "../api/apiSlice";
import { configuration } from "@/utils/constant";
import {
  ADD_WISHLIST,
  ADDRESS_LIST,
  CATEGORY_LIST,
  CATEGORY_NAME,
  DELETE_ADDRESS,
  FEATURE_PRODUCT,
  FINISH_LIST,
  GET_PRODUCTLIST_BY_ID,
  MY_ORDER_LIST,
  ORDER_LIST,
  PARENT_CAT_LIST,
  PARENT_CATEGORY_LIST,
  PAYMENT_SUCCESS,
  PRE_ORDER_LIST,
  PRODUCT_20_PERCENTAGE,
  PRODUCT_FILTER,
  PRODUCT_LIST,
  PRODUCT_SEARCH,
  STYLE_LIST,
  SUB_CAT_LIST,
  UPDATE_ADDRESS,
  UPDATE_EMAIL,
  UPDATE_SHIPPING_ADDRESS,
  WISHLIST_LIST,
  ORDER_CANCEL,
  UPDATE_BILLING_ADDRESS_ADDRESS_SECTION,
  UPDATE_SHIPPING_ADDRESS_ADDRESS_SECTION,
  TAG_NAME,
  PAYMENT_LIST,
  DELETE_COUPON,
  SHOP_PAGINATION,
  FILTER_OPTION,
  ATTRIBUTE_LIST,
  ADD_NEW_ADDRESS,
  LOGOUT,
} from "@/utils/queries/productList";
import {
  RELATED_PRODUCT,
  SINGLE_PRODUCT,
  NEXT_PRODUCT,
  PREV_PRODUCT,
} from "@/utils/queries/singleProduct/productDetailsByID";
import { useSelector } from "react-redux";
import {
  COUNTRY_LIST,
  DESIGN_LIST,
  STONE_LIST,
  STATE_LIST,
  LOOT_LIST,
  MAX_PRICE,
  USER_INFO,
} from "../../utils/queries/productList";
import {
  GET_WISHLIST_LIST,
  GET_WISHLIST_LIST_DEFAULT_CHANNEL,
  UPDATE_BILLING_ADDRESS,
} from "@/utils/queries/cart/addToCart";
import { checkChannel } from "@/utils/functions";

export const productApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllProduct: builder.mutation({
      query: ({ first, after, before, sortBy, filter = {} }) => {
        let channel = "";
        const channels = localStorage.getItem("channel");
        if (!channels) {
          channel = "india-channel";
        } else {
          channel = channels;
        }

        return configuration(
          PRODUCT_LIST({
            first,
            after,
            before,
            channel,
            sortBy,
            filter: { ...filter, isPublished: true },
          })
        );
      },

      providesTags: ["Products"],
    }),

    getAllProducts: builder.query({
      query: ({ first, after, before, sortBy, filter = {} }) => {
        let channel = "";
        const channels = localStorage.getItem("channel");
        if (!channels) {
          channel = "india-channel";
        } else {
          channel = channels;
        }
        return configuration(
          PRODUCT_LIST({
            first,
            after,
            before,
            channel,
            sortBy,
            filter: { ...filter, isPublished: true },
          })
        );
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
        return configuration(SINGLE_PRODUCT({ productId, channel }));
      },

      providesTags: (result, error, arg) => [{ type: "Product", id: arg }],
      invalidatesTags: (result, error, arg) => [
        { type: "RelatedProducts", id: arg },
      ],
    }),

    // get next product
    getNextProduct: builder.query({
      query: ({ nextProductId }) => {
        let channel = "";
        const channels = localStorage.getItem("channel");
        if (!channels) {
          channel = "india-channel";
        } else {
          channel = channels;
        }
        return configuration(NEXT_PRODUCT({ nextProductId, channel }));
      },
      providesTags: (result, error, arg) => [
        { type: "NextProduct", slug: arg },
      ],
    }),

    // get prev product
    getPrevProduct: builder.query({
      query: ({ prevProductId }) => {
        let channel = "";
        const channels = localStorage.getItem("channel");
        if (!channels) {
          channel = "india-channel";
        } else {
          channel = channels;
        }
        return configuration(PREV_PRODUCT({ prevProductId, channel }));
      },
      providesTags: (result, error, arg) => [
        { type: "NextProduct", slug: arg },
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
        return configuration(GET_WISHLIST_LIST({ userEmail: userEmail }));
      },
      providesTags: ["Products"],
    }),

    getWishlistDefault: builder.query({
      query: () => {
        const user = localStorage.getItem("userInfo");
        let userEmail = "";
        if (user) {
          const users = JSON.parse(user);
          userEmail = users.user.email;
        }
        return configuration(
          GET_WISHLIST_LIST_DEFAULT_CHANNEL({ userEmail: userEmail })
        );
      },
      providesTags: ["Products"],
    }),

    getProductById: builder.mutation({
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

    getParentCategoryList: builder.query({
      query: (data) => {
        let channel = "";
        const channels = localStorage.getItem("channel");
        if (!channels) {
          channel = "india-channel";
        } else {
          channel = channels;
        }
        return configuration(PARENT_CATEGORY_LIST({ channel, first: 100 }));
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
      query: ({ first, after, filter }) => {
        let channel = "";
        const channels = localStorage.getItem("channel");
        if (!channels) {
          channel = "india-channel";
        } else {
          channel = channels;
        }
        return configuration(
          FEATURE_PRODUCT({ first, after, channel, filter })
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

    payment: builder.mutation({
      query: ({ amountAuthorized, amountCharged, pspReference }) => {
        const id = localStorage.getItem("orderId");
        const body = {
          id,
          currency: checkChannel() == "india-channel" ? "INR" : "USD",
          amountAuthorized,
          amountCharged,
          name: "Credit card",
          message: "Authorized",
          pspReference,
          availableActions: ["REFUND"],
          externalUrl: "https://saleor.io/payment-id/123",
        };

        return configuration(
          PAYMENT_SUCCESS({
            id,
            currency: checkChannel() == "india-channel" ? "INR" : "USD",
            amountAuthorized,
            amountCharged,
            name: "Credit card",
            message: "Authorized",
            pspReference,
            availableActions: ["REFUND"],
            externalUrl: "https://saleor.io/payment-id/123",
          })
        );
      },
      providesTags: ["Products"],
    }),

    //filters
    priceFilter: builder.mutation({
      query: ({
        first = null,
        after = null,
        sortBy = {},
        filter = {},
        last = null,
        before = null,
      }) => {
        let channel = "";
        const channels = localStorage.getItem("channel");
        if (!channels) {
          channel = "india-channel";
        } else {
          channel = channels;
        }
        return configuration(
          PRODUCT_FILTER({
            channel: checkChannel(),
            first,
            after,
            sortBy,
            filter,
            last,
            before,
          })
        );
      },
    }),

    lootSaleProduct: builder.query({
      query: ({ filter }) =>
        configuration(
          LOOT_LIST({
            channel: checkChannel(),
            first: 500,
            after: null,
            filter,
          })
        ),
      providesTags: ["Products"],
    }),

    updateEmail: builder.mutation({
      query: ({ checkoutId, email }) => {
        return configuration(
          UPDATE_EMAIL({
            checkoutId,
            email,
          })
        );
      },
    }),

    getPreOrderProducts: builder.query({
      query: ({
        filter = {},
        first = null,
        after = null,
        sortBy = { direction: "DESC", field: "CREATED_AT" },
        last = null,
        before = null,
      }) => {
        let channel = "";
        if (checkChannel() == "india-channel") {
          channel = "india-channel";
        } else {
          channel = "default-channel";
        }
        return configuration(
          PRE_ORDER_LIST({
            first,
            channel,
            after,
            filter,
            last,
            sortBy,
            before,
          })
        );
      },

      providesTags: ["Products"],
    }),

    newPreOrderProducts: builder.mutation({
      query: ({
        filter = {},
        first = null,
        after = null,
        sortBy = { direction: "DESC", field: "CREATED_AT" },
        last = null,
        before = null,
      }) => {
        let channel = "";
        const channels = localStorage.getItem("channel");
        if (!channels) {
          channel = "india-channel";
        } else {
          channel = channels;
        }
        return configuration(
          PRE_ORDER_LIST({
            first,
            channel,
            after,
            filter,
            last,
            sortBy,
            before,
          })
        );
      },
      providesTags: ["Products"],
    }),

    productSearch: builder.mutation({
      query: ({ search }) => {
        let channel = "";
        const channels = localStorage.getItem("channel");
        if (!channels) {
          channel = "india-channel";
        } else {
          channel = channels;
        }
        return configuration(PRODUCT_SEARCH({ channel, search }));
      },
      providesTags: ["Products"],
    }),

    product20Percentage: builder.mutation({
      query: () => {
        let channel = "";
        const channels = localStorage.getItem("channel");
        if (!channels) {
          channel = "india-channel";
        } else {
          channel = channels;
        }
        return configuration(
          PRODUCT_20_PERCENTAGE({
            channel,
            first: 6,
            after: null,
            filter: {
              categories: "Q2F0ZWdvcnk6MTIwMjQ=",
              isPublished: true,
            },
          })
        );
      },
      providesTags: ["Products"],
    }),

    subCatList: builder.mutation({
      query: ({ slug }) => {
        return configuration(SUB_CAT_LIST({ slug }));
      },
    }),

    userInfo: builder.mutation({
      query: () => {
        return configuration(USER_INFO());
      },
    }),

    getCategoryName: builder.mutation({
      query: ({ categoryid,slug }) => {
        return configuration(CATEGORY_NAME({ slug }));
      },
      providesTags: ["Products"],
    }),

    getTagName: builder.mutation({
      query: ({ id }) => {
        return configuration(TAG_NAME({ id }));
      },
      providesTags: ["Products"],
    }),

    getAddressList: builder.query({
      query: () => {
        return configuration(ADDRESS_LIST());
      },
      providesTags: ["Products"],
    }),

    updateBillingAddressAddressSection: builder.mutation({
      query: ({ addressId }) => {
        return configuration(
          UPDATE_BILLING_ADDRESS_ADDRESS_SECTION({
            addressId,
          })
        );
      },
    }),

    updateShippingAddressAddressSection: builder.mutation({
      query: ({ addressId }) => {
        return configuration(
          UPDATE_SHIPPING_ADDRESS_ADDRESS_SECTION({
            addressId,
          })
        );
      },
    }),

    updateAddress: builder.mutation({
      query: ({ addressId, input }) => {
        return configuration(
          UPDATE_ADDRESS({
            addressId,
            input,
          })
        );
      },
    }),

    deleteAddress: builder.mutation({
      query: ({ id }) => {
        return configuration(
          DELETE_ADDRESS({
            id,
          })
        );
      },
    }),

    attributeList: builder.mutation({
      query: () => {
        return configuration(ATTRIBUTE_LIST());
      },
    }),

    orderCancel: builder.mutation({
      query: ({ id }) => {
        return configuration(
          ORDER_CANCEL({
            id,
          })
        );
      },
    }),

    getYouMayLike: builder.mutation({
      query: ({ productId }) => {
        let channel = "";
        const channels = localStorage.getItem("channel");
        if (!channels) {
          channel = "india-channel";
        } else {
          channel = channels;
        }
        return configuration(SINGLE_PRODUCT({ productId, channel }));
      },
    }),

    paymentList: builder.mutation({
      query: () => {
        return configuration(PAYMENT_LIST());
      },
    }),

    removeCoupon: builder.mutation({
      query: ({ checkoutId, promoCode }) => {
        return configuration(
          DELETE_COUPON({ checkoutId, languageCode: "EN_US", promoCode })
        );
      },
    }),

    newProductList: builder.mutation({
      query: ({
        first = null,
        last = null,
        after = null,
        before = null,
        sortBy,
        filter = {},
      }) => {
        let channel = "";
        const channels = localStorage.getItem("channel");
        if (!channels) {
          channel = "india-channel";
        } else {
          channel = channels;
        }

        return configuration(
          PRODUCT_LIST({ first, last, after, before, channel, sortBy, filter })
        );
      },
    }),

    shopPagination: builder.mutation({
      query: ({ first = null, after = null, sortBy, page, filter = {} }) => {

        let channel = "";
        const channels = localStorage.getItem("channel");
        if (!channels) {
          channel = "india-channel";
        } else {
          channel = channels;
        }

        return configuration(
          SHOP_PAGINATION({
            first,
            after,
            channel,
            sortBy,
            page,
            filter: filter,
          })
        );
      },
    }),

    maxPrice: builder.mutation({
      query: ({ first = null, after = null, sortBy = {}, filter = {} }) => {
        let channel = "";
        const channels = localStorage.getItem("channel");
        if (!channels) {
          channel = "india-channel";
        } else {
          channel = channels;
        }

        return configuration(
          MAX_PRICE({
            channel,
            first,
            sortBy,
            filter,
            after,
          })
        );
      },
    }),

    filterOption: builder.mutation({
      query: ({ filter = {} }) => {
        return configuration(
          FILTER_OPTION({
            filter,
          })
        );
      },
    }),

    addNewAddress: builder.mutation({
      query: ({input}) => {
        return configuration(
          ADD_NEW_ADDRESS({
            input,
          })
        );
      },
    }),

    logout: builder.mutation({
      query: () => {
        console.log("query: ", );
        return configuration(
          LOGOUT({})
        );
      },
    }),
  }),
});

export const {
  useAddNewAddressMutation,
  useFilterOptionMutation,
  useNewPreOrderProductsMutation,
  useMaxPriceMutation,
  useShopPaginationMutation,
  useNewProductListMutation,
  useGetAllProductMutation,
  useGetAllProductsQuery,
  useGetProductTypeQuery,
  useGetOfferProductsQuery,
  useGetPopularProductByTypeQuery,
  useGetTopRatedProductsQuery,
  useGetProductQuery,
  useGetNextProductQuery,
  useGetPrevProductQuery,
  useGetRelatedProductsQuery,
  useOrderListQuery,
  useMyOrderListQuery,
  useAddWishlistMutation,
  useGetWishlistQuery,
  useGetWishlistDefaultQuery,
  useGetProductByIdMutation,
  useGetCategoryListQuery,
  useGetAddressListQuery,
  //filter
  usePriceFilterMutation,
  useGetFinishListQuery,
  useGetStyleListQuery,
  useGetDesignListQuery,
  useGetStoneListQuery,
  useFeatureProductQuery,
  useCountryListQuery,
  useStateListQuery,
  useUpdateEmailMutation,
  usePaymentMutation,
  useGetPreOrderProductsQuery,
  useProductSearchMutation,
  useProduct20PercentageMutation,
  useGetParentCategoryListQuery,
  useUpdateBillingAddressAddressSectionMutation,
  useUpdateShippingAddressAddressSectionMutation,
  useRemoveCouponMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useSubCatListMutation,
  useGetCategoryNameMutation,
  useGetTagNameMutation,
  useOrderCancelMutation,
  useGetYouMayLikeMutation,
  usePaymentListMutation,
  useLootSaleProductQuery,
  useAttributeListMutation,
  useUserInfoMutation,
  useLogoutMutation
} = productApi;
