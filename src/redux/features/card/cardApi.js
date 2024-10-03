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
  CHECKOUT_TOKEN_EMAIL,
  CHECKOUT_TOKEN_WITHOUT_EMAIL,
  CHECKOUT_UPDATE_SHIPPING_ADDRESS,
  CREATE_CHECKOUT_ID,
  CREATE_CHECKOUT_TOKEN,
  DELETE_WISHLIST,
  GET_WISHLIST_LIST,
  GIFT_WRAP_UPDATE,
  PAYMENT_METHOD_LIST,
  REMOVETOCART,
  SUB_CAT_LIST,
  UPDATE_BILLING_ADDRESS,
  UPDATE_CART_QUANTITY,
  CHECKOUT_PAYMENT_METHOD_UPDATE,
  UPDATE_SHIPPING_ADDRESS,
} from "@/utils/queries/cart/addToCart";
import { cart_list, checkout_token } from "../cartSlice";
import { GET_CHECKOUT_DETAILS } from "../../../utils/queries/cart/addToCart";
import { checkChannel } from "@/utils/functions";

export const cardApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: ({ variantId, checkoutToken }) => {
        return configuration(ADDTOCART({ checkoutToken, variantId }));
      },
    }),

    checkoutToken: builder.mutation({
      query: ({ channel, email }) => {
        return configuration(CHECKOUT_TOKEN({ channel, email }));
      },
    }),

    createCheckoutTokenWithoutEmail: builder.mutation({
      query: ({ channel }) => {
        return configuration(CHECKOUT_TOKEN_WITHOUT_EMAIL({ channel }));
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
        let checkoutToken = "";
        const channels = localStorage.getItem("channel");
        if (!channels) {
          checkoutToken = localStorage.getItem("checkoutTokenINR");
        } else {
          if (channels == "india-channel") {
            checkoutToken = localStorage.getItem("checkoutTokenINR");
          } else {
            checkoutToken = localStorage.getItem("checkoutTokenUSD");
          }
        }
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

    getCartAllList: builder.query({
      query: () => {
        let checkoutToken = "";
        const channels = localStorage.getItem("channel");
        if (!channels) {
          checkoutToken = localStorage.getItem("checkoutTokenUSD");
        } else {
          if (channels == "india-channel") {
            checkoutToken = localStorage.getItem("checkoutTokenUSD");
          } else {
            checkoutToken = localStorage.getItem("checkoutTokenINR");
          }
        }
        return configuration(CART_LIST({ checkoutToken }));
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
        } catch (err) {
          // do nothing
        }
      },
    }),

    checkoutUpdate: builder.mutation({
      query: ({ checkoutid, country, paymentType }) => {
        //COD and GiftWrap are false
        let deliveryMethodId;
        if (checkChannel() == "india-channel") {
          if (country == "IN") {
            if (paymentType == "Cash On Delivery" && paymentType != "") {
              deliveryMethodId = "U2hpcHBpbmdNZXRob2Q6MTk=";
            } else {
              deliveryMethodId = "U2hpcHBpbmdNZXRob2Q6Mw==";
            }
          } else {
            deliveryMethodId = "U2hpcHBpbmdNZXRob2Q6NA==";
          }
        } else {

          if (country == "IN") {
            if (paymentType == "Cash On Delivery" && paymentType != "") {
              deliveryMethodId = "U2hpcHBpbmdNZXRob2Q6MzU=";
            } else {
              deliveryMethodId = "U2hpcHBpbmdNZXRob2Q6OA==";
            }
          } else {
            deliveryMethodId = "U2hpcHBpbmdNZXRob2Q6OQ==";
          }
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

    updateDeliveryMethodForCODAndGidtWrap: builder.mutation({
      query: ({ checkoutid, deliveryMethodId }) => {
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
        let channel = "india-channel";

        const channels = localStorage.getItem("channel");
        if (!channels) {
          channel = channel;
        } else {
          if (channels == "india-channel") {
            channel = channel;
          } else {
            channel = "default-channel";
          }
        }

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
      query: ({ checkoutId, shippingAddress, note }) => {
        console.log(
          " checkoutId, shippingAddress, note: ",
          checkoutId,
          shippingAddress,
          note
        );
        return configuration(
          UPDATE_SHIPPING_ADDRESS({
            checkoutId,
            shippingAddress,
            note,
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
        return configuration(
          GET_WISHLIST_LIST({ userEmail: users.user?.email })
        );
      },

      providesTags: ["Products"],
    }),

    getCheckoutDetails: builder.mutation({
      query: ({ id }) => {
        // const id = localStorage.getItem("checkoutId");
        return configuration(
          GET_CHECKOUT_DETAILS({ id, languageCode: "EN_US" })
        );
      },

      providesTags: ["Products"],
    }),

    deleteWishlist: builder.mutation({
      query: ({ variant }) => {
        const user = localStorage.getItem("userInfo");
        const users = JSON.parse(user);
        return configuration(
          DELETE_WISHLIST({
            user: users?.user?.email,
            variant,
          })
        );
      },
    }),

    checkoutTokenEmailUpdates: builder.mutation({
      query: ({ checkoutToken, email }) => {
        return configuration(
          CHECKOUT_TOKEN_EMAIL({
            email,
            checkoutToken,
          })
        );
      },
    }),

    updateGiftWrap: builder.mutation({
      query: ({ checkoutId, isgiftwrap }) => {
        return configuration(
          GIFT_WRAP_UPDATE({
            checkoutId,
            isgiftwrap,
          })
        );
      },
    }),

    paymentMethodList: builder.mutation({
      query: () => {
        return configuration(PAYMENT_METHOD_LIST());
      },
    }),
    paymentMethodUpdate: builder.mutation({
      query: ({ paymentMethod }) => {
        const checkoutId = localStorage.getItem("checkoutId");
        return configuration(
          CHECKOUT_PAYMENT_METHOD_UPDATE({ checkoutId, paymentMethod })
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
  useCheckoutTokenEmailUpdatesMutation,
  useGetCartAllListQuery,
  useGetCheckoutDetailsMutation,
  useUpdateGiftWrapMutation,
  usePaymentMethodListMutation,
  useUpdateDeliveryMethodForCODAndGidtWrapMutation,
  usePaymentMethodUpdateMutation,
} = cardApi;
