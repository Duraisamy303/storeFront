import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  handleFilterSidebarClose,
  filterData,
} from "@/redux/features/shop-filter-slice";
import {
  useGetFinishListQuery,
  useGetStyleListQuery,
  useGetDesignListQuery,
} from "@/redux/features/productApi";
import { useGetStoneListQuery } from "../../../redux/features/productApi";
import { mergeAndRemoveDuplicates } from "@/utils/functions";
import { filterByStock } from "@/utils/constant";

const FinishFilter = ({ setCurrPage, shop_right = false }) => {
  const filter = useSelector((state) => state.shopFilter.filterData);

  const dispatch = useDispatch();

  const { data: finishData } = useGetFinishListQuery();

  const { data: styleData } = useGetStyleListQuery();

  const { data: designData } = useGetDesignListQuery();

  const { data: stoneData } = useGetStoneListQuery();

  const [finishList, setFinishList] = useState([]);

  const [styleList, setStyleList] = useState([]);

  const [designList, setDesignList] = useState([]);

  const [stoneList, setStoneList] = useState([]);

  const [checkedItem, setCheckedItem] = useState([]);

  useEffect(() => {
    if (
      finishData &&
      finishData?.data &&
      finishData?.data?.productFinishes &&
      finishData?.data?.productFinishes?.edges
    ) {
      const list = finishData?.data?.productFinishes?.edges;
      if (list?.length > 0) {
        const modify = list?.map((item) => ({ ...item.node, type: "finish" }));

        setFinishList(modify);
      }
    }
  }, [finishData]);

  useEffect(() => {
    if (
      styleData &&
      styleData?.data &&
      styleData?.data?.productStyles &&
      styleData?.data?.productStyles?.edges
    ) {
      const list = styleData?.data?.productStyles?.edges;
      if (list?.length > 0) {
        const modify = list?.map((item) => ({ ...item.node, type: "style" }));

        setStyleList(modify);
      }
    }
  }, [styleData]);

  useEffect(() => {
    if (
      designData &&
      designData?.data &&
      designData?.data?.productDesigns &&
      designData?.data?.productDesigns?.edges
    ) {
      const list = designData?.data?.productDesigns?.edges;
      if (list?.length > 0) {
        const modify = list?.map((item) => ({ ...item.node, type: "design" }));

        setDesignList(modify);
      }
    }
  }, [designData]);

  useEffect(() => {
    if (
      stoneData &&
      stoneData?.data &&
      stoneData?.data?.productStoneTypes &&
      stoneData?.data?.productStoneTypes?.edges
    ) {
      const list = stoneData?.data?.productStoneTypes?.edges;
      if (list?.length > 0) {
        const modify = list?.map((item) => ({ ...item.node, type: "stone" }));
        setStoneList(modify);
      }
    }
  }, [stoneData]);

  useEffect(() => {
    const initialCheckedItems = [
      ...finishList,
      ...styleList,
      ...designList,
      ...stoneList,
      ...filterByStock,
    ].filter((item) =>
      filter?.some(
        (checkedItem) =>
          checkedItem.id === item.id && checkedItem.type === item.type
      )
    );

    setCheckedItem(initialCheckedItems);
  }, [finishList, styleList, stoneList, designList, filter]);

  const handleCheckboxChange = (data, type) => {
    let item = {
      ...data,
      type,
    };
    let filters = [...filter];

    if (type === "stock") {
      let allVal;
      const isChecked = filters?.some(
        (selectedItem) =>
          selectedItem.id === item.id && selectedItem.type === item.type
      );
      if (isChecked) {
        allVal = filters.filter(
          (selectedItem) => selectedItem.type !== item.type
        );
      } else {
        allVal = [
          ...filters.filter((selectedItem) => selectedItem.type !== item.type),
          item,
        ];
      }

      setCheckedItem(allVal);
      dispatch(filterData(allVal));
      dispatch(handleFilterSidebarClose());
    } else {
      const isChecked = filters?.some(
        (selectedItem) =>
          selectedItem.id === item.id && selectedItem.type === item.type
      );

      let updatedItems;
      if (isChecked) {
        updatedItems = filters?.filter(
          (selectedItem) =>
            selectedItem.id !== item.id || selectedItem.type !== item.type
        );
        filters = updatedItems;
      } else {
        updatedItems = [
          ...checkedItem.filter((selectedItem) => selectedItem.type !== type),
          item,
        ];
      }

      const arr = mergeAndRemoveDuplicates(updatedItems, filters);
      setCheckedItem(arr);
      dispatch(filterData(arr));
      dispatch(handleFilterSidebarClose());
    }
  };

  return (
    <>
      <div className="tp-shop-widget mb-50">
        <h3 className="tp-shop-widget-title">FILTER BY STOCK</h3>
        <div className="tp-shop-widget-content">
          <div className="tp-shop-widget-checkbox">
            <ul className="filter-items filter-checkbox">
              {filterByStock?.map((s, i) => (
                <li key={s?.id} className="filter-item checkbox">
                  <input
                    id={s?.id}
                    type="radio"
                    name="stock" // Group all stock items under the same name to enforce radio behavior
                    readOnly
                    checked={checkedItem.some(
                      (selectedItem) => selectedItem.id === s.id
                    )}
                    onChange={() => handleCheckboxChange(s, "stock")}
                  />
                  <label
                    onClick={() => handleCheckboxChange(s, "stock")}
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
      <div className="tp-shop-widget mb-50">
        <h3 className="tp-shop-widget-title">FILTER BY FINISH</h3>
        <div className="tp-shop-widget-content">
          <div className="tp-shop-widget-checkbox">
            <ul className="filter-items filter-checkbox">
              {finishList?.map((s, i) => (
                <li key={i?.id} className="filter-item checkbox">
                  <input
                    id={s?.id}
                    type="checkbox"
                    readOnly
                    checked={checkedItem?.some(
                      (selectedItem) => selectedItem.id === s.id
                    )}
                    onChange={() => handleCheckboxChange(s, "finish")}
                  />
                  <label
                    onClick={() => handleCheckboxChange(s, "finish")}
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

      <div className="tp-shop-widget mb-50">
        <h3 className="tp-shop-widget-title">FILTER BY STYLE</h3>
        <div className="tp-shop-widget-content">
          <div className="tp-shop-widget-checkbox">
            <ul className="filter-items filter-checkbox">
              {styleList?.map((s, i) => (
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

      <div className="tp-shop-widget mb-50">
        <h3 className="tp-shop-widget-title">FILTER BY DESIGNS</h3>
        <div className="tp-shop-widget-content">
          <div className="tp-shop-widget-checkbox">
            <ul className="filter-items filter-checkbox">
              {designList?.map((s, i) => (
                <li key={i?.id} className="filter-item checkbox">
                  <input
                    id={s?.id}
                    type="checkbox"
                    readOnly
                    checked={checkedItem.some(
                      (selectedItem) => selectedItem.id === s.id
                    )}
                    onChange={() => handleCheckboxChange(s, "design")}
                  />
                  <label
                    onClick={() => handleCheckboxChange(s, "design")}
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

      <div className="tp-shop-widget mb-50">
        <h3 className="tp-shop-widget-title">FILTER BY STONE TYPE</h3>
        <div className="tp-shop-widget-content">
          <div className="tp-shop-widget-checkbox">
            <ul className="filter-items filter-checkbox">
              {stoneList?.map((s, i) => (
                <li key={i?.id} className="filter-item checkbox">
                  <input
                    id={s?.id}
                    type="checkbox"
                    readOnly
                    checked={checkedItem.some(
                      (selectedItem) => selectedItem.id === s.id
                    )}
                    onChange={() => handleCheckboxChange(s, "stone")}
                  />
                  <label
                    onClick={() => handleCheckboxChange(s, "stone")}
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
    </>
  );
};

export default FinishFilter;
