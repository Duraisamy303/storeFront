import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Link from "next/link";
// internal
import { CloseEye, OpenEye } from "@/svg";
import ErrorMsg from "../common/error-msg";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import {
  useAddToCartMutation,
  useCheckoutTokenMutation,
} from "@/redux/features/card/cardApi";
import {
  useAddWishlistMutation,
  useWishlistMutation,
} from "@/redux/features/productApi";
import { useDispatch, useSelector } from "react-redux";
import { cart_list } from "@/redux/features/cartSlice";

// schema
const schema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});
const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);

  const cart = useSelector((state) => state.cart.cart_list);

  const dispatch = useDispatch();

  const [loginUser, {}] = useLoginUserMutation();

  const [addWishlist, {}] = useAddWishlistMutation();

  const [checkoutTokens, { data: tokens }] = useCheckoutTokenMutation();

  const [addToCartMutation, { data: productsData, isError, isLoading }] =
    useAddToCartMutation();

  const router = useRouter();
  const { redirect } = router.query;
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  // onSubmit
  const onSubmit = (data) => {
    loginUser({
      email: data.email,
      password: data.password,
    }).then((data) => {
      let whishlist = localStorage.getItem("whishlist");

      if (data?.data?.data?.tokenCreate?.errors?.length > 0) {
        notifyError(data?.data?.data?.tokenCreate?.errors[0]?.message);
      } else {
        notifySuccess("Login successfully");

        if (!whishlist) {
          whishlist = [];
        } else {
          whishlist = JSON.parse(whishlist);
          if (whishlist?.length > 0) {
            whishlist.map((item) =>
              wishlistData(data?.data?.data?.tokenCreate, item.node)
            );
          }
        }
        getCheckoutToken(data?.data?.data?.tokenCreate?.user?.email);

        router.push(redirect || "/");
      }
    });
    reset();
  };

  const wishlistData = async (user, data) => {
    try {
      const input = {
        input: {
          user: user.user.id,
          variant: data.id,
        },
      };
      const res = await addWishlist(input);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getCheckoutToken = async (email) => {
    try {
      const data = await checkoutTokens({
        email,
      });
      console.log("data: ", data);
      if (cart?.length > 0) {
        cart?.map((item) =>
          handleAddProduct(
            data?.data?.data?.checkoutCreate?.checkout?.token,
            item?.variant.id
          )
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddProduct = async (checkoutToken, id) => {
    try {
      const response = await addToCartMutation({
        checkoutToken: checkoutToken,
        variantId: id,
      });
      console.log("response: ", response);
      if (response.data?.data?.checkoutLinesAdd?.errors?.length > 0) {
        const err = response.data?.data?.checkoutLinesAdd?.errors[0]?.message;
        notifyError(err);
        dispatch(cart_list(cart));
      } else {
        notifySuccess(`${product.node.name} added to cart successfully`);
        // cart_list.push
        dispatch(
          cart_list(response?.data?.data?.checkoutLinesAdd?.checkout?.lines)
        );
        updateData();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tp-login-input-wrapper">
        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("email", { required: `Email is required!` })}
              name="email"
              id="email"
              type="email"
              placeholder="shofy@mail.com"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="email">Your Email</label>
          </div>
          <ErrorMsg msg={errors.email?.message} />
        </div>
        <div className="tp-login-input-box">
          <div className="p-relative">
            <div className="tp-login-input">
              <input
                {...register("password", { required: `Password is required!` })}
                id="password"
                type={showPass ? "text" : "password"}
                placeholder="Min. 6 character"
              />
            </div>
            <div className="tp-login-input-eye" id="password-show-toggle">
              <span className="open-eye" onClick={() => setShowPass(!showPass)}>
                {showPass ? <CloseEye /> : <OpenEye />}
              </span>
            </div>
            <div className="tp-login-input-title">
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <ErrorMsg msg={errors.password?.message} />
        </div>
      </div>
      <div className="tp-login-suggetions d-sm-flex align-items-center justify-content-between mb-20">
        <div className="tp-login-remeber">
          <input id="remeber" type="checkbox" />
          <label htmlFor="remeber">Remember me</label>
        </div>
        <div className="tp-login-forgot">
          <Link href="/forgot">Forgot Password?</Link>
        </div>
      </div>
      <div className="tp-login-bottom">
        <button type="submit" className="tp-login-btn w-100">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
