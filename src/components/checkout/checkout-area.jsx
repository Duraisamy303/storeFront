import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal
import CheckoutBillingArea from "./checkout-billing-area";
import CheckoutCoupon from "./checkout-coupon";
import CheckoutLogin from "./checkout-login";
import CheckoutOrderArea from "./checkout-order-area";
import useCheckoutSubmit from "@/hooks/use-checkout-submit";
import useRazorpay from "react-razorpay";
import {
  useApplyCoupenCodeMutation,
  useCheckoutCompleteMutation,
  useCheckoutUpdateMutation,
  useCreateCheckoutIdMutation,
  useCreateCheckoutTokenMutation,
  useCreateNewTokenMutation,
} from "@/redux/features/card/cardApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useRouter } from "next/router";
import { checkChannel } from "@/utils/functions";

const CheckoutArea = () => {
  // const {register,handleSubmit,setValue,formState: { errors }} = useForm();

  const [createCheckout, { data: tokens }] = useCreateCheckoutTokenMutation();

  const [createDeliveryUpdate, { data: data }] = useCheckoutUpdateMutation();

  const [checkoutComplete, { data: complete }] = useCheckoutCompleteMutation();

  const [createCheckoutId] = useCreateCheckoutIdMutation();

  const [applyCoupenCode] = useApplyCoupenCodeMutation();

  const [Razorpay] = useRazorpay();

  const checkoutData = useCheckoutSubmit();

  const {
    handleSubmit,
    register,
    errors,
    handleCouponCode,
    couponRef,
    couponApplyMsg,
    shippingCost,
  } = checkoutData;

  const cart = useSelector((state) => state.cart?.cart_list);

  const router = useRouter();

  const dispatch = useDispatch();

  const [isVerified, setIsVerified] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [token, setToken] = useState("");
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  let lines = [];
  if (cart?.length > 0) {
    lines = cart?.map((item) => {
      return { quantity: 1, variantId: item?.variant?.id };
    });
  }

  const applyCoupen = async () => {
    try {
      let checkoutId = localStorage.getItem("checkoutId");
      const data = await applyCoupenCode({
        checkoutId,
        languageCode: "EN_US",
        // promoCode: "E87B-D067-5527",
        promoCode: "E87B-D067-5527",
      });
      console.log(
        "data?.data?.data?.checkoutAddPromoCode: ",
        data?.data?.data?.checkoutAddPromoCode
      );

      if (data?.data?.data?.checkoutAddPromoCode?.errors?.length > 0) {
        notifyError(data?.data?.data?.checkoutAddPromoCode?.errors[0]?.message);
        setIsVerified(false);
      } else {
        setIsVerified(true);

        const checkoutId = data?.data?.data?.checkoutCreate?.checkout?.id;
      }

      // const lines = cart?.map((item) => {
      //   return { quantity: 1, variantId: item?.variant?.id };
      // });

      // const data = await createCheckoutId({
      //   lines,
      // });
      // if (data?.data?.data?.checkoutCreate?.errors?.length > 0) {
      //   notifyError(data?.data?.data?.checkoutCreate?.errors[0]?.message);
      // } else {
      //   const checkoutId = data?.data?.data?.checkoutCreate?.checkout?.id;
      //   localStorage.setItem("checkoutId", checkoutId);
      //   verifyCoupenCode(checkoutId);
      // }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const verifyCoupenCode = async (checkoutId) => {
    try {
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <>
      <CheckoutBillingArea />
    </>
  );
};

export default CheckoutArea;
