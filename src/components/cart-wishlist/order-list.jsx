import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal
import { clearCart } from "@/redux/features/cartSlice";
import CartCheckout from "./cart-checkout";
import CartItem from "./cart-item";
import RenderCartProgress from "../common/render-cart-progress";
import { useGetAllProductsQuery, useOrderListQuery } from "@/redux/features/productApi";
import { useGetCartListQuery } from "@/redux/features/card/cardApi";

const OrderList = () => {

  const  { data: data } = useGetCartListQuery();

  const {
    data: orderList,
    isError,
    isLoading,
  } = useOrderListQuery();

  const cart=orderList?.data?.order?.lines

  const dispatch = useDispatch();

 



  return (
    <>
      <section className="tp-cart-area pb-50">
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
                <div className="tp-cart-list  mr-30">
                  <div className="cartmini__shipping">
                    {/* <RenderCartProgress /> */}
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th colSpan="2" className="tp-cart-header-product">
                          Product
                        </th>
                        {/* <th className="tp-cart-header-quantity">Product name</th> */}

                        <th className="tp-cart-header-price">Price</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart?.map((item, i) => (
                        <CartItem
                          key={i}
                          product={item}
                          title={item.productName}
                          img={item?.thumbnail?.url}
                          price={item?.totalPrice?.gross?.amount}
                          isRemove={true}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="tp-cart-bottom">
                  <div className="row align-items-end">
                    <div className="col-xl-6 col-md-8">
                      {/* <div className="tp-cart-coupon">
                        <form action="#">
                          <div className="tp-cart-coupon-input-box">
                            <label>Coupon Code:</label>
                            <div className="tp-cart-coupon-input d-flex align-items-center">
                              <input type="text" placeholder="Enter Coupon Code" />
                              <button type="submit">Apply</button>
                            </div>
                          </div>
                        </form>
                      </div> */}
                    </div>
                    {/* <div className="col-xl-6 col-md-4">
                      <div className="tp-cart-update text-md-end mr-30">
                        <button
                          onClick={() => dispatch(clearCart())}
                          type="button"
                          className="tp-cart-update-btn"
                        >
                          Clear Cart
                        </button>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* <div className="col-xl-3 col-lg-4 col-md-6">
                <CartCheckout />
              </div> */}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default OrderList;
