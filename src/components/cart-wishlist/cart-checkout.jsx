import React, { useEffect } from "react";
import Link from "next/link";
import useCartInfo from "@/hooks/use-cart-info";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetCartListQuery } from "@/redux/features/card/cardApi";

const CartCheckout = ({ cartData }) => {
  const { total } = useCartInfo();
  const [shipCost, setShipCost] = useState(0);
  const [totals, setTotal] = useState(0);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart?.cart_list);

  const { data: list, refetch } = useGetCartListQuery();
  console.log("list: ", list);

  const totalAmount = cart?.reduce(
    (acc, curr) =>
      acc + curr?.variant?.pricing?.price?.gross?.amount * curr?.quantity ||
      acc +
        curr?.node?.pricing?.priceRange?.start?.gross?.amount * curr?.quantity,
    0
  );
  // handle shipping cost
  const handleShippingCost = (value) => {
    if (value === "free") {
      setShipCost(0);
    } else {
      setShipCost(value);
    }
  };

  useEffect(() => {
    let total = 0;
    if (shipCost == "free") {
      total = totalAmount;
    } else {
      total = totalAmount + shipCost;
    }
    setTotal(total);
  }, [shipCost, dispatch, cart]);

  useEffect(() => {}, []);


  const quantityDisable = cartData?.map((item) => {
    return item.variant.quantityAvailable >= item.quantity;
  });

  return (
    <div className="tp-cart-checkout-wrapper">
      <div>
        <h5 style={{ fontWeight: "500", paddingBottom: "20px" }}>
          CART TOTALS
        </h5>
      </div>
      <div className="tp-cart-checkout-top d-flex align-items-center justify-content-between">
        <span className="tp-cart-checkout-top-title">Subtotal</span>
        <span className="tp-cart-checkout-top-price">
          &#8377;{list?.data?.checkout?.totalPrice?.gross?.amount}
        </span>
      </div>

      <div className="tp-cart-checkout-top d-flex align-items-center justify-content-between">
        <span className="tp-cart-checkout-top-title">Shipping</span>
        <span
          className="tp-cart-checkout-top-price"
          style={{ textAlign: "right" }}
        >
          Free shipping
          <br />
          Shipping to <b>Tamil Nadu</b>.<br />
          <span style={{ color: "#c3935b" }}>Change address</span>
        </span>
      </div>
      {/* <div className="tp-cart-checkout-shipping">
        <h4 className="tp-cart-checkout-shipping-title">Shipping</h4>
        <div className="tp-cart-checkout-shipping-option-wrapper">
          <div className="tp-cart-checkout-shipping-option">
            <input id="flat_rate" type="radio" name="shipping" />
            <label htmlFor="flat_rate" onClick={() => handleShippingCost(20)}>
              Flat rate: <span>$20.00</span>
            </label>
          </div>
          <div className="tp-cart-checkout-shipping-option">
            <input id="local_pickup" type="radio" name="shipping" />
            <label
              htmlFor="local_pickup"
              onClick={() => handleShippingCost(25)}
            >
              Local pickup: <span> $25.00</span>
            </label>
          </div>
          <div className="tp-cart-checkout-shipping-option">
            <input id="free_shipping" type="radio" name="shipping" />
            <label
              onClick={() => handleShippingCost("free")}
              htmlFor="free_shipping"
            >
              Free shipping
            </label>
          </div>
        </div>
      </div> */}
      <div className="tp-cart-checkout-total d-flex align-items-center justify-content-between">
        <span>Total</span>
        <span>
          &#8377;{list?.data?.checkout?.totalPrice?.gross?.amount?.toFixed(2)}
          <br />
          <span style={{ fontSize: "14px" }}>(includes ₹1,012.14 VAT)</span>
        </span>
      </div>
      <div className="tp-cart-checkout-proceed">
        {quantityDisable?.some((item) => item === false) ? (
          <button
            type="button"
            className="tp-cart-checkout-btn w-100"
            disabled
            style={{ cursor: "not-allowed" }}
          >
            PROCEED TO CHECKOUT
          </button>
        ) : (
          <Link href="/checkout" className="tp-cart-checkout-btn w-100">
            PROCEED TO CHECKOUT
          </Link>
        )}
      </div>
    </div>
  );
};

export default CartCheckout;
