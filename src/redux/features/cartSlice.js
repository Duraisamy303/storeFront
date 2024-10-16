import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "@/utils/localstorage";
import { notifyError, notifySuccess } from "@/utils/toast";

const initialState = {
  cart_products: [],
  orderQuantity: 1,
  cartMiniOpen: false,
  cart_list: [],
  compare_list: [],
  checkout_token: "",
  userMiniOpen: false,
  isPreOrderAndGiftCart: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add_cart_product: (state, { payload }) => {
      const { cart_products, orderQuantity } = state;
      const cartProductsArray = JSON.parse(JSON.stringify(cart_products));
      const orderQuantitys = JSON.parse(JSON.stringify(orderQuantity));

      const updatedCartProducts = [...cartProductsArray]; // Create a copy of cart_products array

      const existingProductIndex = updatedCartProducts.findIndex(
        (item) => item.id === payload.id
      );

      if (existingProductIndex === -1) {
        // Product does not exist in cart
        const newItem = {
          ...payload,
          orderQuantity,
        };
        updatedCartProducts.push(newItem);
        notifySuccess(`${orderQuantity} ${payload.name} added to cart`);
      } else {
        // Product exists in cart
        const existingProduct = updatedCartProducts[existingProductIndex];

        if (
          existingProduct.quantity >=
          existingProduct.orderQuantity + orderQuantitys
        ) {
          existingProduct.orderQuantity +=
            orderQuantity !== 1 ? orderQuantity : 1;
          notifySuccess(
            `${orderQuantity} ${existingProduct.title} added to cart`
          );
        } else {
          notifyError("No more quantity available for this product!");
        }
      }

      setLocalStorage("cart_products", updatedCartProducts);

      return { ...state, cart_products: updatedCartProducts }; // Return new state object with updated cart_products
    },

    cart_list: (state, { payload }) => {
      state.cart_list = payload; // Return new state object with updated cart_products
    },

    add_compare: (state, { payload }) => {
      state.compare_list = payload; // Return new state object with updated cart_products
    },

    compare_list: (state, { payload }) => {
      state.compare_list = payload; // Return new state object with updated cart_products
    },

    checkout_token: (state, { payload }) => {
      state.checkout_token = payload; // Return new state object with updated cart_products
    },

    isPreOrderAndGiftCart: (state, { payload }) => {
      state.isPreOrderAndGiftCart = payload; // Return new state object with updated cart_products
    },

    increment: (state, { payload }) => {
      state.orderQuantity = state.orderQuantity + 1;
    },
    decrement: (state, { payload }) => {
      state.orderQuantity =
        state.orderQuantity > 1
          ? state.orderQuantity - 1
          : (state.orderQuantity = 1);
    },
    quantityDecrement: (state, { payload }) => {
      state.cart_products.map((item) => {
        if (item._id === payload._id) {
          if (item.orderQuantity > 1) {
            item.orderQuantity = item.orderQuantity - 1;
          }
        }
        return { ...item };
      });
      setLocalStorage("cart_products", state.cart_products);
    },
    remove_product: (state, { payload }) => {
      state.cart_products = state.cart_products.filter(
        (item) => item.id !== payload.id
      );
      setLocalStorage("cart_products", state.cart_products);
      notifyError(`${payload.name} Remove from cart`);
    },
    get_cart_products: (state, action) => {
      state.cart_products = getLocalStorage("cart_products");
    },
    initialOrderQuantity: (state, { payload }) => {
      state.orderQuantity = 1;
    },
    clearCart: (state) => {
      const isClearCart = window.confirm(
        "Are you sure you want to remove all items ?"
      );
      if (isClearCart) {
        state.cart_products = [];
      }
      setLocalStorage("cart_products", state.cart_products);
    },
    openCartMini: (state, { payload }) => {
      state.cartMiniOpen = true;
    },
    closeCartMini: (state, { payload }) => {
      state.cartMiniOpen = false;
    },

    openUserSidebar: (state, { payload }) => {
      state.userMiniOpen = true;
    },
    closeUserSidebar: (state, { payload }) => {
      state.userMiniOpen = false;
    },
  },
});

export const {
  add_cart_product,
  cart_list,
  compare_list,
  add_compare,
  increment,
  decrement,
  get_cart_products,
  remove_product,
  quantityDecrement,
  initialOrderQuantity,
  clearCart,
  closeCartMini,
  openCartMini,
  checkout_token,
  openUserSidebar,
  closeUserSidebar,
  isPreOrderAndGiftCart
} = cartSlice.actions;
export default cartSlice.reducer;
