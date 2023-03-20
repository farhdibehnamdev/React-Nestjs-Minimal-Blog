import { createAsyncThunk } from "@reduxjs/toolkit";
import { messagesDataType } from "src/components/common/common.type";
import { fetchMessagesData } from "src/config/api/messagesApi/messagesApi";
import { fetchMessagesArgs } from "./messages.type";

export const fetchSentMessages = createAsyncThunk<
  { data: messagesDataType[]; count: number },
  fetchMessagesArgs,
  { rejectValue: { errorMessage: string } }
>("message/fetchSentMessages", async ({ args, thunkApi }: any) => {
  try {
    const { all, userId, messageType, pagination, title } = args;
    const response = await fetchMessagesData(all, userId, messageType, {
      pagination: pagination,
      title: title,
    });
    return response.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});
