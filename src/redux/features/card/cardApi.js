import Cookies from "js-cookie";
import { PRODUCT_LIST } from "@/utils/queries/productList";
import { configuration } from "@/utils/constant";
import { LOGIN } from "@/utils/queries/login/login";
import { REGISTER } from "@/utils/queries/register/register";
import cardSlice from "./cardSlice";
import { apiSlice } from "@/redux/api/apiSlice";
import {
  ADDTOCART,
  CART_LIST,
  CHECKOUT_COMPLETE,
  CHECKOUT_DELIVERY_METHOD,
  CHECKOUT_TOKEN,
  CHECKOUT_UPDATE_SHIPPING_ADDRESS,
  REMOVETOCART,
} from "@/utils/queries/cart/addToCart";
import { cart_list, checkout_token } from "../cartSlice";

export const cardApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: ({ variantId }) => {
        const checkoutToken = localStorage.getItem("checkoutToken");
        return configuration(ADDTOCART({ checkoutToken, variantId }));
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            cart_list(result?.data.data?.checkoutLinesAdd?.checkout?.lines)
          );
        } catch (err) {
          // do nothing
        }
      },
    }),

    checkoutToken: builder.mutation({
      query: ({ email }) => {
        return configuration(
          CHECKOUT_TOKEN({ channel: "india-channel", email })
        );
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const checkoutToken =
            result?.data.data?.checkoutCreate?.checkout?.token;
          dispatch(checkout_token(checkoutToken));
          localStorage.setItem("checkoutToken", checkoutToken);
          // Handle the result as needed
        } catch (err) {
          // Handle any errors
        }
      },
    }),

    getCartList: builder.query({
      query: () => {
        const checkoutToken = localStorage.getItem("checkoutToken");
        console.log("checkoutToken: ", checkoutToken);
        return configuration(CART_LIST({ checkoutToken }));
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result: ", result);
          dispatch(cart_list(result?.data.data?.checkout?.lines));
        } catch (err) {
          // do nothing
        }
      },
      providesTags: ["Products"],
    }),

    removeToCart: builder.mutation({
      query: ({ checkoutToken, lineId }) => {
        return configuration(REMOVETOCART({ checkoutToken, lineId }));
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result: ", result);
        } catch (err) {
          // do nothing
        }
      },
    }),

    createCheckoutToken: builder.mutation({
      query: ({
        channel,
        email,
        // lines: [{ quantity: 1, variantId: "UHJvZHVjdFZhcmlhbnQ6MTI=" }],
        lines,
        firstName,
        lastName,
        streetAddress1,
        city,
        country,
        postalCode,
        countryArea,
      }) => {
        return configuration(
          CHECKOUT_UPDATE_SHIPPING_ADDRESS({
            channel,
            email,
            city,
            lastName,
            lines,
            streetAddress1,
            firstName,
            country,
            postalCode,
            countryArea,
          })
        );
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result: ", result);
        } catch (err) {
          // do nothing
        }
      },
    }),

    checkoutUpdate: builder.mutation({
      query: ({ id }) => {
        console.log(" ids: ", id);
        return configuration(
          CHECKOUT_DELIVERY_METHOD({
            id,
          })
        );
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result: ", result);
        } catch (err) {
          // do nothing
        }
      },
    }),

    checkoutComplete: builder.mutation({
      query: ({ id }) => {
        console.log(" ids: ", id);
        return configuration(
          CHECKOUT_COMPLETE({
            id,
          })
        );
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result: ", result);
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
});

export const {
  useAddToCartMutation,
  useCheckoutTokenMutation,
  useGetCartListQuery,
  useRemoveToCartMutation,
  useCreateCheckoutTokenMutation,
  useCheckoutUpdateMutation,
  useCheckoutCompleteMutation,
} = cardApi;
