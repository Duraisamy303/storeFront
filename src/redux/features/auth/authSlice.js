import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.user = payload.user;
      state.refreshToken = payload.refreshToken;
    },
    userLoggedOut: (state) => {
      // localStorage.clear()
      state=initialState
      Cookies.remove('userInfo');
      // localStorage.clear();

    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
