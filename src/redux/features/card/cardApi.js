import Cookies from "js-cookie";
import { PRODUCT_LIST } from "@/utils/queries/productList";
import { configuration } from "@/utils/constant";
import { LOGIN } from "@/utils/queries/login/login";
import { REGISTER } from "@/utils/queries/register/register";
import cardSlice from "./cardSlice";
import { apiSlice } from "@/redux/api/apiSlice";
import { ADDTOCART } from "@/utils/queries/cart/addToCart";

export const cardApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
   
    addToCart: builder.mutation({
      query: ({ data }) => configuration(ADDTOCART({ data})),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          
        } catch (err) {
          // do nothing
        }
      },
    }),
   
  }),
});

export const {
  useAddToCartMutation,
 
} = cardApi;
