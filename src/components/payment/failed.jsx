import { useOrderListQuery } from "@/redux/features/productApi";
import moment from "moment";
import React, { useCallback } from "react";
import { checkChannel } from "../../utils/functions";
import { useRouter } from "next/router";
import { usePaymentMutation } from "@/redux/features/productApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import useRazorpay from "react-razorpay";

const Failed = ({ data,orderId }) => {

  const OrderDetails = data?.data?.order?.lines;
  const SubTotal = data?.data?.order?.subtotal.gross.amount;
  const Total = data?.data?.order?.total.gross.amount;
  const OrderNumber = data?.data?.order?.number;
  const OrderDate = moment(data?.data?.order?.updatedAt).format("MMMM D, YYYY");
  const ShippingAmount = data?.data?.order?.shippingMethods[0].price.amount;
  const status = data?.data?.order?.paymentStatus;

  const [Razorpay] = useRazorpay();

  const router = useRouter();

  const [successPayment] = usePaymentMutation();

  const handlePayment = useCallback(
    async (total,orderId) => {
      try {
        console.log("options: ",);

        const options = {
          key: "rzp_test_tEMCtcfElFdYts",
          key_secret: "rRfAuSd9PLwbhIwUlBpTy4Gv",
          amount: Math.round(total * 100),
          // order_id:orderId,
          currency: checkChannel() == "india-channel" ? "INR" : "USD",
          name: "Products",
          description: "",
          image: "https://example.com/your_logo",
          modal: {
            ondismiss: async (res) => {
              // console.log("res: ", res);
              router.push(`/order-failed/${orderId}`);

              // await paymentFailed(orderId);
              // paymentFaildRefetch();
            },
          },
          handler: async (res) => {
            console.log("res: ", res);
            if (res?.razorpay_payment_id) {
              notifySuccess("Payment Successful");

              const data = await successPayment({
                amountAuthorized: Total,
                amountCharged: Total,
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

  return (
    <section className="tp-login-area pb-80 pt-80 p-relative z-index-1 fix">
      <div className="container">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div className="col-lg-7">
            <p style={{ color: "red" }}>Order Failed</p>
            <p style={{ color: "gray" }}>Pay with Razor Pay </p>
            <h3>Order Details</h3>
            <div>
              <table className="table width-100">
                <thead>
                  <tr>
                    <th className="tp-cart-header-quantity">PRODUCT</th>
                    <th className="tp-cart-header-quantity">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {OrderDetails?.map((order) => {
                    return (
                      <tr key={order?.id}>
                        <td>{order?.productName}</td>
                        {checkChannel() === "india-channel" ? (
                          <>
                            <td>&#8377;{order.totalPrice?.gross?.amount}</td>
                          </>
                        ) : (
                          <>
                            <td>${order?.totalPrice?.gross?.amount}</td>
                          </>
                        )}
                      </tr>
                    );
                  })}

                  <tr>
                    <td>Subtotal</td>
                    {checkChannel() === "india-channel" ? (
                      <>
                        <td>&#8377;{SubTotal}</td>
                      </>
                    ) : (
                      <>
                        <td>${SubTotal}</td>
                      </>
                    )}
                  </tr>

                  <tr>
                    <td>Shipping</td>
                    {checkChannel() === "india-channel" ? (
                      <>
                        <td>&#8377;{ShippingAmount}</td>
                      </>
                    ) : (
                      <>
                        <td>${ShippingAmount}</td>
                      </>
                    )}
                  </tr>

                  <tr>
                    <td>Payment Method</td>

                    <td>Razor Pay</td>
                  </tr>
                  <tr>
                    <td>Payment Status</td>

                    <td>{status}</td>
                  </tr>

                  <tr>
                    <td style={{ color: "black", fontWeight: "600" }}>Total</td>
                    {checkChannel() === "india-channel" ? (
                      <>
                        <td style={{ color: "black", fontWeight: "600" }}>
                          &#8377;{Total}
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={{ color: "black", fontWeight: "600" }}>
                          ${Total}
                        </td>
                      </>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-lg-4 ">
            <div
              style={{
                padding: "20px 30px",
                background: "rgb(255 248 236)",
                boxShadow: "3px 3px 5px #f1f1f1",
              }}
            >
              <p style={{ color: "gray", fontSize: "18px", fontWeight: "600" }}>
                Your order has been Failed.
              </p>
              <ul style={{ paddingLeft: "20px", fontSize: "18px" }}>
                <li style={{ paddingBottom: "8px" }}>
                  Order number: <span className="bold">{OrderNumber}</span>
                </li>
                <li style={{ paddingBottom: "8px" }}>
                  Date: <span>{OrderDate}</span>
                </li>
                <li style={{ paddingBottom: "8px" }}>
                  Total:{" "}
                  {checkChannel() === "india-channel" ? (
                    <span style={{ fontWeight: "600", color: "black" }}>
                      &#8377;{Total}
                    </span>
                  ) : (
                    <span style={{ fontWeight: "600", color: "black" }}>
                      ${Total}
                    </span>
                  )}
                </li>
                <li style={{ paddingBottom: "8px" }}>
                  Payment Method: <span>razor Pay</span>
                </li>
              </ul>
            </div>
            <div className="mt-20">
              <button
                onClick={() => handlePayment(Total,orderId)}
                className="tp-cart-update-btn "
                style={{ background: "rgb(194, 136, 43)", color: "white" }}
              >
                Pay Again
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Failed;
