import { createSlice } from "@reduxjs/toolkit";
import { fetchSentMessages } from "src/store/thunks/messageThunks/fetchSentMessages";
type messagesData = {
  id: number | null;
  messageTitle: string;
  messageBody: string;
};

export type messageState = {
  isLoading: boolean;
  data: messagesData[];
  count: number;
  error: string | null;
};

const initialState: messageState = {
  isLoading: false,
  data: [],
  count: 0,
  error: null,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //============ Fetch Sent Messages =================
    builder.addCase(fetchSentMessages.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSentMessages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      state.count = action.payload.count;
    });
    builder.addCase(fetchSentMessages.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });

    //============ Fetch Sent Messages =================

    builder.addCase(fetchReceivedMessages.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchReceivedMessages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      state.count = action.payload.count;
    });
    builder.addCase(fetchReceivedMessages.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
  },
});
