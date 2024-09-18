import { addCommasToNumber, checkChannel, roundOff } from "@/utils/functions";
import moment from "moment/moment";
import React from "react";

const MyOrderDetails = ({ data }) => {
  const Data = data?.data?.order;
  const SubTotal = data?.data?.order?.subtotal.gross;
  const Total = data?.data?.order?.total.gross;
  const Tax = data?.data?.order?.total.tax;
  const ShippingAmount = data?.data?.order?.shippingPrice;
  const GiftCard = data?.data?.order?.giftCards;
  const giftWrap = data?.data?.order?.isGiftWrap;
  const paymentMethod = data?.data?.order?.paymentMethod?.name;

  const FormatDate = moment(Data?.created).format("MMMM D, YYYY");
  return (
    <section className="tp-checkout-area pb-50 pt-50">
      <div className="container">
        <p
          style={{
            color: "gray",
            borderBottom: "1px solid #e6e6e6",
            paddingBottom: "10px",
          }}
        >
          Order
          <span style={{ color: "black", fontWeight: "bold" }}>
            {" "}
            #{Data?.number}
          </span>{" "}
          was placed on{" "}
          <span style={{ color: "black", fontWeight: "bold" }}>
            {FormatDate}
          </span>{" "}
          and is currently{" "}
          <span style={{ color: "black", fontWeight: "bold" }}>
            {Data?.statusDisplay}
          </span>
          .
        </p>

        <div className="row pt-20 pb-20">
          <div className="col-lg-6 col-md-6">
            <h3 style={{ fontWeight: "400", fontSize: "18px" }}>
              ORDER UPDATES
            </h3>

            <div className="timeline-container">
              <ul className="timeline">
                {Data?.events?.map((item, i) => (
                  <li key={i} className="timeline-item">
                    <div className="timeline-content">{item.type}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-lg-6 col-md-6">
            <h3 style={{ fontWeight: "400", fontSize: "18px" }}>
              ORDER DETAILS
            </h3>
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
                        {item?.totalPrice?.gross?.currency === "USD"
                          ? "$"
                          : "₹"}
                        {addCommasToNumber(item?.totalPrice?.gross?.amount)}
                      </td>
                    </tr>
                  ))}

                  <tr>
                    <td>Subtotal</td>

                    <td>
                      {SubTotal?.currency == "USD" ? "$" : "₹"}
                      {addCommasToNumber(SubTotal?.amount)}
                    </td>
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
                          &#8377;
                          {paymentMethod == "Cash On delivery" || giftWrap
                            ? Number(
                                roundOff(ShippingAmount?.gross?.amount) - 50
                              ).toFixed(2)
                            : Number(
                                roundOff(ShippingAmount?.gross?.amount)
                              ).toFixed(2)}
                        </td>
                      </>
                    ) : (
                      <>
                        <td>${roundOff(ShippingAmount?.gross?.amount)}</td>
                      </>
                    )}
                  </tr>

                  <tr>
                    <td>Payment Status</td>

                    <td>{Data?.paymentStatus}</td>
                  </tr>

                  <tr>
                    <td>Payment Method</td>

                    <td>{Data?.paymentMethod?.name}</td>
                  </tr>

                  {giftWrap && (
                    <tr>
                      <td>Gift Wrap</td>

                      <td>&#8377;50.00</td>
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
                    <td style={{ fontSize: "20px" }}>TOTAL:</td>

                    <td style={{ fontSize: "20px" }}>
                      {Total?.currency == "USD" ? "$" : "₹"}

                      {addCommasToNumber(Total?.amount)}
                      <div style={{ fontSize: "15px" }}>
                        (includes {Total?.currency == "USD" ? "$" : "₹"}
                        {addCommasToNumber(Tax?.amount)} GST)
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row pt-50">
          <div className="col-md-6">
            <h4 style={{ fontWeight: "400", fontSize: "18px" }}>
              BILLING ADDRESS
            </h4>
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
            <h4 style={{ fontWeight: "400", fontSize: "18px" }}>
              SHIPPING ADDRESS
            </h4>
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
