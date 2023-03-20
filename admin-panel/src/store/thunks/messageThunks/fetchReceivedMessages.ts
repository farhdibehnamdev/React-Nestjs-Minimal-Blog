import { createAsyncThunk } from "@reduxjs/toolkit";
import { messagesDataType } from "src/components/common/common.type";
import { fetchMessagesData } from "src/config/api/messagesApi/messagesApi";
import { fetchMessagesArgs } from "./messages.type";

export const fetchReceivedMessages = createAsyncThunk<
  { data: messagesDataType[]; count: number },
  fetchMessagesArgs,
  { rejectValue: { errorMessage: string } }
>("receivedMessages/fetch", async ({ args, thunkApi }: any) => {
  try {
    const { all = false, userId, messageType, pagination, title } = args;
    if (userId !== undefined && messageType !== undefined) {
      const response = await fetchMessagesData(all, userId, messageType, {
        pagination,
        title,
      });
      return response.data;
    }
  } catch (error) {
    return thunkApi.rejectWithValue({
      errorMessage: "مشکلی در دریافت اطلاعات وجود دارد",
    });
  }
});
