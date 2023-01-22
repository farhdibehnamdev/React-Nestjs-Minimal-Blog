import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./slices/category/categorySlice";
import { postSlice } from "./slices/post/postSlice";
import { tagReducer } from "./slices/tag/tagSlice";
import { toggleSlice } from "./slices/toggle/toggleSlice";

const store = configureStore({
  reducer: {
    toggle: toggleSlice.reducer,
    post: postSlice.reducer,
    category: categorySlice.reducer,
    tags: tagReducer,
  },
});

export default store;
