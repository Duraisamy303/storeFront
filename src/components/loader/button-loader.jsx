import React from "react";
import { ClipLoader } from "react-spinners";

const ButtonLoader = ({color="white",size=20}) => {
  return (
    <div className="text-center">
      <ClipLoader color={color} size={size} />
    </div>
  );
};

export default ButtonLoader;
