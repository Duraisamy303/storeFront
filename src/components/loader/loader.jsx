import React from "react";
import { FadeLoader, BarLoader } from "react-spinners";

const Loader = ({ loading, spinner = "fade",color="rgb(195 142 48)" }) => {
  return (
    <div className="text-center">
      {spinner === "scale" && (
      <img src="/assets/img/Prade-Logo-Giff.gif" alt="Loading..." />
      )}
      {spinner === "fade" && <img src="/assets/img/Prade-Logo-Giff.gif" alt="Loading..." />}
    </div>
  );
};

export default Loader;
