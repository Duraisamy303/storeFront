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

  const [cartTotals, setCartTotal] = useState(0);
  const [coupenCode, setCoupenCode] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  console.log("coupenCode: ", coupenCode);

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

  const applyCoupen = async () => {
    try {
      console.log("cart: ", cart);
      const lines = cart?.map((item) => {
        return { quantity: 1, variantId: item?.variant?.id };
      });
      console.log("lines: ", lines);

      const data = await createCheckoutId({
        lines,
      });
      if (data?.data?.data?.checkoutCreate?.errors?.length > 0) {
        notifyError(data?.data?.data?.checkoutCreate?.errors[0]?.message);
      } else {
        const checkoutId = data?.data?.data?.checkoutCreate?.checkout?.id;
        console.log("checkoutId: ", checkoutId);
        localStorage.setItem("checkoutId", checkoutId);
        verifyCoupenCode(checkoutId);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const verifyCoupenCode = async (checkoutId) => {
    try {
      const data = await applyCoupenCode({
        checkoutId,
        languageCode: "EN_US",
        promoCode: "E87B-D067-5527",
      });
      console.log("verifyCoupenCode: ", data);

      if (data?.data?.data?.checkoutAddPromoCode?.errors?.length > 0) {
        notifyError(data?.data?.data?.checkoutAddPromoCode?.errors[0]?.message);
        console.log(
          "data?.data?.checkoutAddPromoCode?.errors[0]?.message: ",
          data?.data?.data?.checkoutAddPromoCode?.errors[0]?.message
        );
        setIsVerified(false);
      } else {
        setIsVerified(true);

        const checkoutId = data?.data?.data?.checkoutCreate?.checkout?.id;
        console.log("checkoutId: ", checkoutId);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

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
              {/* <div className="col-xl-7 col-lg-7">
                <div className="tp-checkout-verify">
                  {!token && <CheckoutLogin />}
                  <div className="tp-checkout-verify-item">
                    <p className="tp-checkout-verify-reveal">
                      Have a coupon?{" "}
                      <button
                        onClick={() => setIsOpen(!isOpen)}
                        type="button"
                        className="tp-checkout-coupon-form-reveal-btn"
                      >
                        Click here to enter your code
                      </button>
                    </p>

                    {isOpen && (
                      <div
                        id="tpCheckoutCouponForm"
                        className="tp-return-customer"
                      >
                        <div className="tp-return-customer-input">
                          <label>Coupon Code :</label>
                          <input
                            value={coupenCode}
                            onChange={(e) => setCoupenCode(e.target.value)}
                            type="text"
                            placeholder="Coupon"
                            disabled={isVerified}
                          />
                        </div>
                        {isVerified ? (
                          <div
                            className="text-green"
                            style={{ color: "green" }}
                            placeholder=""
                          >
                            Verified
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="tp-return-customer-btn tp-checkout-btn"
                            onClick={() => applyCoupen()}
                          >
                            Apply
                          </button>
                        )}
                        {couponApplyMsg && (
                          <p className="p-2" style={{ color: "green" }}>
                            {couponApplyMsg}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div> */}
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
