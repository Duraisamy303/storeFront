import React, { useEffect, useState } from "react";
import {
  useAddNewAddressMutation,
  useCountryListQuery,
  useDeleteAddressMutation,
  useGetAddressListQuery,
  useStateListQuery,
  useUpdateAddressMutation,
  useUpdateBillingAddressAddressSectionMutation,
  useUpdateShippingAddressAddressSectionMutation,
} from "@/redux/features/productApi";
import { SettingOutlined } from "@ant-design/icons";
import { Modal, Select } from "antd";
import * as Yup from "yup";
import ErrorMsg from "../common/error-msg";
import { notifyError, notifySuccess } from "@/utils/toast";
import {
  getUniqueStates,
  showDeleteAlert,
  useSetState,
} from "@/utils/functions";
import Swal from "sweetalert2";
import ButtonLoader from "../loader/button-loader";

const { Option } = Select;

const AddressInfo = () => {
  const {
    data: getAddressList,
    loading: getAddressListLoading,
    error: getAddressListError,
    refetch: getAddressListRefetch,
  } = useGetAddressListQuery();
  const AddressData = getAddressList?.data?.me?.addresses;

  const [showSettingsBox, setShowSettingsBox] = useState(null);
  const [editAddressModalVisible, setEditAddressModalVisible] = useState(false);

  const [addAddressModalVisible, setaddAddressModalVisible] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const [state, setState] = useSetState({
    firstName: "",
    lastName: "",
    city: "",
    phone: "",
    postalCode: "",
    streetAddress1: "",
    streetAddress2: "",
    companyName: "",
    errors: {},
    editAddressId: null,
  });

  const handleSettingClick = (index) => {
    setShowSettingsBox(index === showSettingsBox ? null : index);
  };

  const handleSettingEditClick = (data) => {
    setSelectedAddress(data);
    setSelectedCountry(data?.country?.code);
    setSelectedState(data?.countryArea);
    const withoutCountryCode = data.phone.replace(/^(\+)/, "");

    setState({
      streetAddress1: data.streetAddress1,
      streetAddress2: data.streetAddress2,
      city: data.city,
      postalCode: data.postalCode,
      selectedCountry: data?.country?.code,
      selectedState: data?.countryArea,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: withoutCountryCode,
      postalCode: data.postalCode,
      companyName: data.companyName,
      editAddressId: data?.id,
    });
    setEditAddressModalVisible(true);
    getAddressListRefetch();
  };

  const handleAddressClick = (address) => {
    setSelectedAddress(address);
  };

  const { data: countryList, refetchCountry } = useCountryListQuery();
  const CountryList = countryList?.data?.shop?.countries;

  const { data: stateList1, refetch: stateRefetch1 } = useStateListQuery({
    code: state.selectedCountry,
  });

  useEffect(() => {
    if (stateList1?.data?.addressValidationRules?.countryAreaChoices) {
      const list = stateList1?.data?.addressValidationRules?.countryAreaChoices;
      const uniqueStateList = getUniqueStates(list);
      setState({
        stateList: uniqueStateList,
      });
    }
  }, [stateList1]);

  const [updateAddress, { isLoading: updateAddressLoading }] =
    useUpdateAddressMutation();

  const [deleteAddress] = useDeleteAddressMutation();

  const [addAddress, { isLoading: addAddressLoading }] =
    useAddNewAddressMutation();

  const [defaultBillingAddress, {}] =
    useUpdateBillingAddressAddressSectionMutation();

  const [defaultShippingAddress, {}] =
    useUpdateShippingAddressAddressSectionMutation();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    phone: Yup.string().required("Phone number is required"),
    streetAddress1: Yup.string().required("Street address is required"),
    streetAddress2: Yup.string(),
    city: Yup.string().required("City is required"),
    postalCode: Yup.string().required("Postal code is required"),
    country: Yup.string().required("Country is required"),
    countryArea: Yup.string().required("State/Province is required"),
  });

  const handleCountryChange1 = (e) => {
    setState({
      selectedCountry: e.target.value,
      selectedState: "",
      phone: "",
      errors: { ...state.errors, selectedState: "", phone: "" },
    });
    stateRefetch1();
  };

  const handleSettingDeleteAddress = (data) => {
    showDeleteAlert(
      async () => {
        deleteAddress({
          id: data?.id,
        })
          .then((result) => {
            if (result?.error) {
              notifyError(result?.error?.data?.message);
            } else {
              notifySuccess("Address deleted successfully.");
              setShowSettingsBox(null);
              getAddressListRefetch();
            }
          })
          .catch((error) => {
            notifyError("An error occurred while deleting the address.");
          });
        Swal.fire("Cancelled!", "Your address has been deleted.", "success");
      },
      () => {
        Swal.fire("Address", "Your address is safe :)", "info");
      },
      "Are you sure to delete your address"
    );
  };

  const handleSettingDefaultBIllingClick = (data) => {
    defaultBillingAddress({
      addressId: data?.id,
    })
      .then((result) => {
        if (result?.error) {
          notifyError(result?.error?.data?.message);
        } else {
          notifySuccess("Default billing address set successfully.");
          setShowSettingsBox(null);
          getAddressListRefetch();
        }
      })
      .catch((error) => {
        notifyError("An error occurred while setting default billing address.");
      });
  };

  const handleSettingDefaultShippingClick = (data) => {
    defaultShippingAddress({
      addressId: data?.id,
    })
      .then((result) => {
        if (result?.error) {
          notifyError(result?.error?.data?.message);
        } else {
          notifySuccess("Default shipping address set successfully.");
          setShowSettingsBox(null);
          getAddressListRefetch();
        }
      })
      .catch((error) => {
        notifyError(
          "An error occurred while setting default shipping address."
        );
      });
  };

  const validateInputs = () => {
    const fieldsToValidate = [
      { name: "firstName", label: "First name" },
      { name: "lastName", label: "Last name" },
      { name: "selectedCountry", label: "Country" },
      { name: "streetAddress1", label: "Street address" },
      { name: "city", label: "City" },
      { name: "postalCode", label: "PostalCode" },
      { name: "selectedState", label: "State" },
      { name: "phone", label: "Phone" },
    ];
    const errors = {};
    fieldsToValidate.forEach(({ name, label }) => {
      if (!state[name]) {
        errors[name] = `${label} is required`;
      }
    });

    setState({ errors });
    return errors;
  };

  const handleAddAddressSubmit = async () => {
    try {
      const errors = validateInputs();
      if (Object.keys(errors).length === 0) {
        const input = {
          streetAddress1: state.streetAddress1,
          streetAddress2: state.streetAddress2,
          city: state.city,
          postalCode: state.postalCode,
          country: state.selectedCountry,
          countryArea: state.selectedState,
          firstName: state.firstName,
          lastName: state.lastName,
          phone: state.phone,
          postalCode: state.postalCode,
          companyName: state.companyName,
        };

        const res = await addAddress({
          input,
        });
        if (res?.data?.data?.accountAddressCreate?.errors?.length > 0) {
          notifyError(
            res.data?.data?.accountAddressCreate?.errors[0]?.message ==
              "This value is not valid for the address."
              ? "Incorrect Postal Code"
              : res.data?.data?.accountAddressCreate?.errors[0]?.message
          );
        } else {
          setEditAddressModalVisible(false);
          getAddressListRefetch();
          clearForm();
          notifySuccess("Address created successfully");
        }
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleEditAddressSubmit = () => {
    const errors = validateInputs();
    if (Object.keys(errors).length === 0) {
      const input = {
        streetAddress1: state.streetAddress1,
        streetAddress2: state.streetAddress2,
        city: state.city,
        postalCode: state.postalCode,
        country: state.selectedCountry,
        countryArea: state.selectedState,
        firstName: state.firstName,
        lastName: state.lastName,
        phone: state.phone,
        postalCode: state.postalCode,
        companyName: state.companyName,
      };

      updateAddress({
        addressId: state.editAddressId,
        input,
      })
        .then((result) => {
          if (result?.data?.data?.accountAddressUpdate?.errors?.length > 0) {
            // notifyError(result?.data?.accountAddressUpdate?.error[0]?.message);
            notifyError(
              result?.data?.data?.accountAddressUpdate?.errors[0]?.message ==
                "This value is not valid for the address."
                ? "Incorrect Postal Code"
                : result?.data?.data?.accountAddressUpdate?.errors[0]?.message
            );
          } else {
            notifySuccess("Address updated successfully!");
            setEditAddressModalVisible(false); // Close the modal
            setSelectedAddress(null);
            setShowSettingsBox(null);
            getAddressListRefetch();
            clearForm();
          }
        })

        .catch(() => {
          notifyError("An error occurred while updating the address.");
        });
    }
  };

  const clearForm = () => {
    setState({
      firstName: "",
      lastName: "",
      city: "",
      phone: "",
      postalCode: "",
      streetAddress1: "",
      streetAddress2: "",
      companyName: "",
      errors: {},
      selectedState: "",
      selectedCountry: "",
      editAddressId: null,
    });
  };

  const handleInputChange = (e, fieldName) => {
    setState({ [fieldName]: e });
  };

  function CommonLoader({ loading, spinner }) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src="/assets/img/Prade-Logo-Giff.gif" alt="Loading..." />
      </div>
    );
  }
  return (
    <div>
      {getAddressListLoading ? (
        <CommonLoader />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h4 className="mb-4" style={{ fontWeight: "500" }}>
              Address Info
            </h4>
            <button
              className="mb-4 btn "
              style={{ backgroundColor: "#c38c36", color: "white" }}
              onClick={() => {
                clearForm();
                setSelectedAddress(null);
                setEditAddressModalVisible(true);
              }}
            >
              Add New Address
            </button>
          </div>
          <div className="row">
            {AddressData?.length > 0 ? (
              AddressData?.map((address, index) => (
                <div
                  key={index}
                  className={`col-md-${AddressData.length === 1 ? 12 : 6}`}
                  style={{ marginBottom: "50px" }}
                  onClick={() => handleAddressClick(address)} // Add onClick event handler
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding:
                        address?.isDefaultBillingAddress ||
                        address?.isDefaultShippingAddress
                          ? "15px"
                          : "0",
                      borderRadius:
                        address?.isDefaultBillingAddress ||
                        address?.isDefaultShippingAddress
                          ? "10px"
                          : "0",
                      background:
                        address?.isDefaultBillingAddress ||
                        address?.isDefaultShippingAddress
                          ? "#ffe3be"
                          : "white",
                    }}
                  >
                    <div>
                      {address?.isDefaultBillingAddress && (
                        <h5 style={{ color: "black", fontWeight: "500" }}>
                          Default Billing Address
                        </h5>
                      )}
                      {address?.isDefaultShippingAddress && (
                        <h5 style={{ color: "black", fontWeight: "500" }}>
                          Default Shipping Address
                        </h5>
                      )}
                      <p style={{ color: "gray", marginBottom: "0px" }}>
                        {address?.firstName} {address?.lastName}
                      </p>
                      <p style={{ color: "gray", marginBottom: "0px" }}>
                        {address?.phone}
                      </p>
                      <p style={{ color: "gray", marginBottom: "0px" }}>
                        {address?.companyName}
                      </p>
                      {/* <p style={{ color: "gray", marginBottom: "0px" }}>
                    {address?.email}
                  </p> */}
                      <p style={{ color: "gray", marginBottom: "0px" }}>
                        {address?.streetAddress1} {address?.streetAddress2}
                      </p>
                      <p style={{ color: "gray", marginBottom: "0px" }}>
                        {address?.city}
                      </p>
                      <p style={{ color: "gray", marginBottom: "0px" }}>
                        {address?.countryArea}
                      </p>
                      <p style={{ color: "gray", marginBottom: "0px" }}>
                        {address?.country?.country}
                      </p>
                      <p style={{ color: "gray", marginBottom: "0px" }}>
                        {address?.postalCode}
                      </p>
                    </div>
                    <div style={{ paddingRight: "30px", textAlign: "right" }}>
                      <SettingOutlined
                        style={{
                          color: "#c2882b",
                          padding: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleSettingClick(index)}
                      />
                      {showSettingsBox === index && (
                        <div
                          style={{
                            backgroundColor: "#c2882b",
                            padding: "10px",
                            borderRadius: "5px",
                            color: "white",
                          }}
                        >
                          <ul
                            style={{
                              listStyle: "none",
                              padding: "0px",
                              margin: "0px",
                              textAlign: "left",
                            }}
                          >
                            <li
                              style={{
                                cursor: "pointer",
                                paddingBottom: "10px",
                                lineHeight: "20px",
                                fontWeight: "500",
                              }}
                              onClick={() =>
                                handleSettingDefaultBIllingClick(address)
                              }
                            >
                              Set as Default Billing Address
                            </li>
                            <li
                              style={{
                                cursor: "pointer",
                                paddingBottom: "10px",
                                lineHeight: "20px",
                                fontWeight: "500",
                              }}
                              onClick={() =>
                                handleSettingDefaultShippingClick(address)
                              }
                            >
                              Set as Default Shipping Address
                            </li>
                            <li
                              style={{
                                cursor: "pointer",
                                paddingBottom: "10px",
                                lineHeight: "20px",
                                fontWeight: "500",
                              }}
                              onClick={() => handleSettingEditClick(address)}
                            >
                              Edit Address
                            </li>
                            <li
                              style={{
                                cursor: "pointer",
                                lineHeight: "18px",
                                fontWeight: "500",
                              }}
                              onClick={() =>
                                handleSettingDeleteAddress(address)
                              }
                            >
                              Delete Address
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                No Address Found
              </div>
            )}
          </div>
        </>
      )}

      {/* Edit Address Modal */}
      {/* <Modal
        title="Edit Address"
        visible={editAddressModalVisible}
        onCancel={handleEditAddressModalCancel}
        footer={null} // Remove footer if you don't need buttons
      >
        <form onSubmit={handleSubmit(handleEditAddressSubmit)}>
          <div className="row">
            <div className="profile__input-box col-md-6">
              <div className="profile__input">
                <input
                  {...register("firstName")}
                  name="firstName"
                  type="text"
                  placeholder="Enter first name"
                  defaultValue={selectedAddress?.firstName}
                />

                {errors.firstName && (
                  <ErrorMsg>{errors.firstName.message}</ErrorMsg>
                )}
              </div>
            </div>

            <div className="profile__input-box col-md-6">
              <div className="profile__input">
                <input
                  {...register("lastName")}
                  name="lastName"
                  type="text"
                  placeholder="Enter last name"
                  defaultValue={selectedAddress?.lastName}
                />

                {errors.lastName && (
                  <ErrorMsg>{errors.lastName.message}</ErrorMsg>
                )}
              </div>
            </div>
          </div>
          <div className="profile__input-box">
            <div className="profile__input">
              <input
                {...register("phone")}
                name="phone"
                type="text"
                placeholder="Enter phone number"
                defaultValue={selectedAddress?.phone}
              />

              {errors.phone && <ErrorMsg>{errors.phone.message}</ErrorMsg>}
            </div>
          </div>

          <div className="profile__input-box">
            <div className="profile__input">
              <input
                {...register("streetAddress1")}
                name="streetAddress1"
                type="text"
                placeholder="Enter address"
                defaultValue={selectedAddress?.streetAddress1}
              />

              {errors.streetAddress1 && (
                <ErrorMsg>{errors.streetAddress1.message}</ErrorMsg>
              )}
            </div>
          </div>

          <div className="profile__input-box">
            <div className="profile__input">
              <input
                {...register("streetAddress2")}
                name="streetAddress2"
                type="text"
                placeholder="Enter address"
                defaultValue={selectedAddress?.streetAddress2}
              />

              {errors.streetAddress2 && (
                <ErrorMsg>{errors.streetAddress2.message}</ErrorMsg>
              )}
            </div>
          </div>

          <div className="row">
            <div className="profile__input-box col-md-6">
              <div className="profile__input">
                <input
                  {...register("city")}
                  name="city"
                  type="text"
                  placeholder="Enter city"
                  defaultValue={selectedAddress?.city}
                />

                {errors.city && <ErrorMsg>{errors.city.message}</ErrorMsg>}
              </div>
            </div>

            <div className="profile__input-box col-md-6">
              <div className="profile__input">
                <input
                  {...register("postalCode")}
                  name="postalCode"
                  type="text"
                  placeholder="Enter postal code"
                  defaultValue={selectedAddress?.postalCode}
                />

                {errors.postalCode && (
                  <ErrorMsg>{errors.postalCode.message}</ErrorMsg>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="profile__input-box col-md-6">
              <div className="profile__input">
                <Select
                  {...register("country")}
                  placeholder="Select country"
                  defaultValue={selectedAddress?.country?.code}
                  onChange={handleCountryChange}
                  showSearch
                  optionFilterProp="children" // Enable search based on children (option content)
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  } // Filter options based on input
                >
                  {CountryList?.map((country) => (
                    <Option key={country.code} value={country.code}>
                      {country.country}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="profile__input-box col-md-6">
              <div className="profile__input">
                <Select
                  {...register("countryArea")}
                  placeholder="Select state/province"
                  value={selectedState || undefined} // Use selectedState instead of selectedAddress.countryArea
                  onChange={handleStateChange}
                  showSearch
                  optionFilterProp="children" // Enable search based on children (option content)
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  } // Filter options based on input
                >
                  {StateList?.map((state) => (
                    <Option key={state.verbose} value={state.verbose}>
                      {state.raw}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
          <div className="profile__input-box">
            <div className="profile__input">
              <button type="submit" className="tp-btn">
                Update Address
              </button>
            </div>
          </div>
        </form>
      </Modal> */}

      <Modal
        title={state.editAddressId == null ? "ADD ADDRESS" : "EDIT ADDRESS"}
        visible={editAddressModalVisible}
        onCancel={() => {
          clearForm();
          setShowSettingsBox(null);
          setEditAddressModalVisible(false);
        }}
        footer={null}
        closeIcon={
          <span
            onClick={() => {
              setEditAddressModalVisible(false);
              clearForm();
              setShowSettingsBox(null);
            }}
            style={{ fontSize: "16px", cursor: "pointer" }}
          >
            ✖
          </span>
        }
      >
        <div className="row">
          <div className="profile__input-box col-md-6">
            <div className="profile__input">
              <input
                type="text"
                placeholder="Enter first name"
                value={state.firstName}
                onChange={(e) => handleInputChange(e.target.value, "firstName")}
              />

              {state.errors?.firstName && (
                <ErrorMsg msg={state.errors?.firstName}></ErrorMsg>
              )}
            </div>
          </div>

          <div className="profile__input-box col-md-6">
            <div className="profile__input">
              <input
                type="text"
                placeholder="Enter last name"
                value={state.lastName}
                onChange={(e) => handleInputChange(e.target.value, "lastName")}
              />
              {state.errors?.lastName && (
                <ErrorMsg msg={state.errors?.lastName}></ErrorMsg>
              )}
            </div>
          </div>
        </div>

        <div className="profile__input-box">
          <div className="profile__input">
            <input
              type="text"
              placeholder="Enter company name"
              value={state.companyName}
              onChange={(e) => handleInputChange(e.target.value, "companyName")}
            />
          </div>
        </div>
        <div className="row">
          <div className="profile__input-box col-md-6">
            <select
              name="country"
              id="country"
              value={state.selectedCountry}
              className="nice-select w-100 h-51"
              style={{ height: "51px", color: "grey" }}
              onChange={handleCountryChange1}
            >
              <option value="">Select Country</option>
              {CountryList?.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.country}
                </option>
              ))}
            </select>
            {state.errors?.selectedCountry && (
              <ErrorMsg msg={state.errors?.selectedCountry} />
            )}
          </div>

          {state.stateList?.length > 0 ? (
            <div className="col-md-6 ">
              <div className="tp-checkout-input">
                <select
                  disabled={state.stateList?.length == 0}
                  name="state"
                  id="state"
                  className="nice-select w-100"
                  style={{ color: "grey" }}
                  value={state.selectedState}
                  onChange={(e) => setState({ selectedState: e.target.value })}
                >
                  <option value="">Select State</option>
                  {state.stateList?.map((item) => (
                    <option key={item.raw} value={item.raw}>
                      {item.raw}
                    </option>
                  ))}
                </select>
                {state.errors?.selectedState && (
                  <ErrorMsg msg={state.errors?.selectedState} />
                )}
              </div>
            </div>
          ) : (
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <input
                  name="state"
                  id="state"
                  type="text"
                  required
                  placeholder="Enter state name"
                  value={state.selectedState}
                  onChange={(e) => setState({ selectedState: e.target.value })}
                />
                {state.errors?.selectedState && (
                  <ErrorMsg msg={state.errors?.selectedState} />
                )}
              </div>
            </div>
          )}

          <div className="profile__input-box">
            <div className="profile__input">
              <input
                type="text"
                placeholder="Enter address1"
                value={state.streetAddress1}
                onChange={(e) =>
                  handleInputChange(e.target.value, "streetAddress1")
                }
              />

              {state.errors?.streetAddress1 && (
                <ErrorMsg msg={state.errors.streetAddress1} />
              )}
            </div>
          </div>

          <div className="profile__input-box">
            <div className="profile__input">
              <input
                type="text"
                placeholder="Enter address2"
                value={state.streetAddress2}
                onChange={(e) =>
                  handleInputChange(e.target.value, "streetAddress2")
                }
              />
            </div>
          </div>

          <div className="row">
            <div className="profile__input-box col-md-6">
              <div className="profile__input">
                <input
                  type="text"
                  placeholder="Enter city"
                  value={state.city}
                  onChange={(e) => handleInputChange(e.target.value, "city")}
                />

                {state.errors?.city && <ErrorMsg msg={state.errors.city} />}
              </div>
            </div>

            <div
              className="profile__input-box col-md-6"
              style={{ paddingRight: "0px !important" }}
            >
              <div className="profile__input">
                <input
                  type="number"
                  placeholder="Enter postal code"
                  value={state.postalCode}
                  onChange={(e) =>
                    handleInputChange(e.target.value, "postalCode")
                  }
                />

                {state.errors?.postalCode && (
                  <ErrorMsg msg={state.errors.postalCode} />
                )}
              </div>
            </div>
            <div className="profile__input-box">
              <div className="profile__input">
                <input
                  type="number"
                  placeholder="Enter phone number"
                  value={state.phone}
                  onChange={(e) => handleInputChange(e.target.value, "phone")}
                />

                {state.errors?.phone && <ErrorMsg msg={state.errors.phone} />}
              </div>
            </div>
          </div>
        </div>

        <div className="profile__input-box">
          <div className="profile__input">
            <button
              type="button"
              className="tp-btn"
              onClick={() => {
                selectedAddress == null
                  ? handleAddAddressSubmit()
                  : handleEditAddressSubmit();
              }}
            >
              {addAddressLoading || updateAddressLoading ? (
                <ButtonLoader color="#c3935b" />
              ) : state.editAddressId == null ? (
                "Add Address"
              ) : (
                "Update Address"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddressInfo;
