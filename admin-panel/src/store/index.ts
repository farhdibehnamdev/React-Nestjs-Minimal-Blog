import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./slices/category/categorySlice";
import { modalReducer } from "./slices/modal/modalSlice";
import { postSlice } from "./slices/post/postSlice";
import { tagReducer } from "./slices/tag/tagSlice";
import { toggleSlice } from "./slices/toggle/toggleSlice";
const store = configureStore({
  reducer: {
    toggle: toggleSlice.reducer,
    post: postSlice.reducer,
    category: categorySlice.reducer,
    tags: tagReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
