import { configureStore } from "@reduxjs/toolkit";
import { categoryReducer } from "./slices/category/categorySlice";
import { modalReducer } from "./slices/modal/modalSlice";
import { postReducer } from "./slices/post/postSlice";
import { tagReducer } from "./slices/tag/tagSlice";
import { toggleSlice } from "./slices/toggle/toggleSlice";
import { userReducer } from "./slices/user/userSlice";
import { authReducer } from "./slices/auth/authSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { profileReducer } from "./slices/profile/profileSlice";
import { messageReducer } from "./slices/message/messageSlice";
const persistConfig = {
  key: "root",
  version: 1,
  blacklist: ["toggle", "modal"],
  storage,
};

const reducer = combineReducers({
  toggle: toggleSlice.reducer,
  post: postReducer,
  category: categoryReducer,
  tags: tagReducer,
  modal: modalReducer,
  users: userReducer,
  auth: authReducer,
  profile: profileReducer,
  messages: messageReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
