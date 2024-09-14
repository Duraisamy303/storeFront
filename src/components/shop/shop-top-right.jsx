import React from "react";
import { useDispatch } from "react-redux";
// internal
import { Filter } from "@/svg";
import NiceSelect from "@/ui/nice-select";
import { handleFilterSidebarOpen } from "@/redux/features/shop-filter-slice";

const ShopTopRight = ({ selectHandleFilter }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="tp-shop-top-right d-flex align-items-center justify-content-md-end justify-content-between relative"
      // style={{ zIndex: 9999, minHeight: 250 }}
    >
      <div className="tp-shop-top-select relative z-10">
        <NiceSelect
          options={[
            { value: "New Added", text: "Sort by Latest" },
            { value: "Default Sorting", text: "Default Sorting" },
            { value: "Low to High", text: "Sort by Price: Low to High" },
            { value: "High to Low", text: "Sort by Price: High to Low" },
            // { value: "On Sale", text: "On Sale" },
          ]}
          defaultCurrent={0}
          onChange={selectHandleFilter}
          name="Default Sorting"
        />
      </div>
      <div className="tp-shop-top-filter">
        <button
          onClick={() => dispatch(handleFilterSidebarOpen())}
          type="button"
          className="tp-filter-btn"
        >
          <span>
            <Filter />
          </span>
          Filter
        </button>
      </div>
    </div>
  );
};

export default ShopTopRight;
