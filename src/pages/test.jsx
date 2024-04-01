import ErrorMsg from "@/components/common/error-msg";
import React, { useState } from "react";

const YourComponent = () => {


  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e, setInput) => {
    setInput(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const validateInputs = () => {
    const errors = {};

    if (!input1.trim()) {
      errors.input1 = "Input 1 is required";
    }
    if (!input2.trim()) {
      errors.input2 = "Input 2 is required";
    }

    if (isChecked) {
      if (!input3.trim()) {
        errors.input3 = "Input 3 is required";
      }
      if (!input4.trim()) {
        errors.input4 = "Input 4 is required";
      }
    }

    return errors;
  };

 const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateInputs();

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Form submission logic
      console.log("Form submitted successfully!");
    } else {
      console.log("Form contains errors!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Input 1:</label>
        <input
          type="text"
          value={input1}
          onChange={(e) => handleInputChange(e, setInput1)}
        />
        {errors.input1 && <span className="error">{errors.input1}</span>}
      </div>
      <div>
        <label>Input 2:</label>
        <input
          type="text"
          value={input2}
          onChange={(e) => handleInputChange(e, setInput2)}
        />
        {errors.input2 && <span className="error">{errors.input2}</span>}
      </div>
      <div>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label>Check to show additional inputs</label>
      </div>
      {isChecked && (
        <>
          <div>
            <label>Input 3:</label>
            <input
              type="text"
              value={input3}
              onChange={(e) => handleInputChange(e, setInput3)}
            />
            {errors.input3 && <ErrorMsg msg={errors.input3} />}

            {/* {errors.input3 && <span className="error">{errors.input3}</span>} */}
          </div>
          <div>
            <label>Input 4:</label>
            <input
              type="text"
              value={input4}
              onChange={(e) => handleInputChange(e, setInput4)}
            />
            {errors.input4 && <span className="error">{errors.input4}</span>}
          </div>
        </>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default YourComponent;
