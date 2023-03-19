import { createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import { fetchMessagesData } from "./api";
import { fetchMessagesArgs, messagesDataType } from "./messages.type";

export const fetchSentMessages: AsyncThunk<
  messagesDataType,
  fetchMessagesArgs,
  {}
> = createAsyncThunk(
  "message/fetchSentMessages",
  async (args, { rejectWithValue }) => {
    try {
      const response = await fetchMessagesData(
        args.all,
        args.userId,
        args.messageType,
        {
          pagination: args.pagination,
          title: args.title,
        }
      );
      return response.data;
    } catch (err: fetchMessagesData) {
      return rejectWithValue(err.response.data);
    }
  }
);
