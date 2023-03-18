import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSentMessagesData } from "src/config/api/messagesApi/messagesApi";

const fetchSentMessages = createAsyncThunk(
  "message/fetch",
  async (arg: any) => {
    let response: undefined | any[any];
    if (arg) {
      response = await fetchSentMessagesData(arg.all, arg.userId, {
        pagination: arg.pagination,
        title: arg.title,
      });
    } else {
      response = await fetchSentMessagesData(arg.all, arg.userId);
    }
    return response.data;
  }
);
export { fetchSentMessages };
