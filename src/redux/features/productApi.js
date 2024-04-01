import { gql } from "@apollo/client";
import { apiSlice } from "../api/apiSlice";
import { configuration } from "@/utils/constant";
import {  ORDER_LIST, PRODUCT_LIST } from "@/utils/queries/productList";
import { RELATED_PRODUCT, SINGLE_PRODUCT } from "@/utils/queries/singleProduct/productDetailsByID";


export const productApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllProducts: builder.query({
     query: ({ channel, first }) => configuration(PRODUCT_LIST({ channel, first })),
      // query: () => `/api/product/all`,
      providesTags: ["Products"],
    }),
    getProductType: builder.query({
      query: ({ channel, first }) => configuration(PRODUCT_LIST({ channel, first })),
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
     query: ({productId }) => configuration(SINGLE_PRODUCT({ productId })),

      // query: (id) => `/api/product/single-product/${id}`,
      providesTags: (result, error, arg) => [{ type: "Product", id: arg }],
      invalidatesTags: (result, error, arg) => [
        { type: "RelatedProducts", id: arg },
      ],
    }),
    // get related products
    getRelatedProducts: builder.query({
     query: ({id }) => configuration(RELATED_PRODUCT({ id })),
      providesTags: (result, error, arg) => [
        { type: "RelatedProducts", id: arg },
      ],
    }),
    orderList: builder.query({
      query: () =>{
        const orderid=localStorage.getItem('orderId');
        return configuration(ORDER_LIST({ orderid }))
      } ,
       // query: () => `/api/product/all`,
       providesTags: ["Products"],
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
  useOrderListQuery
} = productApi;
