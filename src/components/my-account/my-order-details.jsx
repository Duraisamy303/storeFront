import { checkChannel, roundOff } from "@/utils/functions";
import moment from "moment/moment";
import React from "react";

const MyOrderDetails = ({ data }) => {
  const Data = data?.data?.order;
  const SubTotal = data?.data?.order?.subtotal.gross;
  const Total = data?.data?.order?.total.gross;
  const Tax = data?.data?.order?.total.tax;
  const ShippingAmount = data?.data?.order?.shippingPrice;
  const GiftCard = data?.data?.order?.giftCards;

  const FormatDate = moment(Data?.created).format("MMMM D, YYYY");
  return (
    <section className="tp-checkout-area pb-50 pt-50">
      <div className="container">
        <p style={{ color: "gray" }}>
          Order #<span style={{ color: "black" }}>{Data?.number}</span> was
          placed on <span style={{ color: "black" }}>{FormatDate}</span> and is
          currently{" "}
          <span style={{ color: "black" }}>{Data?.statusDisplay}</span>.
        </p>
        <div className="pb-20 pt-20">
          <h3 style={{ fontWeight: "300" }}>ORDER UPDATES</h3>
          <p style={{ color: "gray", marginBottom: "5px" }}>
            Monday 22nd of April 2024, 03:38pm
          </p>
          {/* <p style={{ color: "gray" }}>hi mam</p> */}
        </div>
        <h3 style={{ fontWeight: "300" }}>ORDER DETAILS</h3>
        <div className="responsive-table">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">PRODUCT</th>
                <th scope="col">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {Data?.lines.map((item, i) => (
                <tr key={i}>
                  <td scope="row">
                    {item.productName} ({item?.quantity})
                  </td>

                  <td>
                    {item?.totalPrice?.gross?.currency === "USD" ? "$" : "₹"}
                    {roundOff(item?.totalPrice?.gross?.amount)}
                  </td>
                </tr>
              ))}

              <tr>
                <td>Subtotal</td>

                <td>
                  {SubTotal?.currency == "USD" ? "$" : "₹"}
                  {roundOff(SubTotal?.amount)}
                </td>
              </tr>

              <tr>
                <td>Shipping</td>

                <td>
                  {ShippingAmount?.gross?.currency == "USD" ? "$" : "₹"}
                  {roundOff(ShippingAmount?.gross?.amount)}
                </td>
              </tr>
              {
                GiftCard && GiftCard.length > 0 && (
                  <tr>
                  <td>
                    Gift Card
                  </td>
                  <td>{GiftCard[0]?.initialBalance?.currency == "USD" ? "$" : "₹"}
                    { GiftCard[0]?.initialBalance?.amount}
                  </td>
                </tr>
                )
              }
             

              <tr>
                <td style={{ fontSize: "20px" }}>TOTAL:</td>

                <td style={{ fontSize: "20px" }}>
                  {Total?.currency == "USD" ? "$" : "₹"}

                  {roundOff(Total?.amount)}
                  <div style={{ fontSize: "15px" }}>
                    (includes {Total?.currency == "USD" ? "$" : "₹"}
                    {roundOff(Tax?.amount)} GST)
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="row pt-50">
          <div className="col-md-6">
            <h4 style={{ fontWeight: "300" }}>BILLING ADDRESS</h4>
            <p style={{ color: "gray", marginBottom: "0px" }}>
              {Data?.billingAddress?.firstName} {Data?.billingAddress?.lastName}
            </p>
            <p style={{ color: "gray", marginBottom: "0px" }}>
              {Data?.billingAddress?.streetAddress1}
            </p>
            <p style={{ color: "gray", marginBottom: "0px" }}>
              {Data?.billingAddress?.city}
            </p>
            <p style={{ color: "gray", marginBottom: "0px" }}>
              {Data?.billingAddress?.country?.country}
            </p>
            <p style={{ color: "gray", marginBottom: "0px" }}>
              {Data?.billingAddress?.postalCode}
            </p>
            <p style={{ color: "gray", marginBottom: "0px" }}>
              {Data?.billingAddress?.phone}
            </p>

            <p></p>
          </div>
          <div className="col-md-6">
            <h4 style={{ fontWeight: "300" }}>SHIPPING ADDRESS</h4>
            <p style={{ color: "gray", marginBottom: "0px" }}>
              {Data?.shippingAddress?.firstName}{" "}
              {Data?.shippingAddress?.lastName}
            </p>
            <p style={{ color: "gray", marginBottom: "0px" }}>
              {Data?.shippingAddress?.streetAddress1}
            </p>
            <p style={{ color: "gray", marginBottom: "0px" }}>
              {Data?.shippingAddress?.city}
            </p>
            <p style={{ color: "gray", marginBottom: "0px" }}>
              {Data?.shippingAddress?.country?.country}
            </p>
            <p style={{ color: "gray", marginBottom: "0px" }}>
              {Data?.shippingAddress?.postalCode}
            </p>
            <p style={{ color: "gray", marginBottom: "0px" }}>
              {Data?.shippingAddress?.phone}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyOrderDetails;
