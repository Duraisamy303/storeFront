import moment from "moment/moment";
import React from "react";

const MyOrderDetails = ({ data }) => {
  console.log("data --->", data);
  const Data = data?.data?.order;
  console.log("✌️Data --->", Data);

  const FormatDate = moment(Data?.created).format("MMMM D, YYYY");
  return (
    <section className="tp-checkout-area pb-50 pt-50">
      <div className="container">
        <p style={{ color: "black" }}>
          Order #{Data?.number} was placed on {FormatDate} and is currently{" "}
          {Data?.statusDisplay}.
        </p>

        <h3>ORDER UPDATES</h3>
        <p style={{ color: "black", marginBottom: "5px" }}>
          Monday 22nd of April 2024, 03:38pm
        </p>
        <p style={{ color: "black" }}>hi mam</p>

        <p>ORDER DETAILS</p>
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
                  <td scope="row">{item.productName} ({item?.quantity})</td>

                  <td>{`${item?.totalPrice?.gross?.amount} `}</td>
                </tr>
              ))}
              <tr>
                <td style={{ fontSize: "20px" }}>TOTAL:</td>
                <td style={{ fontSize: "20px" }}>{Data?.total.gross.amount}</td>
              </tr>
            </tbody>
          </table>
        </div>
<div className="row pt-50">
<div className="col-md-6">
<h4>BILLING ADDRESS</h4>
<p style={{color:"black", marginBottom:"2px"}}>{Data?.billingAddress?.firstName} {Data?.billingAddress?.lastName}</p>
<p style={{color:"black", marginBottom:"2px"}}>{Data?.billingAddress?.streetAddress1}</p>
<p style={{color:"black", marginBottom:"2px"}}>{Data?.billingAddress?.city}</p>
<p style={{color:"black", marginBottom:"2px"}}>{Data?.billingAddress?.country?.country}</p>
<p style={{color:"black", marginBottom:"2px"}}>{Data?.billingAddress?.postalCode}</p>
<p style={{color:"black", marginBottom:"2px"}}>{Data?.billingAddress?.phone}</p>


<p></p>
</div>
<div className="col-md-6">
<h4>SHIPPING ADDRESS</h4>
<p style={{color:"black", marginBottom:"2px"}}>{Data?.shippingAddress?.firstName} {Data?.shippingAddress?.lastName}</p>
<p style={{color:"black", marginBottom:"2px"}}>{Data?.shippingAddress?.streetAddress1}</p>
<p style={{color:"black", marginBottom:"2px"}}>{Data?.shippingAddress?.city}</p>
<p style={{color:"black", marginBottom:"2px"}}>{Data?.shippingAddress?.country?.country}</p>
<p style={{color:"black", marginBottom:"2px"}}>{Data?.shippingAddress?.postalCode}</p>
<p style={{color:"black", marginBottom:"2px"}}>{Data?.shippingAddress?.phone}</p>
</div>
</div>

      </div>
    </section>
  );
};

export default MyOrderDetails;
