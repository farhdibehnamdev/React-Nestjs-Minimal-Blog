import { createSlice } from "@reduxjs/toolkit";

interface ToggleState {
  toggle: boolean;
  toggleCardMessage: boolean;
}

const initialState: ToggleState = {
  toggle: true,
  toggleCardMessage: false,
};
export const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      state.toggle = action.payload;
    },
    toggleMessage: (state, action) => {
      state.toggleCardMessage = action.payload;
    },
  },
});

export const { toggleSidebar, toggleMessage } = toggleSlice.actions;
export default toggleSlice.reducer;
