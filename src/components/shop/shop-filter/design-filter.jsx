import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { handleFilterSidebarClose } from "@/redux/features/shop-filter-slice";
import { useGetStyleListQuery } from "@/redux/features/productApi";
import { useGetDesignListQuery } from "../../../redux/features/productApi";

const DesignFilter = ({
  setCurrPage,
  shop_right = false,
  finishFilterData,
}) => {
  const { data: finishData, isError, isLoading } = useGetDesignListQuery();

  const [finishList, setFinishList] = useState([]);
  const [checkedItem, setCheckedItem] = useState(null);

  useEffect(() => {
    if (
      finishData &&
      finishData?.data &&
      finishData?.data?.productDesigns &&
      finishData?.data?.productDesigns?.edges
    ) {
      const list = finishData?.data?.productDesigns?.edges;
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

  const handleCheckboxChange = (item) => {
    setCheckedItem(item);
    finishFilterData(item, "design");
  };

  return (
    <div className="tp-shop-widget mb-50">
      <h3 className="tp-shop-widget-title">FILTER BY DESIGNS</h3>
      <div className="tp-shop-widget-content">
        <div className="tp-shop-widget-checkbox">
          <ul className="filter-items filter-checkbox">
            {finishList?.map((s, i) => (
              <li key={i?.id} className="filter-item checkbox">
                <input
                  id={s?.id}
                  type="checkbox"
                  readOnly
                  checked={s?.id === checkedItem}
                  onChange={() => handleCheckboxChange(s?.id)}
                />
                <label
                  onClick={() => handleCheckboxChange(s?.id)}
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

export default DesignFilter;
