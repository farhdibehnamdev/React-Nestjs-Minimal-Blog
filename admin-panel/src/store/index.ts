import { configureStore } from "@reduxjs/toolkit";
import { categoryReducer } from "./slices/category/categorySlice";
import { modalReducer } from "./slices/modal/modalSlice";
import { postReducer } from "./slices/post/postSlice";
import { tagReducer } from "./slices/tag/tagSlice";
import { toggleSlice } from "./slices/toggle/toggleSlice";
import { userReducer } from "./slices/user/userSlice";
const store = configureStore({
  reducer: {
    toggle: toggleSlice.reducer,
    post: postReducer,
    category: categoryReducer,
    tags: tagReducer,
    modal: modalReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
