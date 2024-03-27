import { useCallback, useEffect, useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";
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

const CheckoutOrderArea = ({ checkoutData }) => {
  const {
    handleShippingCost,
    cartTotal = 0,
    stripe,
    clientSecret,
    register,
    errors,
    showCard,
    setShowCard,
    shippingCost,
    discountAmount,
  } = checkoutData;

  const { cart_products } = useSelector((state) => state.cart);

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
    let subTotal = Number((totalAmount + shippingCost).toFixed(2));
    // let discountTotal = Number(
    //   discountProductTotal * (discountPercentage / 100)
    // );
    // totalValue = Number(subTotal - discountTotal);
    // setDiscountAmount(discountTotal);
    setCartTotal(subTotal);
  }, [total, shippingCost, cartTotals]);

  useEffect(() => {
    let subTotal = Number((totalAmount + shippingCost).toFixed(2));
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
          console.log(res);
          const completeResponse = await checkoutComplete({ id: checkoutId });
          console.log("Checkout Complete Response:", completeResponse);
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
      console.log("orderId: ", orderId);

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
        console.log("Delivery Update Response:", deliveryUpdateResponse);
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
                ${item?.variant?.pricing?.price?.gross?.amount.toFixed(2)}
              </span>
            </li>
          ))}

          {/*  shipping */}
          <li className="tp-order-info-list-shipping">
            <span>Shipping</span>
            <div className="tp-order-info-list-shipping-item d-flex flex-column align-items-end">
              <span>
                <input
                  {...register(`shippingOption`, {
                    required: `Shipping Option is required!`,
                  })}
                  id="flat_shipping"
                  type="radio"
                  name="shippingOption"
                />
                <label
                  onClick={() => handleShippingCost(60)}
                  htmlFor="flat_shipping"
                >
                  Delivery: Today Cost :<span>$60.00</span>
                </label>
                <ErrorMsg msg={errors?.shippingOption?.message} />
              </span>
              <span>
                <input
                  {...register(`shippingOption`, {
                    required: `Shipping Option is required!`,
                  })}
                  id="flat_rate"
                  type="radio"
                  name="shippingOption"
                />
                <label
                  onClick={() => handleShippingCost(20)}
                  htmlFor="flat_rate"
                >
                  Delivery: 7 Days Cost: <span>$20.00</span>
                </label>
                <ErrorMsg msg={errors?.shippingOption?.message} />
              </span>
            </div>
          </li>

          {/*  subtotal */}
          <li className="tp-order-info-list-subtotal">
            <span>Subtotal</span>
            <span>${totalAmount?.toFixed(2)}</span>
          </li>

          {/*  shipping cost */}
          <li className="tp-order-info-list-subtotal">
            <span>Shipping Cost</span>
            <span>${shippingCost.toFixed(2)}</span>
          </li>

          {/* discount */}
          <li className="tp-order-info-list-subtotal">
            <span>Discount</span>
            <span>${discountAmount.toFixed(2)}</span>
          </li>

          {/* total */}
          <li className="tp-order-info-list-total">
            <span>Total</span>

            <span>
              {" "}
              $
              {totalAmount.toString() === "0"
                ? shippingCost.toFixed(2)
                : parseFloat(cartTotals).toFixed(2)}
            </span>

            {/* <span>${totalAmount?.toFixed(2) == 0?shippingCost.toFixed(2):parseFloat(cartTotals).toFixed(2)}</span> */}
          </li>
        </ul>
      </div>
      {/* <div className="tp-checkout-payment">
        <div className="tp-checkout-payment-item">
          <input
            {...register(`payment`, {
              required: `Payment Option is required!`,
            })}
            type="radio"
            id="back_transfer"
            name="payment"
            value="Card"
          />
          <label
            onClick={() => setShowCard(true)}
            htmlFor="back_transfer"
            data-bs-toggle="direct-bank-transfer"
          >
            Credit Card
          </label>
          {showCard && (
            <div className="direct-bank-transfer">
              <div className="payment_card">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />
              </div>
            </div>
          )}
          <ErrorMsg msg={errors?.payment?.message} />
        </div>
        <div className="tp-checkout-payment-item">
          <input
            {...register(`payment`, {
              required: `Payment Option is required!`,
            })}
            onClick={() => setShowCard(false)}
            type="radio"
            id="cod"
            name="payment"
            value="COD"
          />
          <label htmlFor="cod">Cash on Delivery</label>
          <ErrorMsg msg={errors?.payment?.message} />
        </div>
      </div> */}

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
