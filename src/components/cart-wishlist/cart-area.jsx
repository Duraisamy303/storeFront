import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal
import { cart_list, clearCart } from "@/redux/features/cartSlice";
import CartCheckout from "./cart-checkout";
import CartItem from "./cart-item";
import RenderCartProgress from "../common/render-cart-progress";
import {
  useGetCartListQuery,
  useUpdateCartQuantityMutation,
} from "@/redux/features/card/cardApi";
import { notifySuccess } from "@/utils/toast";

const CartArea = () => {
  const cart = useSelector((state) => state.cart.cart_list);

  const { data: list, refetch } = useGetCartListQuery();

  const dispatch = useDispatch();

  const [cartData, setCartData] = useState([]);
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    const data = cart?.map((item) => {
      return { ...item, quantity: item.quantity ? item.quantity : 1 };
    });
    setCartData(data);
  }, [cart]);

  const [updateCartQuantity, {}] = useUpdateCartQuantityMutation();

  const updateCart = () => {
    if (cartData?.length > 0) {
      cartData?.map((item) =>
        updateCartQuantity({
          checkoutId: list?.data?.checkout?.id,
          lineId: item.id,
          quantity: item.quantity,
        }).then((data) => {
          const updateData =
            data?.data?.data?.checkoutLinesUpdate?.checkout?.lines;
          dispatch(cart_list(updateData));
         

          // console.log("data: ", data.data.data.checkoutLinesUpdate.checkout.lines);
        })
      );
    }
    refetch()
    notifySuccess("Quantity update completed");
  };

  const incQuantity = (quantity, id) => {
    console.log("quantity: ", quantity);
    const data = cartData.map((item) => {
      if (item.id == id) {
        // Increase quantity by 1
        return { ...item, quantity: quantity };
      }
      return item;
    });
    setCartData(data);
  };

  const decQuantity = (quantity, id) => {
    const data = cartData.map((item) => {
      if (item.id === id) {
        // Decrease quantity by 1
        return { ...item, quantity };
      }
      return item;
    });
    setCartData(data);
  };

  const applyCoupon = (e) => {
    e.preventDefault();
    console.log("coupon: ", couponCode);
  };

  return (
    <>
      <section className="tp-cart-area pb-50 mt-50">
        <div className="container-fluid">
          {cart?.length === 0 && (
            <div className="text-center pt-50">
              <h3>No Cart Items Found</h3>
              <Link href="/shop" className="tp-cart-checkout-btn mt-20">
                Continue Shipping
              </Link>
            </div>
          )}
          {cart?.length > 0 && (
            <div className="row">
              <div className="col-xl-9 col-lg-8">
                <div className="tp-cart-list mb-25 mr-30">
                  {/* <div className="cartmini__shipping">
                    <RenderCartProgress />
                  </div> */}
                  <table className="table">
                    <thead>
                      <tr>
                        <th colSpan="2" className="tp-cart-header-product">
                          PRODUCT
                        </th>
                        <th className="tp-cart-header-price">PRICE</th>
                        <th className="tp-cart-header-price">QUANTITY</th>
                        <th className="tp-cart-header-price">SUBTOTAL</th>
                        <th className="tp-cart-header-quantity">Action</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartData?.map((item, i) => (
                        <CartItem
                          isQuantity={true}
                          key={i}
                          product={item}
                          title={
                            item?.variant?.product?.name || item?.node?.name
                          }
                          img={
                            item?.variant?.product?.thumbnail?.url ||
                            item?.node?.thumbnail?.url
                          }
                          price={
                            item?.variant?.pricing?.price?.gross?.amount ||
                            item?.node?.pricing?.priceRange?.start?.gross
                              ?.amount
                          }
                          quantityAvailable={
                            item?.variant?.quantityAvailable ||
                            item?.node?.quantityAvailable
                          }
                          incQuantity={(quantity) =>
                            incQuantity(quantity, item.id)
                          }
                          decQuantity={(quantity) =>
                            decQuantity(quantity, item.id)
                          }
                          quantityCount={item.quantity}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="tp-cart-bottom">
                  <div className="row align-items-end">
                    <div className="col-xl-6 col-md-8">
                      <div className="tp-cart-coupon">
                        <form action="#">
                          <div className="tp-cart-coupon-input-box">
                            {/* <label>Coupon Code:</label> */}
                            <div className="tp-cart-coupon-input d-flex align-items-center">
                              <input
                                type="text"
                                placeholder="Coupon Code"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                name="couponcode"
                              />
                              <button type="submit" onClick={applyCoupon}>
                                APPLY COUPON
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="col-xl-6 col-md-4">
                      <div className="tp-cart-update text-md-end mr-30">
                        <button
                          onClick={() => updateCart()}
                          type="button"
                          className="tp-cart-update-btn"
                        >
                          UPDATE CART
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <CartCheckout />
              </div>
            </div>
          )}

          {/* <div style={{ paddingTop: "50px" }}>
            <h5>YOU MAY BE INTERESTED IN…</h5>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default CartArea;
