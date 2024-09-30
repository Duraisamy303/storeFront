import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterSidebar: false,
  filterData:{}
};

export const shopFilterSlice = createSlice({
  name: "shopFilter",
  initialState,
  reducers: {
    handleFilterSidebarOpen: (state, { payload }) => {
      state.filterSidebar = true;
    },
    handleFilterSidebarClose: (state, { payload }) => {
      state.filterSidebar = false;
    },
    filterData: (state, { payload }) => {
      state.filterData = payload;
    },
  },
});

export const { handleFilterSidebarOpen, handleFilterSidebarClose,filterData } =
  shopFilterSlice.actions;
export default shopFilterSlice.reducer;
