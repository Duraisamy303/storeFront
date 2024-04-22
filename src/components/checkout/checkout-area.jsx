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
  useCheckoutCompleteMutation,
  useCheckoutUpdateMutation,
  useCreateCheckoutTokenMutation,
} from "@/redux/features/card/cardApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useRouter } from "next/router";

const CheckoutArea = () => {
  // const {register,handleSubmit,setValue,formState: { errors }} = useForm();

  const [createCheckout, { data: tokens }] = useCreateCheckoutTokenMutation();

  const [createDeliveryUpdate, { data: data }] = useCheckoutUpdateMutation();

  const [checkoutComplete, { data: complete }] = useCheckoutCompleteMutation();

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

  const dispatch=useDispatch()

  const [cartTotals, setCartTotal] = useState(0);

  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const totalAmount = cart?.reduce(
    (acc, curr) => acc + curr?.variant?.pricing?.price?.gross?.amount,
    0
  );

  let lines = [];
  if (cart?.length > 0) {
    lines = cart?.map((item) => {
      return { quantity: 1, variantId: item?.variant?.id };
    });
  }


  return (
    <>
      <section
        className="tp-checkout-area pb-50 pt-50"
        style={{ backgroundColor: "#EFF1F5" }}
      >
        <div className="container-fluid">
          {cart?.length === 0 && (
            <div className="text-center pt-50">
              <h3 className="py-2">No items found in cart to checkout</h3>
              <Link href="/shop" className="tp-checkout-btn">
                Return to shop
              </Link>
            </div>
          )}
          {cart?.length > 0 && (
            <div className="row">
              <div className="col-xl-7 col-lg-7">
                <div className="tp-checkout-verify">
                  {!token && <CheckoutLogin />}
                  <CheckoutCoupon
                    handleCouponCode={handleCouponCode}
                    couponRef={couponRef}
                    couponApplyMsg={couponApplyMsg}
                  />
                </div>
              </div>
              {/* <form onSubmit={handleSubmit(submitHandler)}> */}
              <div className="row">
                {/* <div className="col-lg-7"> */}
                <CheckoutBillingArea />
                {/* </div> */}
                {/* <div className="col-lg-5"> */}
                {/* <CheckoutOrderArea checkoutData={checkoutData} /> */}
                {/* </div> */}
              </div>
              {/* </form> */}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CheckoutArea;
