import { apiSlice } from "@/redux/api/apiSlice";
import { userLoggedIn } from "./authSlice";
import Cookies from "js-cookie";
import { PRODUCT_LIST } from "@/utils/queries/productList";
import { configuration } from "@/utils/constant";
import { CHANGE_PASSWORD, LOGIN } from "@/utils/queries/login/login";
import {
  GET_ORDER_LIST_BY_EMAIL,
  REGISTER,
} from "@/utils/queries/register/register";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: ({ firstName, lastName, email, password }) =>
        configuration(REGISTER({ firstName, lastName, email, password })),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          Cookies.set(
            "userInfo",
            JSON.stringify({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            }),
            { expires: 0.5 }
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    // signUpProvider
    signUpProvider: builder.mutation({
      query: (token) => ({
        url: `api/user/register/${token}`,
        method: "POST",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          Cookies.set(
            "userInfo",
            JSON.stringify({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            }),
            { expires: 0.5 }
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    // login
    loginUser: builder.mutation({
      query: ({ email, password }) => configuration(LOGIN({ email, password })),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result: ", result);
          localStorage.setItem("token", result.data.data.tokenCreate.token);
          localStorage.setItem(
            "userInfo",
            JSON.stringify({
              accessToken: result.data.data.tokenCreate.token,
              user: result.data.data.tokenCreate.user,
              refreshToken: result.data.data.tokenCreate.refreshToken,
            })
          );
          // Cookies.set(
          //   "userInfo",
          //   JSON.stringify({
          //     accessToken: result.data.data.tokenCreate.token,
          //     user: result.data.data.tokenCreate.user,
          //     refreshToken: result.data.data.tokenCreate.refreshToken,
          //   }),
          //   { expires: 0.5 }
          // );
          dispatch(
            userLoggedIn({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    // get me
    getUser: builder.query({
      query: () => "api/user/me",

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              user: result.data,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    // confirmEmail
    confirmEmail: builder.query({
      query: (token) => `api/user/confirmEmail/${token}`,

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem("userInfo", JSON.stringify(result.data.data));

          Cookies.set(
            "userInfo",
            JSON.stringify({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            }),
            { expires: 1 }
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    // reset password
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "api/user/forget-password",
        method: "PATCH",
        body: data,
      }),
    }),
    // confirmForgotPassword
    confirmForgotPassword: builder.mutation({
      query: (data) => ({
        url: "api/user/confirm-forget-password",
        method: "PATCH",
        body: data,
      }),
    }),
    // change password
    changePassword: builder.mutation({
      query: ({ old_password, new_password }) => {
        return configuration(CHANGE_PASSWORD({ old_password, new_password }));
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

    // updateProfile password
    updateProfile: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/user/update-user/${id}`,
        method: "PUT",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          Cookies.set(
            "userInfo",
            JSON.stringify({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            }),
            { expires: 0.5 }
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),

    getOrderList: builder.query({
      query: () => {
        const user = localStorage.getItem("userInfo");

        const email=JSON.parse(user).user.email
        console.log("email: ", email);
        return configuration(GET_ORDER_LIST_BY_EMAIL({email}));
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result: ", result);
        } catch (err) {
          // do nothing
        }
      },
      providesTags: ["UserOrders"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useConfirmEmailQuery,
  useResetPasswordMutation,
  useConfirmForgotPasswordMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useSignUpProviderMutation,
  useGetOrderListQuery,
} = authApi;
