import React, { useCallback, useState } from "react";
import ErrorMsg from "../common/error-msg";
import { useSelector } from "react-redux";
import { useSetState } from "@/utils/functions";
import CheckoutOrderArea from "./checkout-order-area";
import {
  useCheckoutCompleteMutation,
  useCheckoutUpdateMutation,
  useCreateCheckoutTokenMutation,
} from "@/redux/features/card/cardApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import useRazorpay from "react-razorpay";
import { useRouter } from "next/router";
import NiceSelect from "@/ui/nice-select";
import HeaderSearchForm from "../forms/header-search-form";
import { useGetCartListQuery } from "@/redux/features/card/cardApi";
import {
  useCountryListQuery,
  useStateListQuery,
} from "@/redux/features/productApi";

const CheckoutBillingArea = ({ register, errors }) => {
  const { user } = useSelector((state) => state.auth);

  const cart = useSelector((state) => state.cart?.cart_list);

  const { data: list } = useGetCartListQuery();
  console.log("list: ", list);
  const { data: countryList,refetchCountry } = useCountryListQuery();

  const CountryList = countryList?.data?.shop?.countries;


  console.log("CountryList --->", CountryList);

  const [createCheckout, { data: tokens }] = useCreateCheckoutTokenMutation();

  const [createDeliveryUpdate, { data: data }] = useCheckoutUpdateMutation();

  const [checkoutComplete, { data: complete }] = useCheckoutCompleteMutation();

  const [state, setState] = useSetState({
    firstName: "",
    firstName1: "",
    lastName: "",
    lastName1: "",
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    city1: "",
    postalCode: "",
    postalCode1: "",
    phone: "",
    email: "",
    phone1: "",
    email1: "",
    country: "",
    country1: "",
    countryArea: "",
    diffAddress: false,
    errors: {},
    COD: "",
    razorpay: "",
    paymentType: [
      { id: 1, label: "COD", checked: false },
      { id: 2, label: "Razorpay", checked: false },
    ],
    pType: false,
    selectedCountryList: '',
    selectedState: ''
  });


  
  const { data: stateList,refetch } = useStateListQuery({
    code: state.selectedCountryList,
  });
const StateList = stateList?.data?.addressValidationRules?.countryAreaChoices

  console.log("StateList --->", StateList);
  
  const checkedCheckbox = state.paymentType.find(
    (checkbox) => checkbox.checked
  );

  const handleInputChange = (e, fieldName) => {
    setState({ [fieldName]: e.target.value });
  };

  const handleSelectChange = (e, field) => {
    setState({ ...state, [field]: e.target.value });
    refetch()
  };

  const [Razorpay] = useRazorpay();

  const router = useRouter();

  const totalAmount = cart?.reduce(
    (acc, curr) =>
      acc + curr?.variant?.pricing?.price?.gross?.amount * curr?.quantity,
    0
  );

  let lines = [];
  if (cart?.length > 0) {
    lines = cart?.map((item) => {
      return { quantity: 1, variantId: item?.variant?.id };
    });
  }

  const validateInputs = () => {
    const fieldsToValidate = [
      { name: "firstName", label: "First name" },
      { name: "lastName", label: "Last name" },
      { name: "country", label: "Country" },
      { name: "streetAddress1", label: "Street address" },
      { name: "city", label: "City" },
      { name: "postalCode", label: "PostalCode" },
      { name: "phone", label: "Phone" },
      { name: "email", label: "Email" },
    ];

    const errors = {};

    fieldsToValidate.forEach(({ name, label }) => {
      if (!state[name].trim()) {
        errors[name] = `${label} is required`;
      }
    });
    if (!state.COD) {
      errors.paymentType = "Payment type is required";
    }

    if (state.diffAddress) {
      const fieldsToValidate2 = [
        { name: "firstName1", label: "First name" },
        { name: "lastName1", label: "Last name" },
        { name: "country1", label: "Country" },
        { name: "streetAddress2", label: "Street address" },
        { name: "city1", label: "City" },
        { name: "postalCode1", label: "PostalCode" },
        { name: "phone1", label: "Phone" },
        { name: "email1", label: "Email" },
      ];

      fieldsToValidate2.forEach(({ name, label }) => {
        if (!state[name].trim()) {
          errors[name] = `${label} is required`;
        }
      });
    }

    return errors;
  };

  const handleSubmit = async (data) => {
    try {
      const errors = validateInputs();

      const sample = {
        channel: "india-channel",
        email: state.email,
        lines,
        firstName: state.firstName,
        lastName: state.lastName,
        streetAddress1: state.streetAddress1,
        city: state.city,
        postalCode: state.postalCode,
        country: "IN",
        countryArea: "Tamil Nadu",
        firstName1: state.diffAddress ? state.firstName1 : state.firstName,
        lastName1: state.diffAddress ? state.lastName1 : state.lastName,
        streetAddress2: state.diffAddress
          ? state.streetAddress2
          : state.streetAddress1,
        city1: state.diffAddress ? state.city1 : state.city,
        postalCode1: state.diffAddress ? state.postalCode1 : state.postalCode,
        country1: "IN",
        countryArea1: "Tamil Nadu",
      };

      if (Object.keys(errors).length === 0) {
        const createCheckoutResponse = await createCheckout({
          channel: "india-channel",
          email: state.email,
          lines,
          firstName: state.firstName,
          lastName: state.lastName,
          streetAddress1: state.streetAddress1,
          city: state.city,
          postalCode: state.postalCode,
          country: "IN",
          countryArea: "Tamil Nadu",
          firstName1: state.diffAddress ? state.firstName1 : state.firstName,
          lastName1: state.diffAddress ? state.lastName1 : state.lastName,
          streetAddress2: state.diffAddress
            ? state.streetAddress2
            : state.streetAddress1,
          city1: state.diffAddress ? state.city1 : state.city,
          postalCode1: state.diffAddress ? state.postalCode1 : state.postalCode,
          country1: "IN",
          countryArea1: "Tamil Nadu",
        });
        if (
          createCheckoutResponse?.data?.data?.checkoutCreate?.errors?.length > 0
        ) {
          notifyError(
            `${createCheckoutResponse?.data?.data?.checkoutCreate?.errors[0]?.code} ${createCheckoutResponse?.data?.data?.checkoutCreate?.errors[0]?.field}`
          );
          return;
        }

        const checkoutId =
          createCheckoutResponse?.data?.data?.checkoutCreate?.checkout?.id;
        const amount =
          createCheckoutResponse?.data?.data?.checkoutCreate?.checkout
            ?.totalPrice?.gross?.amount;
        if (checkoutId) {
          await createDeliveryUpdate({
            id: checkoutId,
          });

          const paymentType = state.paymentType.find(
            (checkbox) => checkbox.checked
          );
          // if (!state.pType) {
          //   notifyError("COD");
          // } else {
          handlePayment(checkoutId, amount);
          // }
        }
      } else {
        console.log("Form contains errors!");
      }
      setState({ errors: errors });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePayment = useCallback(
    async (checkoutId, amount) => {
      const options = {
        key: "rzp_test_tEMCtcfElFdYts",
        key_secret: "rRfAuSd9PLwbhIwUlBpTy4Gv",
        amount: parseInt(totalAmount) * 100,
        currency: "INR",
        name: state.firstName + " " + state.lastName,
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        // order_id: "ORD20156712",
        handler: async (res) => {
          notifySuccess("Payment Successful");
          const completeResponse = await checkoutComplete({ id: checkoutId });
          console.log(
            "completeResponse: ",
            completeResponse.data.data.checkoutComplete.order.id
          );
          localStorage.setItem(
            "orderId",
            completeResponse.data.data.checkoutComplete.order.id
          );
          router.push("/myOrders");
          setState({
            firstName: "",
            firstName1: "",
            lastName: "",
            lastName1: "",
            streetAddress1: "",
            streetAddress2: "",
            city: "",
            city1: "",
            postalCode: "",
            postalCode1: "",
            phone: "",
            email: "",
            phone1: "",
            email1: "",
            country: "",
            country1: "",
            countryArea: "",
            diffAddress: false,
            errors: {},
          });
        },
        prefill: {
          name: state.firstName,
          email: state.email,
          contact: state.phone,
        },
        notes: {
          address: state.streetAddress1,
        },
        theme: {
          color: "#3399cc",
        },
        // retry: {
        //   enabled: true,
        //   max_count: true,
        // },
      };

      const rzpay = new Razorpay(options);
      rzpay.open();
    },
    [Razorpay]
  );

  const handleCheckboxChange = (id) => {
    const updatedCheckboxes = state.paymentType.map((checkbox) =>
      checkbox.id === id
        ? { ...checkbox, checked: true }
        : { ...checkbox, checked: false }
    );
    setState({ paymentType: updatedCheckboxes, pType: true });
  };

// const handleSelectChange = (e) => {
//   setState({ selectedCountryList: e.target.value });
// }
// console.log("selectedCountryList",state.selectedCountryList)

  return (
    <div className="row">
      <div className="col-lg-7">
        <div className="tp-checkout-bill-area">
          <h3 className="tp-checkout-bill-title">Billing Details</h3>

          <div className="tp-checkout-bill-form">
            <div className="tp-checkout-bill-inner">
              <div className="row">
                <div className="col-md-6">
                  <div className="tp-checkout-input">
                    <label>
                      First Name <span>*</span>
                    </label>
                    <input
                      name="firstName"
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                      value={state.firstName}
                      onChange={(e) => handleInputChange(e, "firstName")}

                      // defaultValue={user?.firstName}
                    />
                    {state.errors.firstName && (
                      <ErrorMsg msg={state.errors.firstName} />
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="tp-checkout-input">
                    <label>
                      Last Name <span>*</span>
                    </label>
                    <input
                      name="lastName"
                      id="lastName"
                      type="text"
                      value={state.lastName}
                      placeholder="Last Name"
                      onChange={(e) => handleInputChange(e, "lastName")}
                    />
                    {state.errors.lastName && (
                      <ErrorMsg msg={state.errors.lastName} />
                    )}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="tp-checkout-input">
                    <label>
                      Country <span>*</span>
                    </label>
                    <input
                      name="country"
                      id="country"
                      type="text"
                      value={state.country}
                      placeholder="United States (US)"
                      onChange={(e) => handleInputChange(e, "country")}
                    />
                    {state.errors.country && (
                      <ErrorMsg msg={state.errors.country} />
                    )}
                  </div>
                </div>
               
                <div className="col-md-6">
        <div className="tp-checkout-input">
          <label htmlFor="country">Country <span>*</span></label>
          <select
            name="country"
            id="country"
            value={state.selectedCountryList}
            className="nice-select w-100"
            onChange={(e) => handleSelectChange(e, "selectedCountryList")}
          >
            <option value="">Select Country</option>
            {CountryList?.map((item) => (
              <option key={item.code} value={item.code}>
                {item.country}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="col-md-6">
        <div className="tp-checkout-input">
          <label htmlFor="state">State <span>*</span></label>
          <select
            name="state"
            id="state"
            value={state.selectedState}
            className="nice-select w-100"
            onChange={(e) => handleSelectChange(e, "selectedState")}
          >
            <option value="">Select State</option>
            {StateList?.map((item) => (
              <option key={item.raw} value={item.raw}>
                {item.raw}
              </option>
            ))}
          </select>
        </div>
      </div>
                {/* <div className="col-md-12">
                  <div className="tp-checkout-input">
                  <label>
                      Country <span>*</span>
                    </label>
                    <select
                      name="address"
                      id="address"
                      value={state.streetAddress1}
                      onChange={(e) => handleInputChange(e, "streetAddress1")}
                    >
                      <option value="">Select an address</option>
                      <option value="address1">Address 1</option>
                      <option value="address2">Address 2</option>
                    </select>
                    {state.errors.streetAddress1 && (
                      <ErrorMsg msg={state.errors.streetAddress1} />
                    )}
                  </div>
                </div> */}

                <div className="col-md-12">
                  <div className="tp-checkout-input">
                    <label>Street address</label>
                    <input
                      name="address"
                      id="address"
                      type="text"
                      placeholder="House number and street name"
                      value={state.streetAddress1}
                      onChange={(e) => handleInputChange(e, "streetAddress1")}
                    />
                    {state.errors.streetAddress1 && (
                      <ErrorMsg msg={state.errors.streetAddress1} />
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="tp-checkout-input">
                    <label>Town / City</label>
                    <input
                      name="city"
                      id="city"
                      type="text"
                      placeholder="City"
                      value={state.city}
                      onChange={(e) => handleInputChange(e, "city")}
                    />
                    {state.errors.city && <ErrorMsg msg={state.errors.city} />}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="tp-checkout-input">
                    <label>Postcode ZIP</label>
                    <input
                      name="zipCode"
                      id="zipCode"
                      type="text"
                      placeholder="Postcode ZIP"
                      value={state.postalCode}
                      onChange={(e) => handleInputChange(e, "postalCode")}
                    />
                    {state.errors.postalCode && (
                      <ErrorMsg msg={state.errors.postalCode} />
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="tp-checkout-input">
                    <label>
                      Phone <span>*</span>
                    </label>
                    <input
                      name="contactNo"
                      id="contactNo"
                      type="text"
                      placeholder="Phone"
                      value={state.phone}
                      onChange={(e) => handleInputChange(e, "phone")}
                    />
                    {state.errors.phone && (
                      <ErrorMsg msg={state.errors.phone} />
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="tp-checkout-input">
                    <label>
                      Email address <span>*</span>
                    </label>
                    <input
                      name="email"
                      id="email"
                      type="email"
                      placeholder="Email"
                      value={state.email}
                      onChange={(e) => handleInputChange(e, "email")}

                      // defaultValue={user?.email}
                    />
                    {state.errors.email && (
                      <ErrorMsg msg={state.errors.email} />
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="tp-checkout-input">
                    <label>Order notes (optional)</label>
                    <textarea
                      name="orderNote"
                      id="orderNote"
                      placeholder="Notes about your order, e.g. special notes for delivery."
                      value={state.notes}
                      onChange={(e) => handleInputChange(e, "notes")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tp-login-remeber">
            <input
              id="remeber"
              type="checkbox"
              checked={state.diffAddress}
              onChange={(e) => setState({ diffAddress: e.target.checked })}
            />
            <label htmlFor="remeber">Ship to a different address?</label>
          </div>
          {state.diffAddress && (
            <div className="tp-checkout-bill-form">
              <div className="tp-checkout-bill-inner">
                <div className="row">
                  <div className="col-md-6">
                    <div className="tp-checkout-input">
                      <label>
                        First Name <span>*</span>
                      </label>
                      <input
                        name="firstName"
                        id="firstName1"
                        type="text"
                        placeholder="First Name"
                        value={state.firstName1}
                        onChange={(e) => handleInputChange(e, "firstName1")}

                        // defaultValue={user?.firstName}
                      />
                      {state.errors.firstName1 && (
                        <ErrorMsg msg={state.errors.firstName1} />
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="tp-checkout-input">
                      <label>
                        Last Name <span>*</span>
                      </label>
                      <input
                        name="lastName"
                        id="lastName1"
                        type="text"
                        value={state.lastName1}
                        placeholder="Last Name"
                        onChange={(e) => handleInputChange(e, "lastName1")}
                      />
                      {state.errors.lastName1 && (
                        <ErrorMsg msg={state.errors.lastName1} />
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="tp-checkout-input">
                      <label>
                        Country <span>*</span>
                      </label>
                      <input
                        name="country"
                        id="country1"
                        type="text"
                        value={state.country1}
                        placeholder="United States (US)"
                        onChange={(e) => handleInputChange(e, "country1")}
                      />
                      {state.errors.country1 && (
                        <ErrorMsg msg={state.errors.country1} />
                      )}
                    </div>
                  </div>




                  <div className="col-md-12">
                    <div className="tp-checkout-input">
                      <label>Street address</label>
                      <input
                        name="address"
                        id="address1"
                        type="text"
                        placeholder="House number and street name"
                        value={state.streetAddress2}
                        onChange={(e) => handleInputChange(e, "streetAddress2")}
                      />
                      {state.errors.streetAddress2 && (
                        <ErrorMsg msg={state.errors.streetAddress2} />
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="tp-checkout-input">
                      <label>Town / City</label>
                      <input
                        name="city1"
                        id="city1"
                        type="text"
                        placeholder="City"
                        value={state.city1}
                        onChange={(e) => handleInputChange(e, "city1")}
                      />
                      {state.errors.city1 && (
                        <ErrorMsg msg={state.errors.city1} />
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="tp-checkout-input">
                      <label>Postcode ZIP</label>
                      <input
                        name="zipCode"
                        id="zipCode"
                        type="text"
                        placeholder="Postcode ZIP"
                        value={state.postalCode1}
                        onChange={(e) => handleInputChange(e, "postalCode1")}
                      />
                      {state.errors.postalCode1 && (
                        <ErrorMsg msg={state.errors.postalCode1} />
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="tp-checkout-input">
                      <label>
                        Phone <span>*</span>
                      </label>
                      <input
                        name="contactNo"
                        id="contactNo"
                        type="text"
                        placeholder="Phone"
                        value={state.phone1}
                        onChange={(e) => handleInputChange(e, "phone1")}
                      />
                      {state.errors.phone1 && (
                        <ErrorMsg msg={state.errors.phone1} />
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="tp-checkout-input">
                      <label>
                        Email address <span>*</span>
                      </label>
                      <input
                        name="email"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={state.email1}
                        onChange={(e) => handleInputChange(e, "email1")}

                        // defaultValue={user?.email}
                      />
                      {state.errors.email1 && (
                        <ErrorMsg msg={state.errors.email1} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="col-lg-5">
        <div className="tp-checkout-place white-bg">
          <h3 className="tp-checkout-place-title">Your Order</h3>

          <div className="tp-order-info-list">
            <ul>
              {/*  header */}
              <li className="tp-order-info-list-header">
                <h4>Product</h4>
                <h4>Total</h4>
              </li>

              {/*  item list */}
              {cart?.map((item) => (
                <li key={item._id} className="tp-order-info-list-desc">
                  <p className="para">
                    {item?.variant?.product?.name}{" "}
                    <span> x {item?.quantity}</span>
                  </p>
                  <span>
                    &#8377;
                    {item?.variant?.pricing?.price?.gross?.amount.toFixed(2) *
                      item?.quantity}
                  </span>
                </li>
              ))}

              {/*  shipping */}
              {/* <li className="tp-order-info-list-shipping">
            <span>Shipping</span>
            <div className="tp-order-info-list-shipping-item d-flex flex-column align-items-end">
              <span>
                <input
                  {...register(`shippingOption`, {
                    required: `Shipping Option is required!`,
                  })}
                  id="flat_shipping"
                  type="radio"
                  name="shippingOption"
                />
                <label
                  onClick={() => handleShippingCost(60)}
                  htmlFor="flat_shipping"
                >
                  Delivery: Today Cost :<span>&#8377;60.00</span>
                </label>
                <ErrorMsg msg={errors?.shippingOption?.message} />
              </span>
              <span>
                <input
                  {...register(`shippingOption`, {
                    required: `Shipping Option is required!`,
                  })}
                  id="flat_rate"
                  type="radio"
                  name="shippingOption"
                />
                <label
                  onClick={() => handleShippingCost(20)}
                  htmlFor="flat_rate"
                >
                  Delivery: 7 Days Cost: <span>&#8377;20.00</span>
                </label>
                <ErrorMsg msg={errors?.shippingOption?.message} />
              </span>
            </div>
          </li> */}

              {/*  subtotal */}
              {/* <li className="tp-order-info-list-subtotal">
            <span>Subtotal</span>
            <span>&#8377;{totalAmount?.toFixed(2)}</span>
          </li> */}

              {/*  shipping cost */}
              {/* <li className="tp-order-info-list-subtotal">
            <span>Shipping Cost</span>
            <span>&#8377;{shippingCost.toFixed(2)}</span>
          </li> */}

              {/* discount */}
              {/* <li className="tp-order-info-list-subtotal">
            <span>Discount</span>
            <span>&#8377;{discountAmount.toFixed(2)}</span>
          </li> */}

              {/* total */}

              <li className="tp-order-info-list-total">
                <span>Total</span>

                <span>
                  &#8377; {totalAmount.toFixed(2)}
                  {/* {totalAmount.toString() === "0"
                    ? shippingCost.toFixed(2)
                    : parseFloat(cartTotals).toFixed(2)} */}
                </span>

                {/* <span>${totalAmount?.toFixed(2) == 0?shippingCost.toFixed(2):parseFloat(cartTotals).toFixed(2)}</span> */}
              </li>
              <li>
                <div className="tp-login-remeber">
                  <input
                    id="cash"
                    type="checkbox"
                    checked={state.COD}
                    onChange={(e) =>
                      setState({ COD: e.target.checked, pType: true })
                    }
                  />
                  <label htmlFor="cash" style={{ color: "black" }}>
                    Razorpay
                  </label>
                </div>
              </li>
              {state.errors.paymentType && (
                <ErrorMsg msg={state.errors.paymentType} />
              )}
              {/* {state.paymentType.map((checkbox) => {
                return (
                  <li>
                    <div key={checkbox.id} className="">
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={checkbox.checked}
                          onChange={() => handleCheckboxChange(checkbox.id)}
                          style={{
                            width: "20px",
                            height: "20px",
                            border: "2px solid #ccc",
                            borderRadius: "4px",
                            marginRight: "10px",
                            display: "inline-block",
                            backgroundColor: "orange",
                          }}
                        />
                        {checkbox.label}
                      </label>
                    </div>
                  </li>
                );
              })}
              {state.errors.paymentType && (
                <ErrorMsg msg={state.errors.paymentType} />
              )} */}
            </ul>
          </div>
          {/* <div className="tp-checkout-payment">
        <div className="tp-checkout-payment-item">
          <input
            {...register(`payment`, {
              required: `Payment Option is required!`,
            })}
            type="radio"
            id="back_transfer"
            name="payment"
            value="Card"
          />
          <label
            onClick={() => setShowCard(true)}
            htmlFor="back_transfer"
            data-bs-toggle="direct-bank-transfer"
          >
            Credit Card
          </label>
          {showCard && (
            <div className="direct-bank-transfer">
              <div className="payment_card">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />
              </div>
            </div>
          )}
          <ErrorMsg msg={errors?.payment?.message} />
        </div>
        <div className="tp-checkout-payment-item">
          <input
            {...register(`payment`, {
              required: `Payment Option is required!`,
            })}
            onClick={() => setShowCard(false)}
            type="radio"
            id="cod"
            name="payment"
            value="COD"
          />
          <label htmlFor="cod">Cash on Delivery</label>
          <ErrorMsg msg={errors?.payment?.message} />
        </div>
      </div> */}

          <div>
            <p style={{ color: "black", paddingTop: "20px" }}>
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our <b>privacy policy</b>.
            </p>
          </div>

          <div className="tp-checkout-btn-wrapper pt-20">
            <button
              type="submit"
              // disabled={!stripe || isCheckoutSubmit}
              className="tp-checkout-btn w-100"
              onClick={() => handleSubmit()}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutBillingArea;
