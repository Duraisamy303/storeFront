import React, { useState } from "react";
import { Modal, Radio, Button } from "antd";
import { useGetAddressListQuery } from "../../redux/features/productApi.js";
import { objIsEmpty } from "../../utils/functions.js";
import ReactModal from "react-modal";

const BillingAddressModal = (props) => {
  const { open, close, selectedAddress, title } = props;
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const {
    data: getAddressList,
    loading: getAddressListLoading,
    error: getAddressListError,
    refetch: getAddressListRefetch,
  } = useGetAddressListQuery();

  const address = getAddressList?.data?.me?.addresses;

  const handleOk = () => {
    if (selectedAddressId) {
      const selected = address.find((addr) => addr.id === selectedAddressId);
      selectedAddress(selected);
      close();
    }
  };

  const handleAddressChange = (e) => {
    setSelectedAddressId(e.target.value);
  };
  

  return (
    <div>
      <Modal
        title={title}
        visible={open}
        onOk={handleOk}
        onCancel={close}
        okText="Use this address"
        cancelText="Cancel"
        width={800} // Adjusted modal width for better fit
        closeIcon={
          <span style={{ fontSize: "16px", cursor: "pointer" }}>✖</span>
        } // Custom close icon
        okButtonProps={{
          style: {
            backgroundColor: "#c3935b", // Set background color to your preference
            color: "white", // Set text color to white
            border: "none", // Optional: Remove border
          },
        }}
        bodyStyle={{
          padding: 0, // Remove default padding
        }}
      >
        {/* Scrollable address content */}
        <div
          className="scrollable-address-content"
          style={{
            maxHeight: "550px", // Set a max-height for the scrollable section
            overflowY: "auto", // Enable vertical scrolling
            padding: "20px", // Add padding to match the modal design
          }}
        >
          <Radio.Group
            onChange={handleAddressChange}
            value={selectedAddressId}
            style={{ width: "100%" }}
          >
            <div
              className="address-container"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)", // Two columns
                gap: "15px", // Space between address blocks
              }}
            >
              {address?.map((address) => (
                <div
                  key={address.id}
                  className="address-block"
                  style={{
                    border: "1px solid #d9d9d9",
                    padding: "15px",
                    borderRadius: "5px",
                    boxSizing: "border-box",
                  }}
                >
                  <Radio value={address.id} style={{ display: "block" }}>
                    <div>
                      <div
                        className="address-name"
                        style={{ fontWeight: "bold", fontSize: "16px" }}
                      >
                        {`${address?.firstName} ${address?.lastName}`}
                      </div>
                      {address?.companyName && <div>{address?.companyName}</div>}
                      <div>{address?.streetAddress1}</div>
                      {address?.streetAddress2 && (
                        <div>{address?.streetAddress2}</div>
                      )}
                      <div>
                        {`${address?.city}, ${address?.countryArea} ${address?.postalCode}`}
                      </div>
                      {!objIsEmpty(address?.country) && (
                        <div>{address?.country?.country}</div>
                      )}
                      {address?.phone && (
                        <div>
                          <strong>Phone:</strong> {address?.phone}
                        </div>
                      )}
                    </div>
                  </Radio>
                </div>
              ))}
            </div>
          </Radio.Group>
        </div>
      </Modal>
    </div>
  );
};

export default BillingAddressModal;
