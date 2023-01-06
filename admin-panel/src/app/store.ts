import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "../features/category/categorySlice";
import { postSlice } from "../features/post/postSlice";
import { toggleSlice } from "../features/toggle/toggleSlice";

const store = configureStore({
  reducer: {
    toggle: toggleSlice.reducer,
    post: postSlice.reducer,
    category: categorySlice.reducer,
  },
});

export default store;
