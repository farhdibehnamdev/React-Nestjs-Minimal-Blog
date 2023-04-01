import { createAsyncThunk } from "@reduxjs/toolkit";
import { messagesDataType } from "src/components/common/common.type";
import { createMessageApi } from "src/config/api/messagesApi/messagesApi";
import { fetchMessagesArgs } from "./messages.type";

export const createMessageThunk = createAsyncThunk(
  "message/create",
  async ({ args, thunkApi }: any) => {
    try {
      const { senderId, messageTitle, messageBody, receivers } = args;
      const response = await createMessageApi(
        senderId,
        messageTitle,
        messageBody,
        receivers
      );
      return response.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);
