import { createAsyncThunk } from "@reduxjs/toolkit";
import { postTagData, postTagsType } from "src/config/api/tagsApi/tagsApi";
export const addTag = createAsyncThunk("tag/add", async (tag: postTagsType) => {
  const response = await postTagData(tag);
  return response.data;
});
