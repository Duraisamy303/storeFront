import React, { useCallback, useEffect, useState } from "react";
// internal

import {
  useMyOrderListQuery,
  usePaymentMutation,
  useOrderCancelMutation,
} from "@/redux/features/productApi";
import { useGetCartListQuery } from "@/redux/features/card/cardApi";
import moment from "moment";
import { useRouter } from "next/router";
import useRazorpay from "react-razorpay";
import { checkChannel, roundOff } from "@/utils/functions";
import { notifySuccess } from "@/utils/toast";
import ButtonLoader from "../loader/button-loader";

const OrderList = () => {
  // const orderId = id
  const {
    data: orders,
    isError,
    isLoading,
    refetch: orderListRefetch,
  } = useMyOrderListQuery();

  const [orderList, setOrderList] = useState([]);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [index, setIndex] = useState("");

  const [orderCancel] = useOrderCancelMutation();

  const router = useRouter();

  const [Razorpay] = useRazorpay();

  const [successPayment] = usePaymentMutation();

  useEffect(() => {
    if (orders?.data?.me?.orders?.edges?.length > 0) {
      const edges = orders?.data?.me?.orders?.edges;
      const list = edges?.map((item) => item.node);
      setOrderList(list);
    }
  }, [orders]);

  const handlePayment = useCallback(
    async (total, currency, orderId) => {
      try {
        console.log("options: ");

        const options = {
          key: "rzp_test_tEMCtcfElFdYts",
          key_secret: "rRfAuSd9PLwbhIwUlBpTy4Gv",
          amount: roundOff(total) * 100,
          // order_id:orderId,
          currency,
          name: "Products",
          description: "",
          image: "https://example.com/your_logo",
          modal: {
            ondismiss: async (res) => {
              // console.log("res: ", res);
              // router.push(`/order-failed/${orderId}`);
              // await paymentFailed(orderId);
              // paymentFaildRefetch();
            },
          },
          handler: async (res) => {
            console.log("res: ", res);
            if (res?.razorpay_payment_id) {
              notifySuccess("Payment Successful");

              const data = await successPayment({
                amountAuthorized: total,
                amountCharged: total,
                pspReference: res?.razorpay_payment_id,
              });
              router.push(`/order-success/${orderId}`);
            }
          },
          prefill: {
            name: "",
            email: "",
            contact: "",
          },
          notes: {
            address: "",
          },
          theme: {
            color: "#3399cc",
          },
          retry: {
            enabled: false,
            max_count: true,
          },
        };

        const rzpay = new Razorpay(options);
        rzpay.open();
      } catch (error) {
        console.log("error: ", error);
      }
    },
    [Razorpay]
  );

  const cancelOrder = async (item) => {
    try {
      setCancelLoading(true);
      const res = await orderCancel({
        id: item.id,
      });

      orderListRefetch();
      setCancelLoading(false);
    } catch (error) {
      setCancelLoading(false);

      console.log("error: ", error);
    }

    try {
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <>
      <section className="tp-cart-area ">
        <div className="profile__ticket table-responsive">
       
          {orderList?.length < 0  || orderList?.length == 0&& (
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
                      {`${
                        item?.total?.gross?.currency == "USD" ? "$" : "₹"
                      }${roundOff(item?.total?.gross?.amount)} for  ${
                        item?.lines?.length
                      } item`}
                    </td>
                    {/* <td >
                            <Link
                              href={`/order-details/${item?.id}`}
                              className="tp-btn tp-btn-border"
                            >
                              <span> View</span>
                            </Link>
                          </td> */}
                    <td style={{ display: "flex", gap: 10 }}>
                      {item?.status == "NOT_CHARGET" && (
                        <button
                          type="button"
                          className="order-view-btn"
                          onClick={() => {
                            handlePayment(
                              item?.total?.gross?.amount,
                              item?.total?.gross?.currency,
                              item?.id
                            );
                          }}
                        >
                          Pay
                        </button>
                      )}
                      <button
                        type="button"
                        className="order-view-btn"
                        onClick={() =>
                          router.push(`/order-details/${item?.id}`)
                        }
                      >
                        View
                      </button>
                      {item?.status == "UNCONFIRMED" && (
                        <button
                          type="button"
                          className="order-view-btn"
                          onClick={() => {
                            setIndex(i);
                            cancelOrder(item);
                          }}
                        >
                          {cancelLoading && index == i ? (
                            <>
                              <ButtonLoader />
                            </>
                          ) : (
                            "Cancel"
                          )}
                        </button>
                      )}
                      {item?.invoices?.length > 0 && (
                        <button
                          type="button"
                          className="order-view-btn"
                          onClick={() =>
                            window.open(item?.invoices[0]?.url, "_blank")
                          }
                        >
                          Invoice
                        </button>
                      )}
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
