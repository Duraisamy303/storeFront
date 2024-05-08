import Cookies from "js-cookie";
import { PRODUCT_LIST } from "@/utils/queries/productList";
import { configuration } from "@/utils/constant";
import { LOGIN } from "@/utils/queries/login/login";
import { REGISTER } from "@/utils/queries/register/register";
import cardSlice from "./cardSlice";
import { apiSlice } from "@/redux/api/apiSlice";
import {
  ADDTOCART,
  APPLY_COUPEN_CODE,
  CART_LIST,
  CHECKOUT_COMPLETE,
  CHECKOUT_DELIVERY_METHOD,
  CHECKOUT_TOKEN,
  CHECKOUT_TOKEN_WITHOUT_EMAIL,
  CHECKOUT_UPDATE_SHIPPING_ADDRESS,
  CREATE_CHECKOUT_ID,
  CREATE_CHECKOUT_TOKEN,
  DELETE_WISHLIST,
  GET_WISHLIST_LIST,
  REMOVETOCART,
  UPDATE_BILLING_ADDRESS,
  UPDATE_CART_QUANTITY,
} from "@/utils/queries/cart/addToCart";
import { cart_list, checkout_token } from "../cartSlice";
import { UPDATE_SHIPPING_ADDRESS } from "../../../utils/queries/cart/addToCart";

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
          console.log("result: ", result);
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

    createCheckoutTokenWithoutEmail: builder.mutation({
      query: () => {
        return configuration(
          CHECKOUT_TOKEN_WITHOUT_EMAIL({ channel: "india-channel" })
        );
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const checkoutToken =
            result?.data.data?.checkoutCreate?.checkout?.token;
          dispatch(checkout_token(checkoutToken));
          localStorage.setItem("checkoutToken", checkoutToken);
        } catch (err) {
          // Handle any errors
        }
      },
    }),

    getCartList: builder.query({
      query: () => {
        const checkoutToken = localStorage.getItem("checkoutToken");
        return configuration(CART_LIST({ checkoutToken }));
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
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
        } catch (err) {
          // do nothing
        }
      },
    }),

    createCheckoutToken: builder.mutation({
      query: ({
        channel,
        email,
        lines,
        firstName,
        lastName,
        streetAddress1,
        city,
        postalCode,
        country,
        countryArea,
        firstName1,
        lastName1,
        streetAddress2,
        city1,
        postalCode1,
        country1,
        countryArea1,
      }) => {
        return configuration(
          CHECKOUT_UPDATE_SHIPPING_ADDRESS({
            channel,
            email,
            lines,
            firstName,
            lastName,
            streetAddress1,
            city,
            postalCode,
            country,
            countryArea,
            firstName1,
            lastName1,
            streetAddress2,
            city1,
            postalCode1,
            country1,
            countryArea1,
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
      query: ({ checkoutid, country }) => {
        let deliveryMethodId = "";
        if (country == "IN") {
          deliveryMethodId = "U2hpcHBpbmdNZXRob2Q6Mw==";
        } else {
          deliveryMethodId = "U2hpcHBpbmdNZXRob2Q6Mg==";
        }
        return configuration(
          CHECKOUT_DELIVERY_METHOD({
            checkoutid,
            deliveryMethodId,
          })
        );
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (err) {
          // do nothing
        }
      },
    }),

    checkoutComplete: builder.mutation({
      query: ({ id }) => {
        return configuration(
          CHECKOUT_COMPLETE({
            id,
          })
        );
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (err) {
          // do nothing
        }
      },
    }),

    updateCartQuantity: builder.mutation({
      query: ({ checkoutId, lineId, quantity }) => {
        return configuration(
          UPDATE_CART_QUANTITY({
            checkoutId,
            lineId,
            quantity,
          })
        );
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (err) {
          // do nothing
        }
      },
    }),

    createCheckoutId: builder.mutation({
      query: ({ lines }) => {
        console.log("query: ", lines);

        let channel = "india-channel";
        // const channels = localStorage.getItem("channel");
        // if (!channels) {
        //   channel = "india-channel";
        // } else {
        //   channel = channels;
        // }
        return configuration(CREATE_CHECKOUT_ID({ channel, lines }));
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (err) {
          // do nothing
        }
      },
    }),

    applyCoupenCode: builder.mutation({
      query: ({ checkoutId, languageCode, promoCode }) => {
        return configuration(
          APPLY_COUPEN_CODE({
            checkoutId,
            languageCode,
            promoCode,
          })
        );
      },
    }),

    updateBillingAddress: builder.mutation({
      query: ({ checkoutId, billingAddress }) => {
        return configuration(
          UPDATE_BILLING_ADDRESS({
            checkoutId,
            billingAddress,
            validationRules: {
              checkRequiredFields: false,
            },
            // languageCode: "EN_US",
          })
        );
      },
    }),

    updateShippingAddress: builder.mutation({
      query: ({ checkoutId, shippingAddress }) => {
        console.log(
          "checkoutId, shippingAddress: ",
          checkoutId,
          shippingAddress
        );
        return configuration(
          UPDATE_SHIPPING_ADDRESS({
            checkoutId,
            shippingAddress,
            validationRules: {
              checkRequiredFields: false,
            },
            // languageCode: "EN_US",
          })
        );
      },
    }),

    getWishList: builder.query({
      query: () => {
        const user = localStorage.getItem("userInfo");
        const users = JSON.parse(user);
        console.log("users: ", users);
        return configuration(GET_WISHLIST_LIST({ userEmail: users.user?.email }));
      },

      providesTags: ["Products"],
    }),

    deleteWishlist: builder.mutation({
      query: ({ variant }) => {
        console.log("variant: ", variant);
        const user = localStorage.getItem("userInfo");
        const users = JSON.parse(user);
        console.log("users: ", users);
        return configuration(
          DELETE_WISHLIST({
            user: users?.user?.email,
            variant,
          })
        );
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
  useCreateCheckoutTokenWithoutEmailMutation,
  useCheckoutUpdateMutation,
  useCheckoutCompleteMutation,
  useUpdateCartQuantityMutation,
  useCreateCheckoutIdMutation,
  useApplyCoupenCodeMutation,
  useUpdateBillingAddressMutation,
  useUpdateShippingAddressMutation,
  useGetWishListQuery,
  useDeleteWishlistMutation,
} = cardApi;
