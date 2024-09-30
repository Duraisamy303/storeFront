import {
  filterData,
  handleFilterSidebarClose,
} from "@/redux/features/shop-filter-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FinishFilter = ({ attributeList }) => {
  const dispatch = useDispatch();

  // Get the current filter from Redux state
  const filter = useSelector((state) => state.shopFilter.filterData);

  // Initialize checkedItems state from the filter data
  const [checkedItems, setCheckedItems] = useState(() => {});

  useEffect(() => {
    const initialState = {};
    const attributes = filter?.attributes || []; // Ensure attributes is an array
    attributes.forEach((attr) => {
      initialState[attr.slug.toLowerCase()] = Array.isArray(attr.values)
        ? attr.values
        : []; // Ensure values is an array
    });
    initialState;
    setCheckedItems(initialState);
  }, [filter]);


  const handleCheckboxChange = (attributeSlug, choiceSlug) => {
    // Create a new state object to avoid directly mutating checkedItems
    const normalizedAttributeSlug = attributeSlug.toLowerCase();
    const normalizedChoiceSlug = choiceSlug.toLowerCase();

    // Create a copy of the checkedItems state
    const newState = { ...checkedItems };

    // Initialize choices for the current attribute if it doesn't exist
    if (!newState[normalizedAttributeSlug]) {
      newState[normalizedAttributeSlug] = [];
    }

    // Toggle the selection of the choice
    if (newState[normalizedAttributeSlug].includes(normalizedChoiceSlug)) {
      // Remove the choice if it's already selected
      newState[normalizedAttributeSlug] = newState[
        normalizedAttributeSlug
      ].filter((slug) => slug !== normalizedChoiceSlug);
    } else {
      // Add the choice if it's not already selected
      newState[normalizedAttributeSlug] = [
        ...newState[normalizedAttributeSlug],
        normalizedChoiceSlug,
      ]; // Use spread to ensure immutability
    }

    // Clean up the attribute if no choices are left
    if (newState[normalizedAttributeSlug].length === 0) {
      delete newState[normalizedAttributeSlug];
    }

    // Convert newState into the final format
    const final = Object.keys(newState).map((slug) => ({
      slug,
      values: newState[slug],
    }));

    // Update the checked items state
    setCheckedItems(newState);

    const finalData = {
      attributes: final,
    };
    if (filter?.price) {
      finalData.price = filter.price;
    }

    // Dispatch only the current state of checked attributes
    dispatch(filterData(finalData)); // Dispatching the current checked state
  };

  return (
    <>
      {attributeList?.length > 0 &&
        attributeList.map((attribute) => {
          const normalizedAttributeSlug = attribute.slug.toLowerCase();
          return (
            <div key={attribute?.id} className="tp-shop-widget mb-50">
              <h3 className="tp-shop-widget-title">
                {attribute.name?.toUpperCase()}
              </h3>
              <div className="tp-shop-widget-content">
                <div className="tp-shop-widget-checkbox">
                  <ul className="filter-items filter-checkbox">
                    {attribute?.choices?.edges?.map((choice) => {
                      const normalizedChoiceSlug =
                        choice?.node?.slug.toLowerCase();
                      return (
                        <li
                          key={choice?.node?.slug}
                          className="filter-item checkbox"
                        >
                          <input
                            id={choice?.node?.slug}
                            type="checkbox"
                            checked={
                              checkedItems[normalizedAttributeSlug]?.includes(
                                normalizedChoiceSlug
                              ) || false
                            }
                            onChange={() =>
                              handleCheckboxChange(
                                attribute.slug,
                                choice?.node?.slug
                              )
                            }
                          />
                          <label htmlFor={choice?.node?.slug}>
                            {choice?.node?.name}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default FinishFilter;
