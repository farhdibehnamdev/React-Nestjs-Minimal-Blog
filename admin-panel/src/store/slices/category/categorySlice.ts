import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: [],
  reducers: {
    addCategory: (state: any, action: any) => {
      state.push(action.payload);
    },
  },
});
export const { addCategory } = categorySlice.actions;

export default categorySlice;
