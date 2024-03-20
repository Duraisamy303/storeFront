import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  accessToken: undefined,
  user: undefined,
};

const cardSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    cart_count: (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.user = payload.user;
    },

   
  },
});

export const { cart_count } = cardSlice.actions;
export default cardSlice.reducer;
