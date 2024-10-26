import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// internal
import useCartInfo from "@/hooks/use-cart-info";
import ErrorMsg from "../common/error-msg";
import useRazorpay from "react-razorpay";
import { notifySuccess } from "@/utils/toast";
import {
  useCheckoutTokenMutation,
  useCheckoutUpdateMutation,
  useCreateCheckoutTokenMutation,
  useCheckoutCompleteMutation,
} from "@/redux/features/card/cardApi";
import { roundOff } from "../../utils/functions";

const CheckoutOrderArea = () => {
  // const {
  //   handleShippingCost,
  //   cartTotal = 0,
  //   stripe,
  //   clientSecret,
  //   register,
  //   errors,
  //   showCard,
  //   setShowCard,
  //   shippingCost,
  //   discountAmount,
  // } = checkoutData;

  const shippingCost = 100;

  const [createCheckout, { data: tokens }] = useCreateCheckoutTokenMutation();

  const [createDeliveryUpdate, { data: data }] = useCheckoutUpdateMutation();

  const [checkoutComplete, { data: complete }] = useCheckoutCompleteMutation();

  const cart = useSelector((state) => state.cart?.cart_list);

  const [cartTotals, setCartTotal] = useState(0);

  const { total } = useCartInfo();

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

  useEffect(() => {
    // const result = cart?.filter(
    //   (p) => p.productType === discountProductType
    // );
    // const discountProductTotal = result?.reduce(
    //   (preValue, currentValue) =>
    //     preValue + currentValue.price * currentValue.orderQuantity,
    //   0
    // );
    let subTotal = roundOff(totalAmount + shippingCost);
    // let discountTotal = Number(
    //   discountProductTotal * (discountPercentage / 100)
    // );
    // totalValue = Number(subTotal - discountTotal);
    // setDiscountAmount(discountTotal);
    setCartTotal(subTotal);
  }, [total, shippingCost, cartTotals]);

  useEffect(() => {
    let subTotal = roundOff(totalAmount + shippingCost);
    setCartTotal(subTotal);
  }, []);

  const [Razorpay] = useRazorpay();

  const handlePayment = useCallback(
    async (checkoutId) => {
      const order = await createOrder();

      const user = localStorage.getItem("userInfo");
      const data = JSON.parse(user).user;

      const options = {
        key: "rzp_test_tEMCtcfElFdYts",
        key_secret: "rRfAuSd9PLwbhIwUlBpTy4Gv",
        amount: parseInt(cartTotals) * 100,
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        // order_id: "ORD20156712",
        handler: async (res) => {
          notifySuccess("Payment Successful");
          const completeResponse = await checkoutComplete({ id: checkoutId });
        },
        prefill: {
          name: "Piyush Garg",
          email: "youremail@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
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

  const createOrder = async () => {
    try {
      const padZero = (num) => (num < 10 ? "0" + num : num.toString());

      const now = new Date();
      const year = now.getFullYear();
      const month = padZero(now.getMonth() + 1);
      const day = padZero(now.getDate());
      const hours = padZero(now.getHours());
      const minutes = padZero(now.getMinutes());
      const seconds = padZero(now.getSeconds());

      const orderId = `ORD_${year}${month}${day}_${hours}${minutes}${seconds}`;

      // Your logic to create and return an order object
      return { id: orderId };
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const checkoutCreate = async (data) => {
    try {
      const createCheckoutResponse = await createCheckout({
        channel: "india-channel",
        email: "madhanumk@gmail.com",
        lines,
        firstName: "Durai The king",
        lastName: "Smith",
        streetAddress1: "Kahe",
        city: "Coimbatore",
        country: "IN",
        postalCode: "641021",
        countryArea: "Tamil Nadu",
      });

      const checkoutId =
        createCheckoutResponse?.data?.data?.checkoutCreate?.checkout?.id;

      if (checkoutId) {
        const deliveryUpdateResponse = await createDeliveryUpdate({
          id: checkoutId,
        });
        // handlePayment(checkoutId);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="tp-checkout-place white-bg">
      <h3 className="tp-checkout-place-title">Your Order</h3>

      <div className="tp-order-info-list">
        <ul>
          {/*  header */}
          <li className="tp-order-info-list-header">
            <h4>Product</h4>
            <h4>Total</h4>
          </li>

          {/*  item list */}
          {cart?.map((item) => (
            <li key={item._id} className="tp-order-info-list-desc">
              <p className="para">
                {item?.variant?.product?.name} <span> x {1}</span>
              </p>
              <span>
                &#8377;{roundOff(item?.variant?.pricing?.price?.gross?.amount)}
              </span>
            </li>
          ))}

          {/* total */}
          <li className="tp-order-info-list-total">
            <span>Total</span>

            <span>
              &#8377;
              {totalAmount.toString() === "0"
                ? roundOff(shippingCost)
                : roundOff(cartTotals)}
            </span>
          </li>
        </ul>
      </div>

      <div className="tp-checkout-btn-wrapper">
        <button
          type="submit"
          // disabled={!stripe || isCheckoutSubmit}
          className="tp-checkout-btn w-100"
          // onClick={() => checkoutCreate()}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutOrderArea;
