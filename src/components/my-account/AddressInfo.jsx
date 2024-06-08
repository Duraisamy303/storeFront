import React, { useEffect, useState } from "react";
import {
  useCountryListQuery,
  useDeleteAddressMutation,
  useGetAddressListQuery,
  useStateListQuery,
  useUpdateAddressMutation,
  useUpdateBillingAddressAddressSectionMutation,useUpdateShippingAddressAddressSectionMutation
} from "@/redux/features/productApi";
import { SettingOutlined } from "@ant-design/icons";
import { Modal, Select } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import ErrorMsg from "../common/error-msg";
import { EmailTwo, LocationTwo, PhoneThree, UserThree } from "@/svg";
import { useUpdateProfileMutation } from "@/redux/features/auth/authApi";
import { notifyError, notifySuccess } from "@/utils/toast";

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
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const handleSettingClick = (index) => {
    setShowSettingsBox(index === showSettingsBox ? null : index);
  };

  const handleSettingEditClick = (data) => {
    setSelectedAddress(data);
    setSelectedCountry(data?.country?.code);
    setSelectedState(data?.countryArea);
    setEditAddressModalVisible(true);
    getAddressListRefetch()
  };

  
  const handleAddressClick = (address) => {
    setSelectedAddress(address);
  };

  const { data: countryList, refetchCountry } = useCountryListQuery();
  const CountryList = countryList?.data?.shop?.countries;

  const { data: stateList, refetch: stateRefetch } = useStateListQuery({
    code: selectedCountry,
  });

  const StateList = stateList?.data?.addressValidationRules?.countryAreaChoices;

  useEffect(() => {
    if (selectedCountry) {
      stateRefetch({ code: selectedCountry });
    }
  }, [selectedCountry]);

  const [updateAddress, {}] = useUpdateAddressMutation();

  const [deleteAddress] = useDeleteAddressMutation();

  const [defaultBillingAddress, {}] = useUpdateBillingAddressAddressSectionMutation();

  const [defaultShippingAddress, {}] = useUpdateShippingAddressAddressSectionMutation();

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

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: selectedAddress,
  });

  useEffect(() => {
    // Update form values when selectedAddress changes
    if (selectedAddress) {
      // Set form values using setValue function
      setValue("firstName", selectedAddress.firstName);
      setValue("lastName", selectedAddress.lastName);
      setValue("phone", selectedAddress.phone);
      setValue("streetAddress1", selectedAddress.streetAddress1);
      setValue("streetAddress2", selectedAddress.streetAddress2);
      setValue("city", selectedAddress.city);
      setValue("postalCode", selectedAddress.postalCode);
      setValue("country", selectedAddress.country?.code);
      setValue("countryArea", selectedAddress.countryArea);
    }
  }, [selectedAddress, setValue]);


  const handleEditAddressModalCancel = () => {
    setSelectedAddress(null);
    setEditAddressModalVisible(false);
    reset();
    reset({country: selectedAddress.country?.code})
  };


  const handleEditAddressSubmit = (data) => {
    const formData = {
      firstName: data.firstName,
      lastName: data.lastName,
      streetAddress1: data.streetAddress1,
      streetAddress2: data.streetAddress2,
      city: data.city,
      postalCode: data.postalCode,
      country: data.country,
      countryArea: data.countryArea,
      phone: data.phone,
    };

    updateAddress({
      addressId: selectedAddress?.id,
      input: formData,
    })
      .then((result) => {
        if (result?.data?.accountAddressUpdate?.error?.length > 0 || result?.data?.data?.accountAddressUpdate?.errors?.length > 0) {
          notifyError(result?.data?.accountAddressUpdate?.error[0]?.message);
          notifyError(result?.data?.data?.accountAddressUpdate?.errors[0]?.message);
        } else {
          notifySuccess("Address updated successfully!");
          reset(); // Reset form fields
          setEditAddressModalVisible(false); // Close the modal
          setSelectedAddress(null);
          setShowSettingsBox(null);
          getAddressListRefetch();
        }
      })
      .catch(() => {
        notifyError("An error occurred while updating the address.");
      });
      getAddressListRefetch();
  };

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    setValue("country", value);
  };

  const handleStateChange = (value) => {
    setSelectedState(value);
    setValue("countryArea", value);
  };

  const handleSettingDeleteAddress = (data) => {
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


  const DefaultCountry = selectedAddress?.country?.code
console.log('✌️DefaultCountry --->', DefaultCountry);

  return (
    <div>
      <h4 className="mb-4" style={{ fontWeight: "500" }}>
        Address Info
      </h4>
      <div className="row">
        {AddressData &&
          AddressData.map((address, index) => (
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
                    {address.firstName} {address.lastName}
                  </p>
                  <p style={{ color: "gray", marginBottom: "0px" }}>
                    {address.phone}
                  </p>
                  <p style={{ color: "gray", marginBottom: "0px" }}>
                    {address.companyName}
                  </p>
                  <p style={{ color: "gray", marginBottom: "0px" }}>
                    {address.email}
                  </p>
                  <p style={{ color: "gray", marginBottom: "0px" }}>
                    {address.streetAddress1} {address.streetAddress2}
                  </p>
                  <p style={{ color: "gray", marginBottom: "0px" }}>
                    {address.city}
                  </p>
                  <p style={{ color: "gray", marginBottom: "0px" }}>
                    {address.countryArea}
                  </p>
                  <p style={{ color: "gray", marginBottom: "0px" }}>
                    {address.country?.country}
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
                          onClick={() => handleSettingDeleteAddress(address)}
                        >
                          Delete Address
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Edit Address Modal */}
      <Modal
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
                  placeholder="Enter your first name"
                  defaultValue={selectedAddress?.firstName}
                />
                <span>
                  <UserThree />
                </span>
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
                  placeholder="Enter your last name"
                  defaultValue={selectedAddress?.lastName}
                />
                <span>
                  <UserThree />
                </span>
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
                placeholder="Enter your phone number"
                defaultValue={selectedAddress?.phone}
              />
              <span>
                <PhoneThree />
              </span>
              {errors.phone && <ErrorMsg>{errors.phone.message}</ErrorMsg>}
            </div>
          </div>

          <div className="profile__input-box">
            <div className="profile__input">
              <input
                {...register("streetAddress1")}
                name="streetAddress1"
                type="text"
                placeholder="Enter your address"
                defaultValue={selectedAddress?.streetAddress1}
              />
              <span>
                <LocationTwo />
              </span>
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
                placeholder="Enter your address"
                defaultValue={selectedAddress?.streetAddress2}
              />
              <span>
                <LocationTwo />
              </span>
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
                  placeholder="Enter your city"
                  defaultValue={selectedAddress?.city}
                />
                <span>
                  <LocationTwo />
                </span>
                {errors.city && <ErrorMsg>{errors.city.message}</ErrorMsg>}
              </div>
            </div>

            <div className="profile__input-box col-md-6">
              <div className="profile__input">
                <input
                  {...register("postalCode")}
                  name="postalCode"
                  type="text"
                  placeholder="Enter your postal code"
                  defaultValue={selectedAddress?.postalCode}
                />
                <span>
                  <LocationTwo />
                </span>
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
                  placeholder="Select your country"
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
                  placeholder="Select your state/province"
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
      </Modal>
    </div>
  );
};

export default AddressInfo;
