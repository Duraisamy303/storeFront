import { useState } from "react";

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
