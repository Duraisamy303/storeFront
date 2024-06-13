import React, { useCallback, useEffect, useState } from "react";
import ErrorMsg from "../common/error-msg";
import { useDispatch, useSelector } from "react-redux";
import { roundOff, useSetState } from "@/utils/functions";
import CheckoutOrderArea from "./checkout-order-area";
import {
  useApplyCoupenCodeMutation,
  useCheckoutCompleteMutation,
  useCheckoutUpdateMutation,
  useCreateCheckoutTokenMutation,
  useGetCheckoutDetailsMutation,
  usePaymentMethodListMutation,
  useSubCatListMutation,
  useUpdateBillingAddressMutation,
  useUpdateDeliveryMethodForCODAndGidtWrapMutation,
  useUpdateGiftWrapMutation,
  usePaymentMethodUpdateMutation,
} from "@/redux/features/card/cardApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import useRazorpay from "react-razorpay";
import { useRouter } from "next/router";
import NiceSelect from "@/ui/nice-select";
import HeaderSearchForm from "../forms/header-search-form";
import {
  useGetCartListQuery,
  useCreateCheckoutIdMutation,
} from "@/redux/features/card/cardApi";
import {
  useCountryListQuery,
  usePaymentFailedQuery,
  usePaymentMutation,
  usePaymentQuery,
  useStateListQuery,
  useUpdateEmailMutation,
} from "@/redux/features/productApi";
import { Filter } from "@/svg";
import {
  useGetCartAllListQuery,
  useGetCheckoutDetailsQuery,
  useUpdateShippingAddressMutation,
} from "../../redux/features/card/cardApi";
import { checkChannel, validLoginAndReg } from "../../utils/functions";
import { useRegisterUserMutation } from "@/redux/features/auth/authApi";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import CheckoutLogin from "./checkout-login";
import Link from "next/link";
import { cart_list } from "@/redux/features/cartSlice";
import ButtonLoader from "../loader/button-loader";
import { pincode } from "@/utils/constant";

const CheckoutBillingArea = ({ register, errors }) => {
  const { user } = useSelector((state) => state.auth);

  const cart = useSelector((state) => state.cart?.cart_list);

  const { data: countryList, refetchCountry } = useCountryListQuery();
  const { data: cartList } = useGetCartListQuery();

  const dispatch = useDispatch();

  const CountryList = countryList?.data?.shop?.countries;

  const [createCheckout, { data: tokens }] = useCreateCheckoutTokenMutation();

  const [createDeliveryUpdate, { data: data }] = useCheckoutUpdateMutation();

  const [checkoutComplete, { data: complete }] = useCheckoutCompleteMutation();

  const [updateBillingAddress] = useUpdateBillingAddressMutation();

  const [checkoutShippingAddressUpdate] = useUpdateShippingAddressMutation();

  const [emailUpdate] = useUpdateEmailMutation();

  const [updateGiftWrap] = useUpdateGiftWrapMutation();

  const [paymentMethodUpdate] = usePaymentMethodUpdateMutation();

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
    phone1: "",
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
    companyName: "",
    paymentType: [],
    pType: false,
    selectedCountry: "",
    selectedState: "",
    selectedCountry1: "",
    selectedState1: "",
    companyName1: "",
    stateList: [],
    coupenCode: "",
    orderData: [],
    channel: "",
    createAccount: false,
    loginLastName: "",
    loginFirstName: "",
    password: "",
    confirmPassword: "",
    loginEmail: "",
    isAgree: false,
    razorpayId: "",
    checkoutData: {},
    total: "",
    tax: "",
    shippingCost: "",
    promoCode: "",
    token: "",
    isOpen: false,
    giftCard: [],
    promoCodeError: "",
    orderLoading: false,
    selectedPaymentType: "",
    coupenLoader: false,
    checkedGiftwrap: false,
    isGiftWrap: false,
    preOrderMsg: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    setState({ token });
  }, []);

  const { data: stateList, refetch: stateRefetch } = useStateListQuery({
    code: state.selectedCountry,
  });

  const [successPayment] = usePaymentMutation();

  const { data: linelist } = useGetCartListQuery();

  const [loginUser, {}] = useLoginUserMutation();

  const [registerUser, {}] = useRegisterUserMutation();

  const [createCheckoutId] = useCreateCheckoutIdMutation();

  const [updateDeliveryMethod] = useCheckoutUpdateMutation();

  const [updateDeliveryMethodCODAndGiftWrap] =
    useUpdateDeliveryMethodForCODAndGidtWrapMutation();

  const [applyCoupenCode] = useApplyCoupenCodeMutation();

  const [paymentMethodList] = usePaymentMethodListMutation();

  const handleInputChange = (e, fieldName) => {
    setState({ [fieldName]: e.target.value });
  };

  useEffect(() => {
    if (stateList?.data?.addressValidationRules?.countryAreaChoices) {
      setState({
        stateList: stateList?.data?.addressValidationRules?.countryAreaChoices,
      });
    }
  }, [stateList]);

  useEffect(() => {
    orderData();
  }, [linelist]);

  const orderData = async () => {
    try {
      if (linelist?.data?.checkout) {
        const orderData = linelist?.data?.checkout;
        setState({ orderData });
        createCheckoutIds(orderData?.lines);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const createCheckoutIds = async (lines) => {
    try {
      const update = lines?.map((item) => ({
        quantity: item.quantity,
        variantId: item?.variant?.id,
      }));
      const data = await createCheckoutId({
        lines: update,
      });
      if (data?.data?.data?.checkoutCreate?.errors?.length > 0) {
        notifyError(data?.data?.data?.checkoutCreate?.errors[0]?.message);
      } else {
        const checkoutId = data?.data?.data?.checkoutCreate?.checkout?.id;
        localStorage.setItem("checkoutId", checkoutId);
        const total =
          data?.data?.data?.checkoutCreate?.checkout?.totalPrice?.gross?.amount;
        const tax =
          data?.data?.data?.checkoutCreate?.checkout?.totalPrice?.tax?.amount;
        setState({ total, tax });
        // verifyCoupenCode(checkoutId);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const [Razorpay] = useRazorpay();

  const router = useRouter();

  let lines = [];
  if (cart?.length > 0) {
    lines = cart?.map((item) => {
      return { quantity: 1, variantId: item?.variant?.id };
    });
  }

  useEffect(() => {
    const channels = checkChannel();
    setState({ channel: channels });
  }, []);

  useEffect(() => {
    enableCOD();
  }, [
    // state.total,
    state.orderData,
    state.selectedCountry1,
    state.selectedCountry,
    state.diffAddress,
    state.postalCode1,
    state.postalCode,
  ]);

  useEffect(() => {
    enableGiftWrap();
  }, [
    state.selectedCountry1,
    state.selectedCountry,
    state.diffAddress,
    state.total,
  ]);

  // useEffect(() => {
  //   const hasPreOrders = state.orderData?.lines?.some((line) =>
  //     line?.variant?.product?.collections?.some(
  //       (collection) => collection.name === "Pre Orders"
  //     )
  //   );

  //   const hasGiftCard = state.orderData?.lines?.some(
  //     (line) => line?.variant?.product?.category.name === "Gift Card"
  //   );

  //   if (hasPreOrders) {
  //     setState({ preOrderMsg: true });
  //   }
  //   if (hasGiftCard) {
  //     setState({ preOrderMsg: true });
  //   }
  // }, [
  //   state.orderData,
  //   state.selectedCountry1,
  //   state.selectedCountry,
  //   state.diffAddress,
  //   state.postalCode1,
  //   state.postalCode,
  // ]);

  const enableCOD = async () => {
    try {
      // const res = await paymentMethodList();
      // const resArr = res?.data?.data?.paymentGateways?.edges?.map((item) => ({
      //   id: item?.node?.id,
      //   name: item?.node?.name,
      //   checked: false,
      // }));

      let isShowCOD = false;

      // const arr1 = resArr?.reverse();
      // const filter = resArr?.filter((item) => item?.name != "Cash On delivery");
      // filter[0].checked = false;
      // const arr = filter;

      const arr1 = [
        { id: 1, name: "Razorpay", checked: false },
        { id: 2, name: "Cash On delivery", checked: false },
      ];

      const arr = [{ id: 1, name: "Razorpay", checked: false }];

      console.log("state.orderData.: ", state.orderData);

      const hasPreOrders = state.orderData?.lines?.some((line) =>
        line?.variant?.product?.collections?.some(
          (collection) => collection.name === "Pre Orders"
        )
      );

      const hasGiftCard = state.orderData?.lines?.some(
        (line) => line?.variant?.product?.category.name === "Gift Card"
      );

      if (
        state.total > 3000 &&
        state.total < 30000 &&
        !hasPreOrders &&
        !hasGiftCard
      ) {
        if (state.diffAddress) {
          if (state.selectedCountry1 == "IN") {
            if (pincode.includes(Number(state.postalCode1))) {
              isShowCOD = true;
            }
          }
        } else {
          if (state.selectedCountry == "IN") {
            if (pincode.includes(Number(state.postalCode))) {
              isShowCOD = true;
            }
          }
        }
      }

      if (isShowCOD) {
        setState({
          paymentType: arr1,
        });
      } else {
        setState({
          paymentType: arr,
        });
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const enableGiftWrap = async () => {
    try {
      let isGiftWrap = false;
      if (state.diffAddress) {
        if (state.selectedCountry1 == "IN") {
          isGiftWrap = true;
        }
      } else {
        if (state.selectedCountry == "IN") {
          isGiftWrap = true;
        }
      }
      setState({
        isGiftWrap,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const checkoutGiftWrapUpdate = async (isgiftwrap) => {
    try {
      const checkoutId = localStorage.getItem("checkoutId");
      const res = await updateGiftWrap({
        checkoutId,
        isgiftwrap,
      });
    } catch (error) {
      // notifyError(error);
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (data) => {
    try {
      const errors = validateInputs();
      if (Object.keys(errors).length === 0) {
        if (state.createAccount) {
          await createAccount();
        } else {
          await commonFunction();
        }
      }
    } catch (error) {
      notifyError(error);
      setState({ orderLoading: false });
      console.error("Error:", error);
    }
  };

  const commonFunction = async () => {
    try {
      setState({ orderLoading: true });
      const sample = {
        // email: state.email,
        firstName: state.firstName,
        lastName: state.lastName,
        streetAddress1: state.streetAddress1,
        city: state.city,
        streetAddress2: state.streetAddress1,
        cityArea: "",
        companyName: state.companyName,
        country: state.selectedCountry,
        countryArea: state.selectedState,
        phone: state.phone,
        postalCode: state.postalCode,
      };

      let shippingAddress = {};
      if (state.diffAddress) {
        shippingAddress = {
          // email: state.email,
          firstName: state.firstName1,
          lastName: state.lastName1,
          streetAddress1: state.streetAddress2,
          city: state.city1,
          streetAddress2: state.streetAddress2,
          cityArea: "",
          companyName: state.companyName1,
          country: state.selectedCountry1,
          countryArea: state.selectedState1,
          phone: state.phone1,
          postalCode: state.postalCode1,
        };
      } else {
        shippingAddress = sample;
      }

      const checkoutId = localStorage.getItem("checkoutId");
      if (checkoutId) {
        const res = await updateBillingAddress({
          checkoutId,
          billingAddress: sample,
        });

        if (res?.data?.data?.checkoutBillingAddressUpdate?.errors?.length > 0) {
          setState({ orderLoading: false });
          notifyError(
            res?.data?.data?.checkoutBillingAddressUpdate?.errors[0]?.message
          );
        } else {
          const response = await checkoutShippingAddressUpdate({
            checkoutId,
            shippingAddress,
          });

          if (
            response.data?.data?.checkoutShippingAddressUpdate?.errors?.length >
            0
          ) {
            setState({ orderLoading: false });
            notifyError(
              response?.data?.data?.checkoutShippingAddressUpdate?.errors[0]
                ?.message
            );
          } else {
            // ;
            updateEmail(checkoutId);

            // updateDelivertMethod(shippingAddress?.country);
          }
        }
      }
    } catch (error) {
      notifyError(error);
      setState({ orderLoading: false });
      console.log("error: ", error);
    }
  };

  const updateEmail = async (checkoutId) => {
    try {
      const res = await emailUpdate({
        checkoutId,
        email: state.diffAddress ? state.email1 : state.email,
      });
      if (res?.data?.data?.checkoutEmailUpdate?.errors?.length > 0) {
        setState({ orderLoading: false });
        notifyError(res?.data?.data?.checkoutEmailUpdate?.errors[0]?.message);
      } else {
        checkoutCompletes(checkoutId);
        // handlePayment(checkoutId);
      }
    } catch (error) {
      setState({ orderLoading: false });
      console.log("error: ", error);
    }
  };
  const checkoutCompletes = async (checkoutId) => {
    try {
      const completeResponse = await checkoutComplete({ id: checkoutId });
      if (completeResponse?.data?.data?.checkoutComplete?.errors?.length > 0) {
        setState({ orderLoading: false });
        notifyError(
          completeResponse?.data?.data?.checkoutComplete?.errors[0]?.message
        );
      } else {
        const orderId =
          completeResponse?.data?.data?.checkoutComplete?.order?.id;
        const checkedOption = state.paymentType.find(
          (item) => item.checked
        )?.name;
        if (checkedOption == "Cash On delivery") {
          localStorage.removeItem("checkoutTokenUSD");
          localStorage.removeItem("checkoutTokenINR");
          dispatch(cart_list([]));
          router.push(`/order-success/${orderId}`);
        } else {
          handlePayment(orderId, state.total);
        }
        setState({ orderLoading: false });

        localStorage.setItem(
          "orderId",
          completeResponse?.data?.data?.checkoutComplete?.order?.id
        );
        // router.push(
        //   `/payment-success/${completeResponse?.data?.data?.checkoutComplete?.order?.id}`
        // );
      }
    } catch (error) {
      setState({ orderLoading: false });

      console.log("error: ", error);
    }
  };
  const handlePayment = useCallback(
    async (orderId, total) => {
      console.log("orderId: ", orderId);
      try {
        const options = {
          key: "rzp_test_tEMCtcfElFdYts",
          key_secret: "rRfAuSd9PLwbhIwUlBpTy4Gv",
          amount: roundOff(total) * 100,
          // order_id:orderId,
          currency: checkChannel() == "india-channel" ? "INR" : "USD",
          name: state.firstName + " " + state.lastName,
          description: state.notes,
          image: "https://example.com/your_logo",
          modal: {
            ondismiss: async (res) => {
              console.log("ondismiss: ");
              localStorage.removeItem("checkoutTokenUSD");
              localStorage.removeItem("checkoutTokenINR");
              dispatch(cart_list([]));
              router.push(`/order-failed/${orderId}`);

              // await paymentFailed(orderId);
              // paymentFaildRefetch();
            },
          },
          handler: async (res) => {
            if (res?.razorpay_payment_id) {
              notifySuccess("Payment Successful");
              const data = await successPayment({
                amountAuthorized: state.total,
                amountCharged: state.total,
                pspReference: res?.razorpay_payment_id,
              });
              localStorage.removeItem("checkoutTokenUSD");
              localStorage.removeItem("checkoutTokenINR");
              dispatch(cart_list([]));
              router.push(`/order-success/${orderId}`);

              console.log("data: ", data);
            }

            setState((prevState) => ({
              ...prevState,
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
            }));
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
          retry: {
            enabled: false,
            max_count: true,
          },
        };

        const rzpay = new Razorpay(options);
        rzpay.open();
      } catch (error) {
        setState({ orderLoading: false });

        console.log("error: ", error);
      }
    },
    [Razorpay]
  );

  const updateDelivertMethod = async (country) => {
    try {
      const checkoutId = localStorage.getItem("checkoutId");
      if (checkoutId) {
        const res = await updateDeliveryMethod({
          checkoutid: checkoutId,
          country,
        });
        if (res?.data?.data?.checkoutDeliveryMethodUpdate?.errors?.length > 0) {
          notifyError(
            res?.data?.data?.checkoutDeliveryMethodUpdate?.errors[0]?.message
          );
        } else {
          const response =
            res?.data?.data?.checkoutDeliveryMethodUpdate?.checkout;
          const total = response?.totalPrice?.gross?.amount;
          const tax = response?.totalPrice?.tax?.amount;
          const shippingCost = response?.shippingPrice?.gross?.amount;
          console.log("shippingCost: ", shippingCost);
          setState({ shippingCost, tax, total });
          // handlePayment(checkoutId);
        }
      }
    } catch (error) {
      notifyError(error);
      console.log("error: ", error);
    }
  };

  const handleSelectChange = async (e) => {
    console.log("handleSelectChange: ");
    try {
      setState({ selectedCountry: e.target.value, selectedState: "" });
      stateRefetch();

      if (!state.diffAddress) {
        const checkoutId = localStorage.getItem("checkoutId");
        const res = await checkoutShippingAddressUpdate({
          checkoutId,
          shippingAddress: {
            country: e.target.value,
          },
        });
        console.log("res: ", res);
        updateDelivertMethod(e.target.value);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const shippingCoutryChange = async (e) => {
    try {
      setState({
        selectedCountry1: e.target.value,
        selectedState1: "",
      });
      stateRefetch();
      const checkoutId = localStorage.getItem("checkoutId");
      await checkoutShippingAddressUpdate({
        checkoutId,
        shippingAddress: {
          country: e.target.value,
        },
      });
      updateDelivertMethod(e.target.value);
    } catch (e) {
      console.log("e: ", e);
    }
  };
  console.log("state.selectedPaymentType: ", state.selectedPaymentType);

  const validateInputs = () => {
    const fieldsToValidate = [
      { name: "firstName", label: "First name" },
      { name: "lastName", label: "Last name" },
      { name: "selectedCountry", label: "Country" },
      { name: "selectedState", label: "State" },
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
    if (state.selectedPaymentType == "") {
      errors.paymentType = "Payment type is required";
    }

    if (!state.isAgree) {
      errors.isAgree = "Terms and condition is required";
    }

    const regValidate = [
      { name: "loginFirstName", label: "First name" },
      { name: "loginLastName", label: "Last name" },
      { name: "loginEmail", label: "Email" },
      { name: "password", label: "Password" },
    ];
    if (state.createAccount) {
      regValidate.forEach(({ name, label }) => {
        if (!state[name].trim()) {
          errors[name] = `${label} is required`;
        }
      });
    }

    if (state.diffAddress) {
      const fieldsToValidate2 = [
        { name: "firstName1", label: "First name" },
        { name: "lastName1", label: "Last name" },
        { name: "selectedCountry1", label: "Country" },
        { name: "selectedState1", label: "State" },
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
    setState({ errors });
    return errors;
  };

  const createAccount = async () => {
    try {
      const body = {
        firstName: state.loginFirstName,
        lastName: state.loginLastName,
        email: state.loginEmail,
        password: state.password,
      };

      const res = await registerUser(body);
      if (res?.data?.data?.accountRegister?.errors?.length > 0) {
        notifyError("User email already registered");
      } else {
        const user = res?.data?.data?.accountRegister?.user;
        login(user.email, state.password);
        await commonFunction();
      }

      console.log("body: ", body);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const login = async (email, password) => {
    try {
      const body = {
        email,
        password,
      };

      const res = await loginUser(body);
      localStorage.setItem(
        "userInfo",
        JSON.stringify(res.data?.data?.tokenCreate?.user)
      );
      localStorage.setItem(
        "token",
        JSON.stringify(res.data?.data?.tokenCreate?.token)
      );
      // location.reload();
      // console.log("body: ", body);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const applyCoupen = async () => {
    try {
      setState({ coupenLoader: true });
      if (state.promoCode == "") {
        setState({
          promoCodeError: "Promo code is required",
          coupenLoader: false,
        });
      } else {
        let checkoutId = localStorage.getItem("checkoutId");

        const data = await applyCoupenCode({
          checkoutId,
          languageCode: "EN_US",
          promoCode: state.promoCode.trim(),
          // promoCode: "E87B-D067-5527",
        });

        if (data?.data?.data?.checkoutAddPromoCode?.errors?.length > 0) {
          notifyError(
            data?.data?.data?.checkoutAddPromoCode?.errors[0]?.message
          );
          setState({ coupenLoader: false });

          // setIsVerified(false);
        } else {
          const res = data?.data?.data?.checkoutAddPromoCode?.checkout;
          // setIsVerified(true);
          setState({
            giftCard: res?.giftCards,
            total: res.totalPrice?.gross?.amount,
            coupenLoader: false,
            promoCode: "",
          });
          notifySuccess("Coupen code applied");
        }
      }
    } catch (error) {
      setState({ coupenLoader: false });

      console.log("error: ", error);
    }
  };

  const handleCheckboxChange = (id) => {
    const updatedPaymentType = state.paymentType.map((item) =>
      item.id === id ? { ...item, checked: true } : { ...item, checked: false }
    );

    const checkedOption = updatedPaymentType.find((item) => item.checked)?.name;

    if (checkedOption == "Cash On delivery") {
      if (state.checkedGiftwrap) {
        checkedGiftWrap_checkedCOD(state.checkedGiftwrap);
      } else {
        unCheckedGiftWrap_checkedCOD(state.checkedGiftwrap);
      }
    } else {
      if (state.checkedGiftwrap) {
        checkedGiftWrap_uncheckedCOD(state.checkedGiftwrap);
      } else {
        if (state.diffAddress) {
          updateDelivertMethod(state.selectedCountry1);
        } else {
          updateDelivertMethod(state.selectedCountry);
        }
      }
    }
    setState({
      paymentType: updatedPaymentType,
      selectedPaymentType: checkedOption,
    });
    updatePaymentMethod(checkedOption);
  };
  console.log("selectedPaymentType: ", state.selectedPaymentType);

  const updatePaymentMethod = async (option) => {
    try {
      let paymentMethod = "";
      if (option == "Razorpay") {
        paymentMethod = "UGF5bWVudF9HYXRld2F5OjI=";
      } else {
        paymentMethod = "UGF5bWVudF9HYXRld2F5OjE=";
      }
      const res = await paymentMethodUpdate({
        paymentMethod,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const handleGiftWrapChanged = (checked) => {
    setState({ checkedGiftwrap: checked });
    if (checked) {
      if (state.selectedPaymentType == "Cash On delivery") {
        checkedGiftWrap_checkedCOD(checked);
      } else {
        checkedGiftWrap_uncheckedCOD(checked);
      }
    } else {
      if (state.selectedPaymentType == "Cash On delivery") {
        unCheckedGiftWrap_checkedCOD(checked);
      } else {
        if (state.diffAddress) {
          updateDelivertMethod(state.selectedCountry1);
        } else {
          updateDelivertMethod(state.selectedCountry);
        }
      }
    }
  };

  const checkedGiftWrap_uncheckedCOD = (checked) => {
    let deliveryMethodId = "";
    if (checkChannel() == "india-channel") {
      deliveryMethodId = "U2hpcHBpbmdNZXRob2Q6MTA=";
    } else {
      deliveryMethodId = "U2hpcHBpbmdNZXRob2Q6MTI=";
    }
    updateDelivertMethodCodAndGift(deliveryMethodId, checked);
  };

  const unCheckedGiftWrap_checkedCOD = (checked) => {
    let deliveryMethodId = "";
    if (checkChannel() == "india-channel") {
      deliveryMethodId = "U2hpcHBpbmdNZXRob2Q6MTQ=";
    } else {
      deliveryMethodId = "U2hpcHBpbmdNZXRob2Q6MTY=";
    }
    updateDelivertMethodCodAndGift(deliveryMethodId, checked);
  };

  const checkedGiftWrap_checkedCOD = (checked) => {
    let deliveryMethodId = "";
    if (checkChannel() == "india-channel") {
      deliveryMethodId = "U2hpcHBpbmdNZXRob2Q6MTc=";
    } else {
      deliveryMethodId = "U2hpcHBpbmdNZXRob2Q6MTg=";
    }
    updateDelivertMethodCodAndGift(deliveryMethodId, checked);
  };

  const updateDelivertMethodCodAndGift = async (
    deliveryMethodId,
    checked = false
  ) => {
    try {
      const checkoutid = localStorage.getItem("checkoutId");
      const res = await updateDeliveryMethodCODAndGiftWrap({
        checkoutid,
        deliveryMethodId,
      });
      const data = res?.data?.data?.checkoutDeliveryMethodUpdate?.checkout;
      //Reduce 50 repee if giftwrap true
      let shippingCost = "";
      console.log("checked: ", checked);

      if (checked) {
        shippingCost = data?.shippingPrice?.gross?.amount - 50;
      } else {
        shippingCost = data?.shippingPrice?.gross?.amount;
      }

      setState({
        total: data?.totalPrice?.gross?.amount,
        tax: data?.totalPrice?.tax?.amount,
        shippingCost,
      });
      console.log("GIFT: ", data?.totalPrice?.gross?.amount);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <>
      <section
        className="tp-checkout-area pb-50 pt-50"
        style={{ backgroundColor: "#EFF1F5" }}
      >
        <div className="container-fluid">
          {cartList?.data?.checkout?.lines?.length == 0 && (
            <div className="text-center pt-50">
              <h3 className="py-2">No items found in cart to checkout</h3>
              <Link href="/shop" className="tp-checkout-btn">
                Return to shop
              </Link>
            </div>
          )}
          {cart?.length > 0 && (
            <div className="row">
              <div className="col-xl-7 col-lg-7">
                <div className="tp-checkout-verify">
                  {!state.token && <CheckoutLogin />}

                  <div className="tp-checkout-verify-item">
                    <p className="tp-checkout-verify-reveal">
                      Have a coupon?{" "}
                      <button
                        onClick={() => setState({ isOpen: !state.isOpen })}
                        type="button"
                        className="tp-checkout-coupon-form-reveal-btn"
                      >
                        Click here to enter your code
                      </button>
                    </p>

                    {state.isOpen && (
                      <div
                        id="tpCheckoutCouponForm"
                        className="tp-return-customer"
                      >
                        <div className="tp-return-customer-input">
                          <label>Coupon Code :</label>
                          <input
                            value={state.promoCode}
                            onChange={(e) =>
                              setState({ promoCode: e.target.value })
                            }
                            type="text"
                            placeholder="Coupon"
                            // disabled={isVerified}
                          />
                          {state.promoCodeError && (
                            <ErrorMsg msg={state.promoCodeError} />
                          )}
                        </div>

                        <button
                          type="button"
                          className="tp-return-customer-btn tp-checkout-btn"
                          onClick={() => applyCoupen()}
                        >
                          {state.coupenLoader ? (
                            <ButtonLoader loading={state.coupenLoader} />
                          ) : (
                            "Apply"
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="row no-gutter">
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
                      <label>Company name (optional)</label>
                      <input
                        name="companyName"
                        id="companyName"
                        type="text"
                        placeholder="Company name "
                        value={state.companyName}
                        onChange={(e) => handleInputChange(e, "companyName")}
                      />
                      {/* {state.errors.streetAddress1 && (
                      <ErrorMsg msg={state.errors.streetAddress1} />
                    )} */}
                    </div>
                  </div>

                  {/* <div className="col-md-12">
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
                </div> */}

                  <div className="col-md-6">
                    <div className="tp-checkout-input">
                      <label htmlFor="country">
                        Country <span>*</span>
                      </label>
                      <select
                        name="country"
                        id="country"
                        value={state.selectedCountry}
                        className="nice-select w-100"
                        onChange={(e) => handleSelectChange(e)}
                      >
                        <option value="">Select Country</option>
                        {CountryList?.map((item) => (
                          <option key={item.code} value={item.code}>
                            {item.country}
                          </option>
                        ))}
                      </select>
                      {state.errors.selectedCountry && (
                        <ErrorMsg msg={state.errors.selectedCountry} />
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="tp-checkout-input">
                      <label htmlFor="state">
                        State <span>*</span>
                      </label>
                      <select
                        name="state"
                        id="state"
                        value={state.selectedState}
                        className="nice-select w-100"
                        onChange={(e) =>
                          setState({ selectedState: e.target.value })
                        }
                      >
                        <option value="">Select State</option>
                        {state.stateList?.map((item) => (
                          <option key={item.raw} value={item.raw}>
                            {item.raw}
                          </option>
                        ))}
                      </select>
                      {state.errors.selectedState && (
                        <ErrorMsg msg={state.errors.selectedState} />
                      )}
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
                      {state.errors.city && (
                        <ErrorMsg msg={state.errors.city} />
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="tp-checkout-input">
                      <label>
                        Postcode ZIP <span>*</span>
                      </label>
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
            {!validLoginAndReg() && (
              <>
                <div className="tp-login-remeber">
                  <input
                    id="remeber1"
                    type="checkbox"
                    checked={state.createAccount}
                    onChange={(e) =>
                      setState({ createAccount: e.target.checked })
                    }
                  />
                  <label htmlFor="remeber1">Create an account?</label>
                </div>
                <>
                  {state.createAccount && (
                    <div className="tp-checkout-bill-form">
                      <div className="tp-checkout-bill-inner">
                        <div className="row pt-2">
                          <div className="col-md-6">
                            <div className="tp-checkout-input">
                              <label>
                                First Name <span>*</span>
                              </label>
                              <input
                                name="loginFirstName"
                                id="loginFirstName"
                                type="text"
                                placeholder="First Name "
                                value={state.loginFirstName}
                                onChange={(e) =>
                                  handleInputChange(e, "loginFirstName")
                                }
                              />
                              {state.errors.loginFirstName && (
                                <ErrorMsg msg={state.errors.loginFirstName} />
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="tp-checkout-input">
                              <label>
                                Last Name <span>*</span>
                              </label>
                              <input
                                name="loginLastName"
                                id="loginLastName"
                                type="text"
                                placeholder="Last Name "
                                value={state.loginLastName}
                                onChange={(e) =>
                                  handleInputChange(e, "loginLastName")
                                }
                              />
                              {state.errors.loginLastName && (
                                <ErrorMsg msg={state.errors.loginLastName} />
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="tp-checkout-input">
                              <label>
                                Email address <span>*</span>
                              </label>
                              <input
                                name="email"
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={state.loginEmail}
                                onChange={(e) =>
                                  handleInputChange(e, "loginEmail")
                                }

                                // defaultValue={user?.email}
                              />
                              {state.errors.loginEmail && (
                                <ErrorMsg msg={state.errors.loginEmail} />
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="tp-checkout-input">
                              <label>
                                Password <span>*</span>
                              </label>
                              <input
                                name="password"
                                id="password"
                                type="text"
                                value={state.password}
                                placeholder="Password"
                                onChange={(e) =>
                                  handleInputChange(e, "password")
                                }
                              />
                              {state.errors.password && (
                                <ErrorMsg msg={state.errors.password} />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="tp-login-bottom">
                      <button
                        type="button"
                        className="tp-login-btn w-100"
                        onClick={() => createAccount()}
                      >
                        Submit
                      </button>
                    </div> */}
                    </div>
                  )}
                </>
              </>
            )}
            <div
              className={`tp-login-remeber ${
                state.createAccount ? "pt-3" : "pt-2"
              } `}
            >
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
                        <label>Company name (optional)</label>
                        <input
                          name="companyName"
                          id="companyName"
                          type="text"
                          placeholder="Company name"
                          value={state.companyName1}
                          onChange={(e) => handleInputChange(e, "companyName1")}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="tp-checkout-input">
                        <label htmlFor="country">
                          Country <span>*</span>
                        </label>
                        <select
                          name="country"
                          id="country"
                          value={state.selectedCountry1}
                          className="nice-select w-100"
                          onChange={(e) => shippingCoutryChange(e)}
                        >
                          <option value="">Select Country</option>
                          {CountryList?.map((item) => (
                            <option key={item.code} value={item.code}>
                              {item.country}
                            </option>
                          ))}
                        </select>
                        {state.errors.selectedCountry1 && (
                          <ErrorMsg msg={state.errors.selectedCountry1} />
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="tp-checkout-input">
                        <label htmlFor="state">
                          State <span>*</span>
                        </label>
                        <select
                          name="state"
                          id="state"
                          value={state.selectedState1}
                          className="nice-select w-100"
                          onChange={(e) =>
                            setState({ selectedState1: e.target.value })
                          }
                        >
                          <option value="">Select State</option>
                          {state.stateList?.map((item) => (
                            <option key={item.raw} value={item.raw}>
                              {item.raw}
                            </option>
                          ))}
                        </select>
                        {state.errors.selectedState1 && (
                          <ErrorMsg msg={state.errors.selectedState1} />
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="tp-checkout-input">
                        <label>Street address</label>
                        <input
                          name="address"
                          id="address"
                          type="text"
                          placeholder="House number and street name"
                          value={state.streetAddress2}
                          onChange={(e) =>
                            handleInputChange(e, "streetAddress2")
                          }
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
                  <h4>PRODUCT</h4>
                  <h4>SUBTOTAL</h4>
                </li>

                {/*  item list */}
                {state.orderData?.lines?.map((item) => (
                  <li key={item.id} className="tp-order-info-list-desc">
                    <p className="para">
                      {item?.variant?.product?.name}{" "}
                      <span> x {item?.quantity}</span>
                    </p>
                    {state.channel == "india-channel" ? (
                      <span>
                        &#8377;{roundOff(item?.totalPrice?.gross?.amount)}
                      </span>
                    ) : (
                      <span>${roundOff(item?.totalPrice?.gross?.amount)}</span>
                    )}
                  </li>
                ))}

                {/* total */}
                {state?.shippingCost && (
                  <li className="tp-order-info-list-total">
                    <span>Shipping</span>
                    {checkChannel() == "india-channel" ? (
                      <span>&#8377;{roundOff(state?.shippingCost)}</span>
                    ) : (
                      <span>
                        <span>${roundOff(state?.shippingCost)}</span>
                      </span>
                    )}
                  </li>
                )}

                {/* giftCards */}

                {state?.giftCard?.length > 0 &&
                  state?.giftCard?.map((item, i) => (
                    <li className="tp-order-info-list-total" key={i}>
                      <span className="para">Coupen code</span>
                      {checkChannel() == "india-channel" ? (
                        <span>
                          &#8377;
                          {roundOff(item?.currentBalance?.amount)}
                        </span>
                      ) : (
                        <span>
                          <span>${roundOff(item?.currentBalance?.amount)}</span>
                        </span>
                      )}
                    </li>
                  ))}

                {state.checkedGiftwrap && (
                  <li className="tp-order-info-list-total">
                    <span>Gift wrap</span>
                    {checkChannel() == "india-channel" ? (
                      <span>&#8377;{roundOff(50)}</span>
                    ) : (
                      <span>
                        <span>${roundOff(50)}</span>
                      </span>
                    )}
                  </li>
                )}

                <li className="tp-order-info-list-total">
                  <span>Total</span>
                  {checkChannel() === "india-channel" ? (
                    <>
                      <p
                        style={{
                          color: "black",
                          fontWeight: "700",
                          textAlign: "right",
                        }}
                      >
                        {state?.total && <>&#8377;{roundOff(state?.total)}</>}
                        <br />
                        <span style={{ fontWeight: "400", fontSize: "14px" }}>
                          (includes &#8377;{roundOff(state?.tax)} GST)
                        </span>
                      </p>
                    </>
                  ) : (
                    <>
                      <p
                        style={{
                          color: "black",
                          fontWeight: "700",
                          textAlign: "right",
                        }}
                      >
                        {state?.total && <>${roundOff(state?.total)}</>}

                        <br />
                        <span style={{ fontWeight: "400", fontSize: "14px" }}>
                          (includes ${roundOff(state?.tax)} GST)
                        </span>
                      </p>
                    </>
                  )}
                </li>
              

                <div className="flex w-full flex-row justify-between">
                  <div>
                    <div className="mt-3 mb-2">
                      <h5>Payment Method</h5>
                    </div>

                    {state.paymentType?.map((item) => (
                      <div className="tp-login-remeber" key={item.id}>
                        <input
                          id={`payment-${item.id}`}
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => {
                            handleCheckboxChange(item.id);
                          }}
                        />
                        <label
                          htmlFor={`payment-${item.id}`}
                          style={{ color: "black" }}
                        >
                          {item.name}
                        </label>
                      </div>
                    ))}

                    {state.selectedPaymentType == "Cash On delivery" && (
                      <ol>
                        <li>
                          Cash On Delivery orders will be booked only if the pin
                          code is serviceable for COD by our Logistics Partner
                        </li>
                        <li>
                          In case of Cash on Delivery, confirmation will be
                          taken from the recipient over the call.
                        </li>
                        <li>
                          PraDe Jewels reserves the right to disable COD option
                          for the User, If COD order is rejected. Only cash/UPI
                          payments will be accepted while delivering the order
                          under the COD format.
                        </li>
                        <li>
                          Demand Draft/ Cheques will not be accepted for orders
                          booked under the COD method of payment. It is strictly
                          a cash/UPI payment method only.
                        </li>
                        <li>
                          E-Gift Vouchers or store credit cannot be used for COD
                          orders. Foreign currency cannot be used to make a COD
                          payment.
                        </li>
                        <li>
                          Cash on Delivery is not applicable on Pre-order
                          products
                        </li>
                        <li>
                          Cash on Delivery option is eligible on orders between
                          3000 INR to 30,000 INR
                        </li>
                      </ol>
                    )}
                    {state.errors.paymentType && (
                      <ErrorMsg msg={state.errors.paymentType} />
                    )}
                      <div className=" text-grey">
                    Cash on Delivery is not applicable on Pre-order and gift cart products
                </div>
                  </div>
                  {state.isGiftWrap && (
                    <div>
                      <div className="mt-3 mb-2">
                        <h5>Gift wrap</h5>
                      </div>
                      <div className="tp-login-remeber">
                        <input
                          id={"giftWrap"}
                          type="checkbox"
                          checked={state.checkedGiftwrap}
                          onChange={(e) => {
                            console.log("e.target.checked: ", e.target.checked);
                            checkoutGiftWrapUpdate(e.target.checked);
                            handleGiftWrapChanged(e.target.checked);
                          }}
                        />
                        <label htmlFor={`giftWrap`} style={{ color: "black" }}>
                          {"gift wrap"}
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                <li>
                  <div className="tp-login-remeber">
                    <input
                      id="agree"
                      type="checkbox"
                      checked={state.isAgree}
                      onChange={(e) =>
                        setState({ isAgree: e.target.checked, pType: true })
                      }
                    />
                    <label htmlFor="agree" style={{ color: "black" }}>
                      I have read and agree to the website terms and conditions
                      *
                    </label>
                  </div>
                </li>
                {state.errors.isAgree && (
                  <ErrorMsg msg={state.errors.isAgree} />
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
                className="tp-checkout-btn w-100"
                onClick={() => handleSubmit()}
              >
                {state.orderLoading ? <ButtonLoader /> : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutBillingArea;
