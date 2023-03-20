import { createAsyncThunk } from "@reduxjs/toolkit";
import { messagesDataType } from "src/components/common/common.type";
import { createMessageApi } from "src/config/api/messagesApi/messagesApi";
import { fetchMessagesArgs } from "./messages.type";

export const createMessageThunk = createAsyncThunk<
  { data: messagesDataType },
  fetchMessagesArgs,
  { rejectValue: { errorMessage: string } }
>("message/create", async ({ args, thunkApi }: any) => {
  try {
    const { userId, messageTitle, messageBody, receive } = args;
    const response = await createMessageApi(messageTitle, messageBody);
    return response.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});
