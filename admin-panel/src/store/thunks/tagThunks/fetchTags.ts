import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTagsData } from "../../../config/api/tagsApi/tagsApi";

const fetchTags = createAsyncThunk("tags/fetch", async () => {
  const response = await fetchTagsData();
  return response.data;
});

export { fetchTags };
