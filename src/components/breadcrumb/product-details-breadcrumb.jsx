import React from "react";
import { SmDot } from "@/svg";

const ProductDetailsBreadcrumb = ({ category, title }) => {
  return (
    <section className="breadcrumb__area breadcrumb__style-2 include-bg pb-20">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xxl-12">
            <div className="breadcrumb__content p-relative z-index-1">
              <div>
                <span className="breadcrumb-icon"></span>
                <span>
                  <a href="#">Home</a>
                </span>{" "}
                /
                <span>
                  <a href="#"> {category}</a>
                </span>
                {/* <span>{title}</span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsBreadcrumb;
