import { useState } from "react";
import Swal from "sweetalert2";

export const capitalizeFLetter = (string = "") => {
  if (string.length > 0) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return string;
};

export const useSetState = (initialState) => {
  const [state, setState] = useState(initialState);

  const newSetState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };
  return [state, newSetState];
};

export const getPrice = () => {
  let price;
};

export const shortData = (selectValue, products) => {
  if (!selectValue || !products?.length) {
    return null;
  }

  let product_items = [...products];

  if (selectValue === "Low to High") {
    product_items.sort((a, b) => {
      const priceA =
        Number(a?.node?.pricing?.priceRange?.start?.gross?.amount) || 0;
      const priceB =
        Number(b?.node?.pricing?.priceRange?.start?.gross?.amount) || 0;
      return priceA - priceB;
    });
  } else if (selectValue === "High to Low") {
    product_items.sort((a, b) => {
      const priceA =
        Number(a?.node?.pricing?.priceRange?.start?.gross?.amount) || 0;
      const priceB =
        Number(b?.node?.pricing?.priceRange?.start?.gross?.amount) || 0;
      return priceB - priceA;
    });
  } else if (selectValue === "New Added") {
    product_items.sort((a, b) => {
      const dateA = new Date(a?.node?.created) || new Date();
      const dateB = new Date(b?.node?.created) || new Date();
      return dateB - dateA;
    });
  } else if (selectValue === "On Sale") {
    product_items = products.filter((p) => p.node.pricing.discount > 0);
  }

  return product_items;
};

export const checkChannel = () => {
  let channel = "";
  const channels = localStorage.getItem("channel");
  if (!channels) {
    channel = "india-channel";
  } else {
    channel = channels;
  }
  return channel;
};

export const validLoginAndReg = () => {
  let valid = false;
  const user = localStorage.getItem("userInfo");
  const token = localStorage.getItem("token");

  if (!user) {
    valid = false;
  } else if (!token) {
    valid = false;
  } else {
    valid = true;
  }
  return valid;
};

export const roundOff = (price) => {
  let round = "";
  if (price) {
    round = Math.ceil(price)?.toFixed(2);
  } else {
    round = price;
  }
  return round;
};

export const RegularPrice = (costPrice, sale) => {
  let price = false;
  if (costPrice) {
    if (costPrice == sale) {
      price = false;
    } else if (costPrice > sale) {
      price = true;
    }
  }
  return price;
};

export const getUniqueStates = (states) => {
  const uniqueStates = [];
  const seen = new Set();

  states.forEach((state) => {
    if (!seen.has(state.raw)) {
      uniqueStates.push(state);
      seen.add(state.raw);
    }
  });

  return uniqueStates;
};

export const slider_setting = {
  slidesPerView: 4,
  spaceBetween: 10,
  navigation: {
    prevEl: ".tp-related-slider-button-prev",
    nextEl: ".tp-related-slider-button-next",
  },
  autoplay: {
    delay: 5000,
  },
  breakpoints: {
    1200: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 2,
    },
    576: {
      slidesPerView: 2,
    },
    350: {
      slidesPerView: 2,
    },
    0: {
      slidesPerView: 1,
    },
  },
};

export const addCommasToNumber = (value) => {
  let values = null;
  if (typeof value === "number") {
    values = value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  } else {
    values = value;
  }
  return values;
};

export const mergeAndRemoveDuplicates = (arr1, arr2) => {
  // Merge the two arrays
  const combinedArray = [...arr1, ...arr2];

  // Use a Set to keep track of unique IDs
  const uniqueIds = new Set();

  // Filter the combined array to remove duplicates based on the 'id' property
  const uniqueArray = combinedArray.filter((item) => {
    if (uniqueIds.has(item.id)) {
      return false;
    } else {
      uniqueIds.add(item.id);
      return true;
    }
  });

  return uniqueArray;
};

export const removeduplicate = (arr) => {
  const uniqueData = arr.reduce((acc, current) => {
    const x = acc.find((item) => item.id === current.id);
    if (!x) {
      acc.push(current);
    }
    return acc;
  }, []);
  return uniqueData;
};

export const getParamsFromUrl = (url) => {
  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);
  return {
    email: params.get("email"),
    token: params.get("token"),
  };
};

export const getValueByKey = (metadata, keyToFind) => {
  const foundItem = metadata?.find((item) => item?.key === keyToFind);
  return foundItem ? foundItem?.value : null;
};

export const sortingBy = (e) => {
  let sortBy;
  if (e.value == "Default Sorting") {
    sortBy = { direction: "ASC", field: "ORDER_NO" };
  }
  if (e.value == "Low to High") {
    sortBy = { direction: "ASC", field: "PRICE" };
  }
  if (e.value == "High to Low") {
    sortBy = { direction: "DESC", field: "PRICE" };
  }
  if (e.value == "New Added") {
    sortBy = { direction: "DESC", field: "CREATED_AT" };
  }
  return sortBy;
};

export const showDeleteAlert = (onConfirm, onCancel, title) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn confirm-btn", // Add a custom class for the confirm button
      cancelButton: "btn cancel-btn", // Add a custom class for the cancel button
      popup: "sweet-alerts",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: title ? title : "Are you sure to cancel order?",
      // text: "You won't be able to Delete this!",
      icon: "warning",
      showCancelButton: true,
      // confirmButtonText: 'Yes, delete it!',
      // cancelButtonText: 'No, cancel!',
      reverseButtons: true,
      padding: "2em",
    })
    .then((result) => {
      if (result.isConfirmed) {
        onConfirm(); // Call the onConfirm function if the user confirms the deletion
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        onCancel(); // Call the onCancel function if the user cancels the deletion
      }
    });
};

export const objIsEmpty = (obj) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false; // Found a property, so the object is not empty
    }
  }
  return true; // No properties found, object is empty
};

export const formatCurrency = (currency) => {
  if (currency === "INR") {
    return "₹";
  } else {
    return "$";
  }
};
