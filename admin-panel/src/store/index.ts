import { configureStore } from "@reduxjs/toolkit";
import { categoryReducer } from "./slices/category/categorySlice";
import { modalReducer } from "./slices/modal/modalSlice";
import { postReducer } from "./slices/post/postSlice";
import { tagReducer } from "./slices/tag/tagSlice";
import { toggleSlice } from "./slices/toggle/toggleSlice";
const store = configureStore({
  reducer: {
    toggle: toggleSlice.reducer,
    post: postReducer,
    category: categoryReducer,
    tags: tagReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
