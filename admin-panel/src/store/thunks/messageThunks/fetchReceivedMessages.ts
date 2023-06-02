import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import {
  fetchReceivedMessagesApi,
  receivedMessagesDataType,
} from "src/config/api/messagesApi/messagesApi";

export const fetchReceivedMessages = createAsyncThunk(
  "receivedMessages/fetch",
  async (args: any, { rejectWithValue }) => {
    try {
      let response: AxiosResponse<receivedMessagesDataType>;
      const { all, id, offset, limit, title } = args;

      if (!all) {
        response = await fetchReceivedMessagesApi(false, id, {
          title,
          pagination: { offset, limit },
        });
      } else {
        response = await fetchReceivedMessagesApi(true, id);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
