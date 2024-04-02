import { useSetState } from "@/utils/functions";
import React, { useState } from "react";

const CheckboxComponent = () => {
  const [state, setState] = useSetState({
    paymentType: [
      { id: 1, label: "COD", checked: false },
      { id: 2, label: "Razorpay", checked: false },
    ],
  });

  const handleCheckboxChange = (id) => {
    const updatedCheckboxes = state.paymentType.map((checkbox) =>
      checkbox.id === id
        ? { ...checkbox, checked: true }
        : { ...checkbox, checked: false }
    );
    setState({ paymentType: updatedCheckboxes });
    // setCheckboxes(updatedCheckboxes);
  };

  // const getCheckedId = () => {
  //   const checkedCheckbox = checkboxes.find((checkbox) => checkbox.checked);
  //   return checkedCheckbox ? checkedCheckbox.id : null;
  // };

  return (
    <div>
      {state.paymentType.map((checkbox) => (
        <div key={checkbox.id}>
          <label>
            <input
              type="checkbox"
              checked={checkbox.checked}
              onChange={() => handleCheckboxChange(checkbox.id)}
            />
            {checkbox.label}
          </label>
        </div>
      ))}
      {/* <p>Checked ID: {getCheckedId()}</p> */}
    </div>
  );
};

export default CheckboxComponent;
