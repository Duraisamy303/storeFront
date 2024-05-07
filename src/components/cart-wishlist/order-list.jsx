import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal
import { clearCart } from "@/redux/features/cartSlice";
import CartCheckout from "./cart-checkout";
import CartItem from "./cart-item";
import RenderCartProgress from "../common/render-cart-progress";
import {
  useGetAllProductsQuery,
  useMyOrderListQuery,
  useOrderListQuery,
} from "@/redux/features/productApi";
import { useGetCartListQuery } from "@/redux/features/card/cardApi";
import moment from "moment";
import { useRouter } from "next/router";

const OrderList = () => {
  const { data: data } = useGetCartListQuery();

  const { data: orders, isError, isLoading } = useMyOrderListQuery();

  const [orderList, setOrderList] = useState([]);
  console.log("orderList: ", orderList);

  const cart = orders?.data?.order?.lines;

  const router = useRouter();

  useEffect(() => {
    if (orders?.data?.me?.orders?.edges?.length > 0) {
      const edges = orders?.data?.me?.orders?.edges;
      const list = edges?.map((item) => item.node);
      setOrderList(list);
    }
  }, [orders]);

  return (
    <>
      <section className="tp-cart-area pb-50">
        <div className="container-fluid">
          {orderList?.length < 0 && (
            <div className="text-center pt-50">
              <h3>No Items Found</h3>
              <Link href="/shop" className="tp-cart-checkout-btn mt-20">
                Continue Shipping
              </Link>
            </div>
          )}
          {orderList?.length > 0 && (
            <div className="row">
              <div className="col-xl-12">
                <div className="tp-cart-list mb-45 ">
                  <table className="table">
                    <thead>
                      <tr>
                        <th colSpan="2" className="tp-cart-header-product">
                          ODRER
                        </th>
                        <th className="tp-cart-header-quantity">DATE</th>
                        <th className="tp-cart-header-price">STATUS</th>
                        <th className="tp-cart-header-price">TOTAL</th>

                        <th>ACTION</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderList?.map((item) => (
                        <tr>
                          <td className="tp-cart-product">
                            <span>{item?.number}</span>
                          </td>
                          <td className="tp-cart-quantity">
                            <span>
                              {moment(item?.created).format("MMMM D, YYYY")}
                            </span>
                          </td>
                          <td className="tp-cart-price">
                            <span>{item?.status}</span>
                          </td>
                          <td className="tp-cart-price">
                            <span>{`${item?.total?.gross?.amount} for  ${item?.lines?.length} item`}</span>
                          </td>
                          <td className="tp-cart-price">
                            <Link
                              href={`/order-details/${item?.id}`}
                              className="tp-return-customer-btn tp-checkout-btn"
                            >
                              <span> View</span>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          )}
        </div>
      </section>
    </>
  );
};

export default OrderList;
