import { createSlice } from "@reduxjs/toolkit";

interface ToggleState {
  toggle: boolean;
}

const initialState: ToggleState = {
  toggle: true,
};
export const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      state.toggle = action.payload;
      console.log(state.toggle);
    },
  },
});

export const { toggleSidebar } = toggleSlice.actions;
export default toggleSlice.reducer;
