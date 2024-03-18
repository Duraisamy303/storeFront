import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "@/utils/localstorage";
import { notifyError, notifySuccess } from "@/utils/toast";

const initialState = {
  wishlist: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    add_to_wishlist: (state, { payload }) => {
      const local = getLocalStorage("wishlist_items");
      console.log("local: ", local);
      const { wishlist } = state;
      let cartProductsArray = JSON.parse(JSON.stringify(wishlist));
      console.log("cartProductsArray: ", cartProductsArray);
      let updatedCartProducts = [...cartProductsArray]; // Create a copy of cart_products array

      const existingProductIndex = updatedCartProducts.findIndex(
        (item) => item.id === payload.id
      );
      console.log("existingProductIndex: ", existingProductIndex);


      if (existingProductIndex === -1) {
        updatedCartProducts.push(payload);
        notifySuccess(`${payload.name} added to wishlist`);
      } else {
        updatedCartProducts = updatedCartProducts.filter(
          (item) => item.id !== payload.id
        );

        notifyError(`${payload.name} removed from wishlist`);
      }
      setLocalStorage("wishlist_items", updatedCartProducts);
    },

    remove_wishlist_product: (state, { payload }) => {
      state.wishlist = state.wishlist.filter((item) => item._id !== payload.id);
      notifyError(`${payload.title} removed from wishlist`);
      setLocalStorage("wishlist_items", state.wishlist);
      notifyError(`${payload.title} removed from wishlist`);
    },
    get_wishlist_products: (state, { payload }) => {
      state.wishlist = getLocalStorage("wishlist_items");
    },
  },
});

export const {
  add_to_wishlist,
  remove_wishlist_product,
  get_wishlist_products,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
