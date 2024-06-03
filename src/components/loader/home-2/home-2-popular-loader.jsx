import React from "react";
import Loader from "../loader";

function SingleLoader({ loading }) {
  return (
    <div
      className="col d-flex align-items-center justify-content-center"
      style={{ height: "250px" }}
    >
      <Loader loading={loading} color="821F40" />
    </div>
  );
}

const HomeTwoPopularPrdLoader = ({loading}) => {
  return (
    <div className="text-center">
      <SingleLoader loading={loading} />
      {/* <SingleLoader loading={loading} />
      <SingleLoader loading={loading} />
      <SingleLoader loading={loading} />
      <SingleLoader loading={loading} /> */}
    </div>
  );
};

export default HomeTwoPopularPrdLoader;
