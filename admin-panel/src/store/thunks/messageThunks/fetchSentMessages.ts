import { createAsyncThunk } from "@reduxjs/toolkit";
import { messagesDataType } from "src/components/common/common.type";
import { fetchMessagesArgs } from "./messages.type";
import { fetchSentMessagesApi } from "src/config/api/messagesApi/messagesApi";

export const fetchSentMessages = createAsyncThunk<
  { data: messagesDataType[]; count: number },
  fetchMessagesArgs,
  { rejectValue: { errorMessage: string } }
>("message/fetchSentMessages", async ({ args, thunkApi }: any) => {
  try {
    const { all, id, pagination, title } = args;
    const response = await fetchSentMessagesApi(all, id, {
      pagination: pagination,
      title: title,
    });
    return response.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});
