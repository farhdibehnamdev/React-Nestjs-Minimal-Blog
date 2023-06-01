import { createSlice } from "@reduxjs/toolkit";
import { messagesDataType } from "src/components/common/common.type";
import { createMessageThunk } from "src/store/thunks/messageThunks/createMessage";
import { fetchReceivedMessages } from "src/store/thunks/messageThunks/fetchReceivedMessages";
import { fetchSentMessages } from "src/store/thunks/messageThunks/fetchSentMessages";

export type messageState = {
  isLoading: boolean;
  data: messagesDataType[];
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
    //============ Fetch Received Messages =================

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
      state.error = action.error as string;
    });
    //============ Create Message =================
    builder.addCase(createMessageThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createMessageThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload.data);
    });
    builder.addCase(createMessageThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = state.error as string;
    });
  },
});

export const messageReducer = messageSlice.reducer;
