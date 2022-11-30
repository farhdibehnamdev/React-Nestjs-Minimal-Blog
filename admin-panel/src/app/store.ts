import { configureStore } from "@reduxjs/toolkit";
import { toggleSlice } from "../features/toggle/toggleSlice";

const store = configureStore({
  reducer: {
    toggle: toggleSlice.reducer,
  },
});

export default store;
