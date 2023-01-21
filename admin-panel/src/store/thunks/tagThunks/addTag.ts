import { createAsyncThunk } from "@reduxjs/toolkit";
import { postTagData } from "../../../config/api/tagsApi/tagsApi";
import { postTagsType } from "../../../config/api/tagsApi/tagsApi";
const addTag = createAsyncThunk("tag/add", async (tag: postTagsType) => {
  const response = await postTagData(tag);
  return response.data;
});

export { addTag };
