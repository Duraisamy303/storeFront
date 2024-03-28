import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

  const router=useRouter()

  const [cartTotals, setCartTotal] = useState(0);

  const [accessToken, setToken] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    const accessToken = JSON.parse(user)?.accessToken;
    setToken(accessToken);
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

  // useEffect(() => {
  //   // const result = cart?.filter(
  //   //   (p) => p.productType === discountProductType
  //   // );
  //   // const discountProductTotal = result?.reduce(
  //   //   (preValue, currentValue) =>
  //   //     preValue + currentValue.price * currentValue.orderQuantity,
  //   //   0
  //   // );
  //   let subTotal = Number((totalAmount + shippingCost).toFixed(2));
  //   // let discountTotal = Number(
  //   //   discountProductTotal * (discountPercentage / 100)
  //   // );
  //   // totalValue = Number(subTotal - discountTotal);
  //   // setDiscountAmount(discountTotal);
  //   setCartTotal(subTotal);
  // }, [shippingCost, cartTotals,totalAmount]);

  // useEffect(() => {
  //   let subTotal = Number((totalAmount + shippingCost).toFixed(2));
  //   setCartTotal(subTotal);
  // }, []);

  // const submitHandler = async (data) => {
  //   console.log("data: ", data);

  //   let orderInfo = {
  //     name: `${data.firstName} ${data.lastName}`,
  //     address: data.address,
  //     contact: data.contactNo,
  //     email: data.email,
  //     city: data.city,
  //     country: data.country,
  //     zipCode: data.zipCode,
  //     shippingOption: data.shippingOption,
  //     status: "Pending",
  //     cart: cart,
  //     paymentMethod: data.payment,
  //     subTotal: total,
  //     shippingCost: shippingCost,
  //     discount: discountAmount,
  //     totalAmount: cartTotal,
  //     orderNote:data.orderNote,
  //     user: `${user?._id}`,
  //   };
  // }

  const submitHandler = async (data) => {

    try {

      const createCheckoutResponse = await createCheckout({
        channel: "india-channel",
        email: data.email,
        lines,
        firstName: data.firstName,
        lastName: data.lastName,
        streetAddress1: data.address,
        city: data.city,
        country: "IN",
        postalCode: data.zipCode,
        countryArea: "Tamil Nadu",
      });
      console.log("createCheckoutResponse: ", createCheckoutResponse);
      if (
        createCheckoutResponse?.data?.data?.checkoutCreate?.errors?.length > 0
      ) {
        notifyError(
          `${createCheckoutResponse?.data?.data?.checkoutCreate?.errors[0]?.code} ${createCheckoutResponse?.data?.data?.checkoutCreate?.errors[0]?.field}`
        );
        return;
      }

      const checkoutId =
        createCheckoutResponse?.data?.data?.checkoutCreate?.checkout?.id;

      if (checkoutId) {
        const deliveryUpdateResponse = await createDeliveryUpdate({
          id: checkoutId,
        });
        console.log("Delivery Update Response:", deliveryUpdateResponse);
        handlePayment(checkoutId, data,cart);

      }
    } catch (error) {
      console.log("error: ", error);
      console.error("Error:", error);
    }
  };

  const handlePayment = useCallback(
    async (checkoutId, data,cart) => {

      const totalAmount = cart?.reduce(
        (acc, curr) => acc + curr?.variant?.pricing?.price?.gross?.amount,
        0
      );

      const options = {
        key: "rzp_test_tEMCtcfElFdYts",
        key_secret: "rRfAuSd9PLwbhIwUlBpTy4Gv",
        // amount: parseInt() * 100,
        amount: Number(totalAmount) * 100,
        currency: "INR",
        name: `${data.firstName} ${data.lastName}`,
        description: data.orderNote,
        image: "https://example.com/your_logo",
        // order_id: "ORD20156712",
        handler: async (res) => {
          notifySuccess("Payment Successful");
          console.log(res);
          const completeResponse = await checkoutComplete({ id: checkoutId });
          const orderId=completeResponse.data?.data?.checkoutComplete?.order?.id
          console.log("orderId: ", orderId);
          localStorage.setItem("orderId", orderId)
          console.log("Checkout Complete Response:", completeResponse);
          router.push("/myOrders")
        },
        prefill: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          contact: data.contactNo,
        },
        notes: {
          address: data.address,
        },
        theme: {
          color: "#3399cc",
        },
        retry: {
          enabled: true,
          max_count: true,
        },
      };

      const rzpay = new Razorpay(options);
      rzpay.open();
    },
    [Razorpay]
  );

  return (
    <>
      <section
        className="tp-checkout-area pb-50"
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
                  {/* {!accessToken && */}
                  <CheckoutLogin />
                  {/* } */}
                  <CheckoutCoupon
                    handleCouponCode={handleCouponCode}
                    couponRef={couponRef}
                    couponApplyMsg={couponApplyMsg}
                  />
                </div>
              </div>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="row">
                  <div className="col-lg-7">
                    <CheckoutBillingArea register={register} errors={errors} />
                  </div>
                  <div className="col-lg-5">
                    <CheckoutOrderArea checkoutData={checkoutData} />
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CheckoutArea;
