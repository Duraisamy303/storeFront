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
      state.wishlist = payload;
    },

    remove_wishlist_product: (state, { payload }) => {
      state.wishlist = payload;
    },
    get_wishlist_products: (state, { payload }) => {
      state.wishlist = payload;
    },
  },
});

export const {
  add_to_wishlist,
  remove_wishlist_product,
  get_wishlist_products,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
