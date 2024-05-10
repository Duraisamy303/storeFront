import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  filterData,
  handleFilterSidebarClose,
} from "@/redux/features/shop-filter-slice";
import { useGetStyleListQuery } from "@/redux/features/productApi";

const StyleFilter = ({ setCurrPage, shop_right = false, finishFilterData }) => {
  const { data: finishData, isError, isLoading } = useGetStyleListQuery();
  const filter = useSelector((state) => state.shopFilter.filterData);
  const [finishList, setFinishList] = useState([]);
  const [checkedItem, setCheckedItem] = useState([]);

  useEffect(() => {
    if (
      finishData &&
      finishData?.data &&
      finishData?.data?.productStyles &&
      finishData?.data?.productStyles?.edges
    ) {
      const list = finishData?.data?.productStyles?.edges;
      if (list?.length > 0) {
        const modify = list?.map((item) => item.node);
        setFinishList(modify);
      }
    }
  }, [finishData]);

  const router = useRouter();
  const dispatch = useDispatch();
  const status = ["On sale", "In Stock"];

  // handle status route
  const handleStatusRoute = (status) => {
    setCurrPage(1);
    router.push(
      `/${shop_right ? "shop-right-sidebar" : "shop"}?status=${status
        .toLowerCase()
        .replace("&", "")
        .split(" ")
        .join("-")}`
    );
    dispatch(handleFilterSidebarClose());
  };

  const handleCheckboxChange = (item, type) => {
    const isChecked = checkedItem.some(
      (selectedItem) => selectedItem.id === item.id
    );
    let arr = [];

    // Unselect all items if the clicked item is already selected
    if (isChecked) {
      arr = [];
    } else {
      arr = [{ ...item, type }];
    }

    setCheckedItem(arr);
  };

  useEffect(() => {
    if (checkedItem?.length > 0) {
      if (filter?.length > 0) {
        dispatch(filterData([...filter, checkedItem]));
      } else {
        dispatch(filterData(...filter, checkedItem));
      }
    }
  }, [checkedItem]);

  return (
    <div className="tp-shop-widget mb-50">
      <h3 className="tp-shop-widget-title">FILTER BY STYLE</h3>
      <div className="tp-shop-widget-content">
        <div className="tp-shop-widget-checkbox">
          <ul className="filter-items filter-checkbox">
            {finishList?.map((s, i) => (
              <li key={i?.id} className="filter-item checkbox">
                <input
                  id={s?.id}
                  type="checkbox"
                  readOnly
                  checked={checkedItem.some(
                    (selectedItem) => selectedItem.id === s.id
                  )}
                  onChange={() => handleCheckboxChange(s, "style")}
                />
                <label
                  onClick={() => handleCheckboxChange(s, "style")}
                  htmlFor={s?.name}
                >
                  {s?.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StyleFilter;
