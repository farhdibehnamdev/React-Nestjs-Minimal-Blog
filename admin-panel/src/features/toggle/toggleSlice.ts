import { createSlice } from "@reduxjs/toolkit";

interface ToggleState {
  toggle: boolean;
  toggleCardMessage: boolean;
  toggleCardNotification: boolean;
  toggleBottomToolbar: boolean;
}

const initialState: ToggleState = {
  toggle: true,
  toggleCardMessage: false,
  toggleCardNotification: false,
  toggleBottomToolbar: false,
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
    toggleNotification: (state, action) => {
      state.toggleCardNotification = action.payload;
    },
    toggleToolbar: (state, action) => {
      state.toggleBottomToolbar = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  toggleMessage,
  toggleNotification,
  toggleToolbar,
} = toggleSlice.actions;
export default toggleSlice.reducer;
