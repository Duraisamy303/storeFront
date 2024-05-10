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
      <section className="tp-cart-area pt-50 pb-50">
        <h3 className="mb-30 text-center">My Orders</h3>
        <div className="profile__ticket table-responsive">
          {orderList?.length < 0 && (
            <div
              style={{ height: "210px" }}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="text-center">
                <i
                  style={{ fontSize: "30px" }}
                  className="fa-solid fa-cart-circle-xmark"
                ></i>
                <p style={{ fontSize: "20px", color: "black" }}>
                  You have no order Yet!
                </p>
              </div>
            </div>
          )}
          {orderList?.length > 0 && (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ODRER</th>
                  <th scope="col">DATE</th>
                  <th scope="col">STATUS</th>
                  <th scope="col">TOTAL</th>
                  <th scope="col">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {orderList.map((item, i) => (
                  <tr key={i}>
                    <th scope="row">#{item.number}</th>
                    <td data-info="title">
                      {moment(item.created).format("MMMM D, YYYY")}
                    </td>
                    <td
                      data-info={`status ${
                        item.status === "Pending" ? "pending" : ""
                      }  ${item.status === "Processing" ? "hold" : ""}  ${
                        item.status === "Delivered" ? "done" : ""
                      }`}
                      className={`status ${
                        item.status === "Pending" ? "pending" : ""
                      } ${item.status === "Processing" ? "hold" : ""}  ${
                        item.status === "Delivered" ? "done" : ""
                      }`}
                    >
                      {item.status}
                    </td>
                    <td>
                      {`${item?.total?.gross?.amount} for  ${item?.lines?.length} item`}
                    </td>
                    {/* <td >
                            <Link
                              href={`/order-details/${item?.id}`}
                              className="tp-btn tp-btn-border"
                            >
                              <span> View</span>
                            </Link>
                          </td> */}
                    <td>
                      <button
                        type="button"
                        className="order-view-btn"
                        onClick={() =>
                          router.push(`/order-details/${item?.id}`)
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </>
  );
};

export default OrderList;
