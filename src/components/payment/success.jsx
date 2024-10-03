import { useOrderListQuery } from "@/redux/features/productApi";
import moment from "moment";
import React from "react";
import {
  addCommasToNumber,
  checkChannel,
  roundOff,
} from "../../utils/functions";
import { useRouter } from "next/router";
import Link from "next/link";

const Success = ({ data }) => {
  const router = useRouter();

  const OrderDetails = data?.data?.order?.lines;
  const SubTotal = data?.data?.order?.subtotal.gross.amount;
  const Total = data?.data?.order?.total.gross.amount;
  const Tax = data?.data?.order?.total?.tax;
  const OrderNumber = data?.data?.order?.number;
  const OrderDate = moment(data?.data?.order?.updatedAt).format("MMMM D, YYYY");
  const ShippingAmount = data?.data?.order?.shippingPrice?.gross.amount;
  const giftWrap = data?.data?.order?.isGiftWrap;
  const paymentMethod = data?.data?.order?.paymentMethod?.name;
  const GiftCard = data?.data?.order?.giftCards;
  const codAmount = data?.data?.order?.codAmount;
  const giftWrapAmount = data?.data?.order?.giftWrapAmount;

  return (
    <section className="tp-login-area pb-80 pt-80 p-relative z-index-1 fix">
      <div className="container">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div className="col-lg-5">
            {/* {paymentMethod != "Cash On delivery" && */}
            <p style={{ color: "gray" }}>
              Pay with{" "}
              {paymentMethod == "Cash On delivery"
                ? "Cash On Delivery"
                : paymentMethod}{" "}
            </p>
            {/* } */}
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
                            <td>
                              &#8377;
                              {addCommasToNumber(
                                order.totalPrice?.gross?.amount
                              )}
                            </td>
                          </>
                        ) : (
                          <>
                            <td>
                              $
                              {addCommasToNumber(
                                order.totalPrice?.gross?.amount
                              )}
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  })}

                  <tr>
                    <td>Subtotal</td>
                    {checkChannel() === "india-channel" ? (
                      <>
                        <td>&#8377;{addCommasToNumber(SubTotal)}</td>
                      </>
                    ) : (
                      <>
                        <td>${addCommasToNumber(SubTotal)}</td>
                      </>
                    )}
                  </tr>

                  <tr>
                    <td>
                      {paymentMethod == "Cash On delivery"
                        ? "COD Fee"
                        : "Shipping"}
                    </td>

                    {checkChannel() === "india-channel" ? (
                      <>
                        <td>
                          {codAmount === 0
                            ? `₹${addCommasToNumber(ShippingAmount)}` // Using ₹ for INR
                            : `₹${addCommasToNumber(codAmount)}`}
                        </td>
                      </>
                    ) : (
                      <>
                        <td>
                          {codAmount === 0
                            ? `$${addCommasToNumber(ShippingAmount)}`
                            : `$${addCommasToNumber(codAmount)}`}
                        </td>
                      </>
                    )}
                  </tr>

                  {giftWrap && (
                    <tr>
                      <td>Gift Wrap</td>

                      <td>
                        {checkChannel() === "india-channel" ? "₹" : "$"}
                        {giftWrapAmount}
                      </td>
                    </tr>
                  )}

                  {GiftCard && GiftCard.length > 0 && (
                    <tr>
                      <td>Coupon</td>
                      <td>
                        {GiftCard[0]?.initialBalance?.currency == "USD"
                          ? "$"
                          : "₹"}
                        {GiftCard[0]?.initialBalance?.amount}
                      </td>
                    </tr>
                  )}

                  <tr>
                    <td>Payment Method</td>
                    <td>
                      {paymentMethod == "Cash On delivery"
                        ? "Cash On Delivery"
                        : paymentMethod}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "black", fontWeight: "600" }}>Total</td>
                    {checkChannel() === "india-channel" ? (
                      <>
                        <td style={{ color: "black", fontWeight: "600" }}>
                          &#8377;{addCommasToNumber(Total)}
                          <div
                            style={{ fontSize: "15px", fontWeight: "normal" }}
                          >
                            (includes {Tax?.currency == "USD" ? "$" : "₹"}
                            {roundOff(Tax?.amount)} GST)
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={{ color: "black", fontWeight: "600" }}>
                          ${addCommasToNumber(Total)}
                          <div
                            style={{ fontSize: "15px", fontWeight: "normal" }}
                          >
                            (includes {Tax?.currency == "USD" ? "$" : "₹"}
                            {addCommasToNumber(Tax?.amount)} GST)
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-lg-6 ">
            <div
              style={{
                padding: "20px 30px",
                background: "rgb(255 248 236)",
                boxShadow: "3px 3px 5px #f1f1f1",
              }}
            >
              <p
                style={{
                  color: "gray",
                  fontSize: "26px",
                  fontWeight: "600",
                  color: "green",
                }}
              >
                Thank You!
                <br /> Your order has been received.
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
                      &#8377;{addCommasToNumber(Total)}
                    </span>
                  ) : (
                    <span style={{ fontWeight: "600", color: "black" }}>
                      ${addCommasToNumber(Total)}
                    </span>
                  )}
                </li>
                <li style={{ paddingBottom: "8px" }}>
                  Payment Method:
                  <span>
                    {paymentMethod == "Cash On delivery"
                      ? "Cash On Delivery"
                      : paymentMethod}
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-20">
              <button
                onClick={() => router.push("/shop")}
                className="tp-cart-update-btn "
                style={{ background: "rgb(194, 136, 43)", color: "white" }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Success;
