import { createSlice } from "@reduxjs/toolkit";

type modalType = {
  isOpen: boolean;
  isDeleted: boolean;
};
const initialState: modalType = {
  isOpen: false,
  isDeleted: false,
};
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = action.payload;
    },
    closeModal: (state, action) => {
      state.isOpen = action.payload;
    },
    deleteItemConfirm: (state, action) => {
      state.isDeleted = action.payload;
    },
  },
});

export const modalReducer = modalSlice.reducer;
export const { openModal, closeModal, deleteItemConfirm } = modalSlice.actions;
