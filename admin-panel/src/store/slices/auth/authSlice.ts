import { createSlice } from "@reduxjs/toolkit";

type user = {
  id: number | string;
  email: string;
  role: string;
};

export type authState = {
  isAuthenticated: boolean;
  userInfo: user | null;
};

const initialState: authState = {
  isAuthenticated: false,
  userInfo: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
    },
    signOut: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
    },
  },
});
export const { signIn, signOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
